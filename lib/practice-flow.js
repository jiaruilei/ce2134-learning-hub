export function hasUnfinishedSession(session){
  return !!session&&!session.finished;
}

export function topicPracticeAction(session,topic,bank){
  if(!topic||topic==='mixed'||!bank.some(question=>question.topic===topic))return 'invalid';
  if(!hasUnfinishedSession(session))return 'start';
  const byId=new Map(bank.map(question=>[question.id,question]));
  if(session.mode==='topic'&&Array.isArray(session.ids)&&session.ids.length&&session.ids.every(id=>byId.get(id)?.topic===topic))return 'resume';
  return 'choose';
}
