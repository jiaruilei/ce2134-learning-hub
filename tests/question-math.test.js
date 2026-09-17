import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,archivedQuestions} from '../content/questions.js';
import {questionMath,presentQuestion,presentUnit,presentQuantity} from '../content/question-math.js';

const plain=value=>Array.isArray(value)?value.map(part=>typeof part==='object'?part.text:part).join(''):value;
const fields=['prompt','given','hint','takeaway','solution','choices'];
const allQuestionVersions=[...questions,...archivedQuestions];

test('every question has a reviewed math presentation without changing its wording or grading',()=>{
  assert.deepEqual(Object.keys(questionMath).sort(),allQuestionVersions.map(q=>q.id).sort());
  for(const question of allQuestionVersions){
    const overlay=questionMath[question.id];
    for(const [key,value] of Object.entries(overlay)){
      assert.ok(fields.includes(key),`${question.id}: unexpected overlay ${key}`);
      if(key==='solution'||key==='choices'){
        assert.equal(value.length,question[key].length,`${question.id}: ${key} length`);
        assert.deepEqual(value.map(plain),question[key],`${question.id}: ${key} fallback`);
      }else assert.equal(plain(value),question[key],`${question.id}: ${key} fallback`);
    }
    const presented=presentQuestion(question);
    assert.notEqual(presented,question);
    for(const key of ['id','topic','kind','answer','answerIndex','tolerance','unit']){
      assert.equal(presented[key],question[key],`${question.id}: ${key}`);
    }
  }
});

test('numeric feedback keeps the existing precision, units and accessible labels',()=>{
  for(const question of questions.filter(q=>q.kind==='numeric')){
    assert.equal(plain(presentUnit(question.unit)),question.unit);
    const expected=Number.isInteger(question.answer)?String(question.answer):String(Number(question.answer.toPrecision(7)));
    assert.equal(plain(presentQuantity(question.answer,question.unit)),`${expected} ${question.unit}`,question.id);
  }
  assert.equal(presentQuantity(1e-7,'m')[1].tex,String.raw`1\times 10^{-7}\,\mathrm{m}`);
});

test('all authored quiz notation compiles with the installed MathJax engine',async()=>{
  const {init}=await import('mathjax');
  const mathjax=await init({
    loader:{paths:{mathjax:new URL('../node_modules/mathjax',import.meta.url).href},load:['input/tex','output/svg']},
    output:{fontPath:new URL('../node_modules/@mathjax/mathjax-newcm-font',import.meta.url).href},
    svg:{fontCache:'local'},startup:{typeset:false},
  });
  assert.ok(mathjax,'MathJax must initialise');
  const expressions=new Map();
  function collect(value,label){
    if(Array.isArray(value))value.forEach(part=>collect(part,label));
    else if(value&&typeof value==='object'&&typeof value.tex==='string')expressions.set(value.tex,label);
  }
  for(const [id,overlay] of Object.entries(questionMath)){
    Object.entries(overlay).forEach(([field,value])=>collect(value,`${id}: ${field}`));
  }
  for(const question of questions.filter(q=>q.kind==='numeric')){
    collect(presentUnit(question.unit),`${question.id}: unit`);
    collect(presentQuantity(question.answer,question.unit),`${question.id}: answer`);
  }
  assert.ok(expressions.size>200,'Quiz formulas must be explicitly annotated');
  for(const [tex,label] of expressions){
    const node=await mathjax.tex2svgPromise(tex,{display:true});
    const html=mathjax.startup.adaptor.outerHTML(node);
    assert.ok(!html.includes('data-mml-node="merror"'),`${label}: ${tex}\n${html}`);
    assert.ok(html.includes('<svg'),`${label}: missing SVG`);
  }
});
