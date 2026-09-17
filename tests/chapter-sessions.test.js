import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../content/questions.js';
import {createStore} from '../lib/storage.js';
import {normalizeSessions,topicPracticeAction,topicProgress} from '../lib/practice-flow.js';

const key='ce2134-learning-hub.v1';
const byId=new Map(questions.map(question=>[question.id,question]));
const checkedAnswer=(id,correct=true)=>{
  const question=byId.get(id);
  const value=question.kind==='choice'?(question.answerIndex+(correct?0:1))%question.choices.length:question.answer+(correct?0:Math.max(1,question.tolerance*10));
  return {value,correct};
};
const chapter=(topic,overrides={})=>({
  id:`${topic}-session`,mode:'topic',ids:questions.filter(q=>q.topic===topic).slice(0,3).map(q=>q.id),
  index:0,answers:{},hints:{},hintEverUsed:{},finished:false,...overrides,
});
const attempt={questionId:'pressure-01',topic:'pressure',correct:false,at:'2026-09-18T10:00:00Z'};
function memoryStorage(initial){
  let saved=initial;
  return {
    getItem(name){assert.equal(name,key);return saved??null;},
    setItem(name,value){assert.equal(name,key);saved=value;},
    get serialized(){return saved;},
  };
}
function reopen(storage){
  const store=createStore(storage);
  normalizeSessions(store.data,questions);
  return store;
}

test('chapters persist, resume, and finish independently while general practice remains saved',()=>{
  const storage=memoryStorage();
  const first=reopen(storage);
  first.data.session=chapter('continuity',{id:'general-session',mode:'mixed'});
  first.data.topicSessions.pressure=chapter('pressure',{
    index:1,answers:{'pressure-01':checkedAnswer('pressure-01',false)},
  });
  first.data.topicSessions.forces=chapter('forces',{
    index:1,answers:{'forces-01':checkedAnswer('forces-01')},
  });
  first.save();

  const second=reopen(storage);
  assert.equal(topicPracticeAction(second.data.topicSessions.pressure,'pressure',questions),'resume');
  assert.equal(topicPracticeAction(second.data.topicSessions.forces,'forces',questions),'resume');
  assert.equal(second.data.topicSessions.pressure.index,1);
  assert.equal(second.data.topicSessions.forces.index,1);
  const forcesBefore=structuredClone(second.data.topicSessions.forces);
  const generalBefore=structuredClone(second.data.session);
  const pressure=second.data.topicSessions.pressure;
  pressure.answers=Object.fromEntries(pressure.ids.map(id=>[id,checkedAnswer(id)]));
  pressure.index=pressure.ids.length-1;
  pressure.finished=true;
  second.save();

  const third=reopen(storage);
  assert.equal(topicPracticeAction(third.data.topicSessions.pressure,'pressure',questions),'start');
  assert.equal(topicPracticeAction(third.data.topicSessions.forces,'forces',questions),'resume');
  assert.deepEqual(third.data.topicSessions.forces,forcesBefore);
  assert.deepEqual(third.data.session,generalBefore);
  assert.deepEqual(topicProgress(third.data.topicSessions.pressure),{checked:3,total:3,percent:100});
  third.clear();
  assert.deepEqual(third.data.topicSessions,{});
  assert.equal(third.data.session,null);
});

test('version 1 topic migration keeps chapter progress, attempts, and review records at the existing key',()=>{
  const legacy=chapter('pressure',{index:1,answers:{'pressure-01':checkedAnswer('pressure-01')}});
  const storage=memoryStorage(JSON.stringify({version:1,reviewed:{forces:true},attempts:[attempt],session:legacy}));
  const store=createStore(storage);
  assert.equal(store.data.version,2);
  assert.equal(normalizeSessions(store.data,questions),'pressure');
  assert.equal(store.data.session,null);
  assert.equal(store.data.topicSessions.pressure.id,legacy.id);
  assert.equal(store.data.topicSessions.pressure.index,1);
  assert.deepEqual(store.data.reviewed,{forces:true});
  assert.deepEqual(store.data.attempts,[attempt]);
  store.save();
  const restored=reopen(storage);
  assert.deepEqual(restored.data,store.data);
  assert.equal(normalizeSessions(restored.data,questions),null,'Migration is idempotent');
});

test('legacy general sessions stay general and do not overwrite chapter sessions',()=>{
  for(const mode of ['mixed','connect','retry']){
    const general=chapter('pressure',{mode,id:`general-${mode}`});
    const data={session:general,topicSessions:{pressure:chapter('pressure',{id:'chapter-pressure'})}};
    assert.equal(normalizeSessions(data,questions),null);
    assert.equal(data.session.id,general.id);
    assert.equal(data.topicSessions.pressure.id,'chapter-pressure');
  }
  const data={session:chapter('pressure',{id:'legacy-pressure'}),topicSessions:{pressure:chapter('pressure',{id:'saved-pressure'})}};
  assert.equal(normalizeSessions(data,questions),'pressure');
  assert.equal(data.topicSessions.pressure.id,'saved-pressure');
  assert.equal(data.session,null);
});

test('chapter session normalization removes corrupt maps and wrong-topic entries and sanitizes answers',()=>{
  for(const topicSessions of [null,[],42,'bad']){
    const data={session:null,topicSessions};
    assert.equal(normalizeSessions(data,questions),null);
    assert.deepEqual(data.topicSessions,{});
  }
  const data={session:{id:'bad'},topicSessions:{
    unknown:chapter('pressure'),
    mixed:chapter('pressure'),
    forces:chapter('pressure'),
    continuity:chapter('continuity',{ids:['missing']}),
    flowlines:chapter('flowlines',{mode:'mixed'}),
    bernoulli:chapter('bernoulli',{ids:['bernoulli-01','pressure-01']}),
    momentum:chapter('momentum',{mode:'retry',index:2,finished:true,answers:{
      'momentum-01':checkedAnswer('momentum-01'),
      'momentum-02':{value:false,correct:true},
      'pressure-01':checkedAnswer('pressure-01'),
    }}),
    pressure:chapter('pressure',{index:1,answers:{'pressure-01':{...checkedAnswer('pressure-01'),correct:false}}}),
  }};
  normalizeSessions(data,questions);
  assert.equal(data.session,null);
  assert.deepEqual(Object.keys(data.topicSessions).sort(),['momentum','pressure']);
  assert.equal(data.topicSessions.pressure.answers['pressure-01'].correct,true);
  assert.equal(data.topicSessions.momentum.finished,false);
  assert.equal(data.topicSessions.momentum.index,1);
  assert.deepEqual(Object.keys(data.topicSessions.momentum.answers),['momentum-01']);
  assert.equal(topicPracticeAction(data.topicSessions.momentum,'momentum',questions),'resume');
});

test('chapter progress counts checked questions regardless of accuracy and ignores unrelated answers',()=>{
  assert.deepEqual(topicProgress(null),{checked:0,total:0,percent:0});
  const current=chapter('pressure');
  assert.deepEqual(topicProgress(current),{checked:0,total:3,percent:0});
  current.answers['pressure-01']=checkedAnswer('pressure-01',false);
  current.answers['pressure-02']=checkedAnswer('pressure-02',true);
  current.answers['forces-01']=checkedAnswer('forces-01',true);
  assert.deepEqual(topicProgress(current),{checked:2,total:3,percent:67});
});

test('storage write failures preserve legacy migration and independent chapter state in memory',()=>{
  let blocked=true;
  let saved=JSON.stringify({version:1,reviewed:{pressure:true},attempts:[attempt],session:chapter('pressure')});
  const storage={
    getItem(){return saved;},
    setItem(_key,value){if(blocked)throw new Error('Quota exceeded');saved=value;},
  };
  const store=reopen(storage);
  assert.equal(store.available,false);
  assert.equal(store.data.topicSessions.pressure.id,'pressure-session');
  store.data.topicSessions.forces=chapter('forces');
  store.save();
  assert.equal(store.available,false);
  assert.equal(store.data.topicSessions.forces.id,'forces-session');
  assert.deepEqual(store.data.attempts,[attempt]);
  assert.deepEqual(store.data.reviewed,{pressure:true});
  blocked=false;
  store.save();
  assert.equal(store.available,true);
  assert.deepEqual(reopen(storage).data,store.data);
});
