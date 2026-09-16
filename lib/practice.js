export function gradeQuestion(question, value){
  if(!['number','string'].includes(typeof value)||typeof value==='string'&&value.trim()==='') return {valid:false,message:question.kind==='choice'?'Choose an answer before checking.':'Enter a number before checking.'};
  if(question.kind==='choice'){
    const index=typeof value==='number'?value:Number(value);
    if(value===null||value===undefined||value===''||!Number.isInteger(index)||index<0||index>=question.choices.length) return {valid:false,message:'Choose an answer before checking.'};
    return {valid:true,correct:index===question.answerIndex,value:index};
  }
  if(value===null||value===undefined||String(value).trim()==='') return {valid:false,message:'Enter a number before checking.'};
  const number=Number(value);
  if(!Number.isFinite(number)) return {valid:false,message:'Enter a finite number, using the unit shown.'};
  const correct=Math.abs(number-question.answer)<=question.tolerance+Number.EPSILON*Math.max(1,Math.abs(question.answer))*4;
  return {valid:true,correct,value:number};
}

export function shuffle(items,random=Math.random){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}

export function latestMissed(attempts){
  const latest=new Map();
  for(const attempt of attempts) latest.set(attempt.questionId,attempt.correct);
  return [...latest].filter(([,correct])=>!correct).map(([id])=>id);
}

export function makeSet(bank,{mode='mixed',topic='',count=6,attempts=[]}={},random=Math.random){
  let pool=bank;
  if(mode==='topic') pool=bank.filter(q=>q.topic===topic);
  if(mode==='connect') pool=bank.filter(q=>q.topic==='mixed');
  if(mode==='retry'){const missed=new Set(latestMissed(attempts));pool=bank.filter(q=>missed.has(q.id));}
  if(mode!=='mixed') return shuffle(pool,random).slice(0,count).map(q=>q.id);
  const topicIds=[...new Set(bank.map(q=>q.topic))].filter(t=>t!=='mixed');
  const first=shuffle(topicIds,random).map(id=>shuffle(bank.filter(q=>q.topic===id),random)[0]).filter(Boolean);
  const chosen=first.slice(0,count);
  const chosenIds=new Set(chosen.map(q=>q.id));
  return [...chosen,...shuffle(bank.filter(q=>!chosenIds.has(q.id)),random).slice(0,Math.max(0,count-chosen.length))].map(q=>q.id);
}

export function topicStats(attempts,id){
  const selected=attempts.filter(a=>a.topic===id);
  const correct=selected.filter(a=>a.correct).length;
  return {count:selected.length,correct,accuracy:selected.length?Math.round(correct/selected.length*100):null};
}

export function validSession(session,bank){
  if(!session||typeof session.id!=='string'||!Array.isArray(session.ids)||!session.ids.length||session.ids.length>42||new Set(session.ids).size!==session.ids.length) return null;
  const available=new Set(bank.map(q=>q.id));
  if(session.ids.some(id=>!available.has(id))||!Number.isInteger(session.index)||session.index<0||session.index>=session.ids.length) return null;
  const answers={};
  for(const [id,answer] of Object.entries(session.answers||{})){
    const q=bank.find(item=>item.id===id);
    if(!q||!session.ids.includes(id))continue;
    const grade=gradeQuestion(q,answer?.value);
    if(grade.valid)answers[id]={value:grade.value,correct:grade.correct,hintUsed:!!answer.hintUsed};
  }
  // Only uninterrupted progress is resumable; don't skip unanswered questions.
  const firstUnanswered=session.ids.findIndex(id=>!answers[id]);
  const index=firstUnanswered<0?session.ids.length-1:Math.min(session.index,firstUnanswered);
  return {id:session.id,ids:session.ids,index,answers,hints:session.hints&&typeof session.hints==='object'?session.hints:{},hintEverUsed:session.hintEverUsed&&typeof session.hintEverUsed==='object'?session.hintEverUsed:{},mode:session.mode||'mixed',finished:!!session.finished&&firstUnanswered<0};
}
