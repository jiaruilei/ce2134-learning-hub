import {validSession} from './practice.js';

export function hasUnfinishedSession(session){
  return !!session&&!session.finished;
}

export function topicPracticeAction(session,topic,bank){
  if(!topic||topic==='mixed'||!bank.some(question=>question.topic===topic))return 'invalid';
  if(!hasUnfinishedSession(session))return 'start';
  const byId=new Map(bank.map(question=>[question.id,question]));
  if(['topic','retry'].includes(session.mode)&&Array.isArray(session.ids)&&session.ids.length&&session.ids.every(id=>byId.get(id)?.topic===topic))return 'resume';
  return 'choose';
}

export function normalizeSessions(data,bank){
  const byId=new Map(bank.map(question=>[question.id,question]));
  const topics=new Set(bank.map(question=>question.topic).filter(topic=>topic!=='mixed'));
  const chapterFor=session=>{
    if(!session||!['topic','retry'].includes(session.mode))return null;
    const topic=byId.get(session.ids[0])?.topic;
    return topics.has(topic)&&session.ids.every(id=>byId.get(id)?.topic===topic)?topic:null;
  };
  const savedMap=data.topicSessions&&typeof data.topicSessions==='object'&&!Array.isArray(data.topicSessions)?data.topicSessions:{};
  data.topicSessions=Object.fromEntries(Object.entries(savedMap).flatMap(([topic,saved])=>{
    if(!topics.has(topic))return [];
    const session=validSession(saved,bank);
    return chapterFor(session)===topic?[[topic,session]]:[];
  }));
  data.session=validSession(data.session,bank);
  if(data.session?.mode==='topic'){
    const topic=chapterFor(data.session);
    if(topic&&!data.topicSessions[topic])data.topicSessions[topic]=data.session;
    data.session=null;
    return topic;
  }
  return null;
}

export function topicProgress(session){
  const ids=Array.isArray(session?.ids)?session.ids:[];
  const total=ids.length;
  const checked=ids.filter(id=>!!session.answers?.[id]).length;
  return {checked,total,percent:total?Math.round(checked/total*100):0};
}
