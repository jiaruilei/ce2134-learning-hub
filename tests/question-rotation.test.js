import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../content/questions.js';
import {CHAPTER_SET_SIZE,makeSet,validSession} from '../lib/practice.js';
import {createStore} from '../lib/storage.js';
import {normalizeSessions,topicProgress} from '../lib/practice-flow.js';

const topics=['pressure','forces','flowlines','continuity','bernoulli','momentum'];
const byId=new Map(questions.map(q=>[q.id,q]));
const randomFor=start=>{let seed=start;return ()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);};
const record=(ids,run=0)=>ids.map((id,index)=>({questionId:id,topic:byId.get(id).topic,correct:true,at:`2026-09-17T10:${String(run).padStart(2,'0')}:${String(index).padStart(2,'0')}Z`}));

test('twenty-question chapter pools support a balanced six-question session',()=>{
  assert.equal(CHAPTER_SET_SIZE,6);
  for(const topic of topics){
    const pool=questions.filter(q=>q.topic===topic);
    assert.deepEqual(Object.fromEntries(['Foundation','Apply','Connect'].map(level=>[level,pool.filter(q=>q.difficulty===level).length])),{Foundation:6,Apply:10,Connect:4});
    for(let seed=1;seed<=20;seed++){
      const ids=makeSet(questions,{mode:'topic',topic,count:CHAPTER_SET_SIZE},randomFor(seed));
      const selected=ids.map(id=>byId.get(id));
      assert.equal(ids.length,6);
      assert.equal(new Set(ids).size,6);
      assert.ok(selected.every(q=>q.topic===topic));
      assert.deepEqual(['Foundation','Apply','Connect'].map(level=>selected.filter(q=>q.difficulty===level).length),[2,3,1]);
      assert.ok(new Set(selected.flatMap(q=>q.tags)).size>=4,topic);
      assert.equal(new Set(selected.map(q=>q.kind)).size,2,topic);
    }
  }
});

test('rotation uses unseen questions first and covers all twenty within four completed sessions',()=>{
  for(const topic of topics){
    for(let seed=1;seed<=10;seed++){
      const random=randomFor(seed),attempts=[],seen=new Set();
      for(let run=0;run<4;run++){
        const unseen=20-seen.size;
        const before=JSON.stringify({questions,attempts});
        const ids=makeSet(questions,{mode:'topic',topic,attempts},random);
        assert.equal(JSON.stringify({questions,attempts}),before,'Selection must not modify saved answers or authored content');
        assert.equal(ids.filter(id=>!seen.has(id)).length,Math.min(6,unseen));
        ids.forEach(id=>seen.add(id));
        attempts.push(...record(ids,run));
      }
      assert.equal(seen.size,20,topic);
      const recent=new Set(attempts.slice(-6).map(a=>a.questionId));
      const next=makeSet(questions,{mode:'topic',topic,attempts},random);
      assert.ok(next.every(id=>!recent.has(id)),`${topic}: a fresh set should avoid the immediately preceding set`);
    }
  }
});

test('rotation uses local history independently for each chapter and refreshes recency after a retry',()=>{
  const pressure=questions.filter(q=>q.topic==='pressure').map(q=>q.id);
  const attempts=record(pressure);
  // Recently retrying an old question should remove it from the next older set.
  attempts.push(...record([pressure[0]],1));
  const selected=makeSet(questions,{mode:'topic',topic:'pressure',attempts},randomFor(3));
  assert.ok(!selected.includes(pressure[0]));
  assert.ok(selected.every(id=>pressure.slice(1,11).includes(id)));
  assert.deepEqual(
    makeSet(questions,{mode:'topic',topic:'forces',attempts},randomFor(4)),
    makeSet(questions,{mode:'topic',topic:'forces'},randomFor(4)),
  );
});

test('all remaining unseen questions are offered even if they share one difficulty',()=>{
  const pool=questions.filter(q=>q.topic==='pressure');
  const pending=pool.filter(q=>q.difficulty==='Connect').slice(0,3).map(q=>q.id);
  const attempts=record(pool.filter(q=>!pending.includes(q.id)).map(q=>q.id));
  const selected=makeSet(questions,{mode:'topic',topic:'pressure',attempts},randomFor(7));
  assert.ok(pending.every(id=>selected.includes(id)));
  assert.equal(new Set(selected).size,6);
});

test('legacy unfinished sets resume with their six questions and current-session progress',()=>{
  const ids=Array.from({length:6},(_,i)=>`pressure-0${i+1}`);
  const q=byId.get(ids[0]);
  const saved={id:'legacy-six',mode:'topic',ids,index:1,finished:false,hints:{[ids[1]]:true},answers:{[ids[0]]:{value:q.answerIndex,correct:true,hintUsed:false}}};
  let json=JSON.stringify({version:2,reviewed:{forces:true},attempts:record([ids[0]]),session:null,topicSessions:{pressure:saved}});
  const storage={getItem(){return json;},setItem(_key,value){json=value;}};
  const store=createStore(storage);
  normalizeSessions(store.data,questions);
  store.save();
  const restored=createStore(storage);
  const session=validSession(restored.data.topicSessions.pressure,questions);
  assert.deepEqual(session.ids,ids);
  assert.equal(session.id,saved.id);
  assert.equal(session.index,1);
  assert.deepEqual(session.answers,saved.answers);
  assert.deepEqual(session.hints,saved.hints);
  assert.equal(session.finished,false);
  assert.deepEqual(topicProgress(session),{checked:1,total:6,percent:17});
  assert.equal(restored.data.attempts.length,1);
  assert.equal(restored.data.reviewed.forces,true);
});
