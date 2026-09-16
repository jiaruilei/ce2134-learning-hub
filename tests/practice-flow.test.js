import test from 'node:test';
import assert from 'node:assert/strict';
import {hasUnfinishedSession,topicPracticeAction} from '../lib/practice-flow.js';

const bank=Object.freeze([
  Object.freeze({id:'pressure-01',topic:'pressure'}),
  Object.freeze({id:'pressure-02',topic:'pressure'}),
  Object.freeze({id:'forces-01',topic:'forces'}),
  Object.freeze({id:'connect-01',topic:'mixed'}),
]);
const session=overrides=>({id:'saved-session',mode:'topic',ids:['pressure-01','pressure-02'],index:0,answers:{},finished:false,...overrides});

test('topic practice starts when there is no unfinished session',()=>{
  assert.equal(topicPracticeAction(null,'pressure',bank),'start');
  assert.equal(topicPracticeAction(undefined,'pressure',bank),'start');
  assert.equal(topicPracticeAction(session({finished:true}),'pressure',bank),'start');
  assert.equal(topicPracticeAction(session({finished:true}),'forces',bank),'start');
  assert.equal(hasUnfinishedSession(null),false);
  assert.equal(hasUnfinishedSession(undefined),false);
  assert.equal(hasUnfinishedSession(session({finished:true})),false);
});

test('matching topic practice resumes the existing set, including final checked feedback',()=>{
  assert.equal(topicPracticeAction(session(),'pressure',bank),'resume');
  const checked=session({index:1,answers:{'pressure-01':{value:1,correct:true},'pressure-02':{value:2,correct:true}}});
  assert.equal(hasUnfinishedSession(checked),true);
  assert.equal(topicPracticeAction(checked,'pressure',bank),'resume');
});

test('different topics and mixed or retry sessions require an explicit choice',()=>{
  assert.equal(topicPracticeAction(session(),'forces',bank),'choose');
  assert.equal(topicPracticeAction(session({ids:['pressure-01','forces-01']}),'pressure',bank),'choose');
  assert.equal(topicPracticeAction(session({mode:'mixed'}),'pressure',bank),'choose');
  assert.equal(topicPracticeAction(session({mode:'retry'}),'pressure',bank),'choose');
  assert.equal(topicPracticeAction(session({mode:'connect',ids:['connect-01']}),'pressure',bank),'choose');
});

test('unknown, absent, and combined topic requests cannot start or replace a session',()=>{
  for(const topic of [undefined,null,'','unknown','mixed']){
    assert.equal(topicPracticeAction(null,topic,bank),'invalid');
    assert.equal(topicPracticeAction(session(),topic,bank),'invalid');
  }
  assert.equal(topicPracticeAction(null,'pressure',[]),'invalid');
});

test('an empty set or missing question IDs cannot be treated as a matching saved topic',()=>{
  for(const ids of [[],['removed-question'],['pressure-01','removed-question'],undefined,null]){
    assert.equal(topicPracticeAction(session({ids}),'pressure',bank),'choose');
  }
});

test('deciding how to enter practice does not mutate the saved session or question bank',()=>{
  const saved=Object.freeze(session({
    ids:Object.freeze(['pressure-01','pressure-02']),
    answers:Object.freeze({'pressure-01':Object.freeze({value:1,correct:true})}),
  }));
  const before=JSON.stringify({saved,bank});
  for(const topic of ['pressure','forces','mixed','unknown'])topicPracticeAction(saved,topic,bank);
  hasUnfinishedSession(saved);
  assert.equal(JSON.stringify({saved,bank}),before);
});
