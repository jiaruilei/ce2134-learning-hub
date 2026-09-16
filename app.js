import {topics} from './content/topics.js';
import {questions} from './content/questions.js';
import {gradeQuestion,makeSet,latestMissed,topicStats,validSession} from './lib/practice.js';
import {createStore} from './lib/storage.js';
import {renderEquations} from './lib/math.js';
import {hasUnfinishedSession,topicPracticeAction} from './lib/practice-flow.js';

const main=document.querySelector('main');
let browserStorage;try{browserStorage=window.localStorage;}catch{}
const store=createStore(browserStorage);
store.data.session=validSession(store.data.session,questions);
const knownQuestions=new Set(questions.map(q=>q.id));
store.data.attempts=store.data.attempts.filter(a=>knownQuestions.has(a.questionId));
const builder={mode:'mixed',topic:'pressure',count:6};
let runVisible=false,customVisible=false,pendingSet=null,formError='',toastTimer;
const drafts={};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const topicById=id=>topics.find(t=>t.id===id);
const topicName=id=>topicById(id)?.title||'Connecting concepts';
const percent=n=>`${n}%`;
const reviewed=()=>topics.filter(t=>store.data.reviewed[t.id]);
const fmt=n=>Number.isInteger(n)?String(n):String(Number(n.toPrecision(7)));

function icon(id){
  const paths={
    pressure:'<path d="M12 9v29h25V9M12 20c5-5 8 5 13 0s8 5 12 0M18 27h6m-6 6h6M43 20v18m-3-3 3 3 3-3"/>',
    forces:'<path d="M10 9v31h34M10 19c6-5 11 5 18 0M20 10l14 30M12 27h14m-4-4 4 4-4 4M32 22h12m-4-4 4 4-4 4"/>',
    flowlines:'<path d="M7 12c16-10 22 16 39 4M7 25c16-10 22 16 39 4M7 38c16-10 22 16 39 4M28 13l5 6-7 1"/>',
    continuity:'<path d="M7 10h11l17 9h12M7 42h11l17-9h12M7 26h12m-4-4 4 4-4 4M32 26h15m-4-4 4 4-4 4"/>',
    bernoulli:'<path d="M7 13h40M7 19l40 7M7 32l40 6M7 42l40 1"/><path d="M13 29v14m28-9v10" stroke-dasharray="2 3"/>',
    momentum:'<path d="M7 24h22M7 31h22M30 8v14c0 12 8 17 17 17M30 8h7v13c0 8 4 11 10 11M21 17h15m-4-4 4 4-4 4"/>',
  };
  return `<svg width="52" height="52" viewBox="0 0 54 52" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id]||paths.flowlines}</svg>`;
}
function heading(title,extra=''){return `<div class="page-heading"><h1>${title}</h1>${extra}</div>`;}
function launch(t,label='Interactive platform'){return `<a class="button secondary" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;}
function topicCard(t){
  const stats=topicStats(store.data.attempts,t.id);
  return `<article class="topic-card" style="--topic-color:${esc(t.color)}"><a class="topic-card-main" href="#/topic/${t.id}"><div class="topic-card-top"><span class="topic-icon">${icon(t.id)}</span><span class="topic-number">${esc(t.number)}</span></div><h2>${esc(t.title)}</h2></a><div class="topic-meta"><span>${store.data.reviewed[t.id]?'<span class="review-check">✓ Reviewed</span>':'Not reviewed'}</span><span>${stats.count?`${stats.accuracy}% · ${stats.count} attempts`:''}</span></div><div class="topic-card-bottom"><a href="#/topic/${t.id}" aria-label="Review ${esc(t.title)}">Review →</a><a href="#/practice?topic=${t.id}" aria-label="Practise ${esc(t.title)}">Practise →</a><a class="platform-link" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(t.title)} interactive platform in a new tab">Interactive platform <span aria-hidden="true">↗</span></a></div></article>`;
}
function home(){
  return `${heading('Topics',hasUnfinishedSession(store.data.session)?'<a class="button primary" href="#/practice?run=1">Resume practice →</a>':'<a class="button primary" href="#/practice">Start practice →</a>')}
  <div class="topic-grid">${topics.map(topicCard).join('')}</div>`;
}
function topicPage(t){
  const done=!!store.data.reviewed[t.id];
  const next=topicById(t.connection.nextId);
  return `<a class="back-link" href="#/">← Topics</a><header class="topic-header"><div class="topic-title" style="--topic-color:${esc(t.color)}"><span class="topic-icon large">${icon(t.id)}</span>${heading(esc(t.title))}</div><nav class="topic-actions" aria-label="Topic actions"><a class="button secondary current" href="#/topic/${t.id}" aria-current="page">Review</a>${launch(t)}<a class="button primary" href="#/practice?topic=${t.id}">Practise →</a></nav></header><div class="topic-layout"><div class="topic-body">
  <details class="review-section review-details"><summary><h2>Learning objectives</h2></summary><ul class="objective-list">${t.objectives.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>
  <section class="review-section"><h2>Key equations</h2><div class="equation-list">${t.equations.map(q=>`<article class="equation"><span>${esc(q.label)}</span><div class="equation-formula" ${q.tex?`data-tex="${esc(q.tex)}"`:''}>${esc(q.formula)}</div><p>${esc(q.note)}</p></article>`).join('')}</div><section class="assumptions"><h2>Assumptions</h2><ul>${t.assumptions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section></section>
  <details class="review-section review-details"><summary><h2>Common misconceptions</h2></summary><div class="misconceptions">${t.misconceptions.map(m=>`<article><h3>${esc(m.claim)}</h3><p>${esc(m.correction)}</p></article>`).join('')}</div></details>
  <details class="review-section review-details"><summary><h2>Guided activity</h2></summary><h3>${esc(t.guidedActivity.title)}</h3><ol class="steps">${t.guidedActivity.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="reflection"><strong>Pause and explain</strong><p>${esc(t.guidedActivity.reflection)}</p></div></details>
  <details class="connection review-details"><summary><h2>${esc(t.connection.title)}</h2></summary><p>${esc(t.connection.text)}</p>${next?`<a class="quiet-link" href="#/topic/${next.id}">${esc(next.title)} →</a>`:'<a class="quiet-link" href="#/practice?mode=connect">Connect concepts →</a>'}</details></div>
  <aside class="topic-side"><div class="side-card"><button class="button ${done?'secondary':'primary'} full" data-action="review" data-topic="${t.id}" aria-pressed="${done}">${done?'✓ Reviewed':'Mark as reviewed'}</button>${t.prerequisites.length?`<hr><h2>Prerequisites</h2>${t.prerequisites.map(id=>`<a class="side-link" href="#/topic/${id}">${esc(topicName(id))} →</a>`).join('')}`:''}</div></aside></div>`;
}

function setName(options){
  return options.mode==='topic'?topicName(options.topic):({mixed:'Mixed revision',connect:'Connecting concepts',retry:'Retry mistakes'}[options.mode]||'Practice');
}
function resumeCard(){
  const saved=store.data.session;
  if(!hasUnfinishedSession(saved))return '';
  const topic=questions.find(q=>q.id===saved.ids[0])?.topic;
  return `<section class="resume-card"><div><h2>Continue practice</h2><p>${esc(setName({mode:saved.mode,topic}))} · ${Object.keys(saved.answers).length} / ${saved.ids.length} checked</p></div><a class="button primary" href="#/practice?run=1">Resume practice →</a></section>`;
}
function practiceHome(){
  return `${heading('Practice','<a class="quiet-link" href="#/practice?settings=1">Custom settings →</a>')}<div class="practice-layout">${hasUnfinishedSession(store.data.session)?resumeCard():`<section class="quick-practice"><div><h2>Mixed revision</h2><p>6 questions · All 6 topics</p></div><button class="button primary" data-action="quick-start">Start 6 questions →</button></section>`}</div>`;
}
function practiceChoice(){
  return `${heading('Practice','<a class="quiet-link" href="#/practice?settings=1">Custom settings →</a>')}<div class="practice-layout">${resumeCard()}<section class="new-set-card"><h2>${esc(pendingSet.label)}</h2><p>${pendingSet.ids.length} questions. Starting this set replaces your unfinished session. Checked answers stay in Progress.</p><button class="button secondary" data-action="replace-session">Start this set instead →</button></section></div>`;
}
function practiceBuilder(){
  const missed=latestMissed(store.data.attempts).length;
  const modes=[['mixed','↗','Mixed revision','All 6 topics'],['topic','◎','One topic','Focused practice'],['connect','⤴','Connect concepts','Combined topics'],['retry','↻','Retry mistakes',`${missed} question${missed===1?'':'s'}`]];
  return `<a class="back-link" href="#/practice">← Practice</a>${heading('Custom practice')}<div class="practice-layout">${resumeCard()}<section class="builder-card"><h2>Practice mode</h2><div class="practice-modes">${modes.map(([id,symbol,title,desc])=>`<button class="mode-card ${builder.mode===id?'selected':''}" data-action="mode" data-mode="${id}" aria-pressed="${builder.mode===id}" ${id==='retry'&&!missed?'disabled':''}><span class="mode-symbol" aria-hidden="true">${symbol}</span><strong>${title}</strong><span>${desc}</span><i aria-hidden="true">${builder.mode===id?'●':'○'}</i></button>`).join('')}</div>
  <div class="builder-controls">${builder.mode==='topic'?`<label>Topic<select id="practiceTopic">${topics.map(t=>`<option value="${t.id}" ${t.id===builder.topic?'selected':''}>${esc(t.title)}</option>`).join('')}</select></label>`:''}<label>Set length<select id="practiceCount"><option value="6" ${builder.count===6?'selected':''}>${builder.mode==='retry'?'Up to ':''}6 questions</option>${builder.mode==='mixed'||builder.mode==='retry'&&missed>6?`<option value="12" ${builder.count===12?'selected':''}>${builder.mode==='retry'?'Up to ':''}12 questions</option>`:''}</select></label></div><button class="button ${hasUnfinishedSession(store.data.session)?'secondary':'primary'}" data-action="start" ${builder.mode==='retry'&&!missed?'disabled':''}>Start practice <span aria-hidden="true">→</span></button></section></div><p class="small-note">Progress stays in this browser; platform activity and instructor records are separate.</p>`;
}
function questionView(){
  const session=store.data.session;
  if(!session)return practiceHome();
  if(session.finished)return resultView();
  const q=questions.find(item=>item.id===session.ids[session.index]);
  const answer=session.answers[q.id],draft=answer?.value??drafts[q.id]??'';
  const hintUsed=!!session.hints[q.id];
  return `<div class="practice-top"><button class="text-button" data-action="leave">← Save & leave</button><span>${session.index+1} / ${session.ids.length} questions</span></div><div class="question-progress" aria-label="${Object.keys(session.answers).length} of ${session.ids.length} questions checked">${session.ids.map((id,i)=>`<span class="${session.answers[id]?(session.answers[id].correct?'correct':'incorrect'):i===session.index?'current':''}"></span>`).join('')}</div>
  <div class="question-layout"><section class="question-card"><div class="question-tags"><span class="topic-pill">${esc(topicName(q.topic))}</span><span>${esc(q.difficulty)}</span></div><h1>${esc(q.prompt)}</h1>${q.given?`<p class="givens">${esc(q.given)}</p>`:''}<form id="answerForm" novalidate>
  ${q.kind==='choice'?`<fieldset class="answer-options"><legend class="sr-only">Choose your answer</legend>${q.choices.map((choice,i)=>`<label class="answer-option ${String(draft)===String(i)?'chosen':''} ${answer&&i===q.answerIndex?'answer-correct':''}"><input type="radio" name="answer" value="${i}" ${String(draft)===String(i)?'checked':''} ${answer?'disabled':''}><span class="choice-letter">${String.fromCharCode(65+i)}</span><span>${esc(choice)}</span>${answer&&i===q.answerIndex?'<span class="option-check" aria-label="Correct answer">✓</span>':''}</label>`).join('')}</fieldset>`:`<label class="numeric-label" for="numericAnswer">Your answer</label><div class="numeric-answer"><input id="numericAnswer" name="answer" type="number" step="any" inputmode="decimal" placeholder="Enter a value" value="${esc(draft)}" ${answer?'disabled':''} aria-describedby="answerUnits answerError"><span id="answerUnits">${esc(q.unit)}</span></div><p class="small-note">Use the unit shown. Accepted tolerance: ±${esc(fmt(q.tolerance))} ${esc(q.unit)}.</p>`}
  <p id="answerError" class="form-error" role="alert">${esc(formError)}</p>${answer?'':`<div class="answer-actions"><button class="button primary" type="submit">Check my answer →</button><button type="button" class="text-button" data-action="hint">${hintUsed?'Hide hint':'I’d like a hint'}</button></div>`}</form>
  ${hintUsed&&!answer?`<div class="hint"><strong>A starting point</strong><p>${esc(q.hint)}</p></div>`:''}
  ${answer?`<section class="feedback ${answer.correct?'success':'try-again'}" tabindex="-1" id="feedback"><h2>${answer.correct?'Correct':'Not quite'}</h2>${!answer.correct?`<p>The correct answer is <strong>${q.kind==='choice'?esc(q.choices[q.answerIndex]):`${esc(fmt(q.answer))} ${esc(q.unit)}`}</strong>.</p>`:''}<h3>Worked solution</h3><ol>${q.solution.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="takeaway"><strong>Keep this idea</strong><p>${esc(q.takeaway)}</p></div></section><div class="next-row"><button class="button primary" data-action="next">${session.index===session.ids.length-1?'See my summary':'Next question'} →</button></div>`:''}</section>
  <aside class="question-side"><div class="side-card"><h2>Review topic</h2>${(q.topic==='mixed'?(q.relatedTopics||q.tags||[]).filter(id=>topicById(id)):[q.topic]).map(id=>`<a href="#/topic/${id}" class="side-link">${esc(topicName(id))} →</a>`).join('')}</div></aside></div>`;
}
function resultView(){
  const session=store.data.session,answers=Object.values(session.answers);
  const correct=answers.filter(a=>a.correct).length;
  const missed=session.ids.filter(id=>!session.answers[id]?.correct);
  return `<section class="result-hero"><h1>Session complete</h1><div class="result-score"><strong>${correct}</strong><span>/ ${session.ids.length}<small>questions correct</small></span></div><div class="button-row">${missed.length?'<button class="button primary" data-action="retry-session">Retry these questions →</button>':'<a class="button primary" href="#/practice?mode=connect">Connect concepts →</a>'}<button class="button secondary" data-action="leave">Choose a new set</button></div></section><section class="section-block"><div class="section-heading"><h2>Answers &amp; solutions</h2><a class="quiet-link" href="#/progress">My progress →</a></div><div class="question-trail">${session.ids.map((id,i)=>{const q=questions.find(x=>x.id===id),a=session.answers[id];return `<details><summary><span class="trail-result ${a.correct?'is-correct':'is-incorrect'}" aria-label="${a.correct?'Correct':'Incorrect'}">${a.correct?'✓':'↻'}</span><span><small>${i+1} · ${esc(topicName(q.topic))}</small>${esc(q.prompt)}</span><span class="trail-expand" aria-hidden="true">+</span></summary><div><ol>${q.solution.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p>${esc(q.takeaway)}</p></div></details>`;}).join('')}</div></section>`;
}
function progressPage(){
  const attempts=store.data.attempts,correct=attempts.filter(a=>a.correct).length,missed=latestMissed(attempts);
  return `${heading('My progress')}<div class="progress-summary"><div><strong>${reviewed().length}<span> / 6</span></strong><p>Topics reviewed</p></div><div><strong>${attempts.length}</strong><p>Attempts</p></div><div><strong>${attempts.length?`${Math.round(correct/attempts.length*100)}%`:'—'}</strong><p>Accuracy</p></div></div>
  ${!attempts.length?`<div class="empty-state"><p>No practice attempts yet.</p><a class="button primary" href="#/practice">Start practice →</a></div>`:''}<section class="section-block"><div class="section-heading"><h2>By topic</h2>${missed.length?`<a class="quiet-link" href="#/practice?mode=retry">Retry ${missed.length} missed questions →</a>`:''}</div><div class="progress-topics">${topics.map(t=>{const s=topicStats(attempts,t.id);return `<article><span class="topic-icon" style="--topic-color:${esc(t.color)}">${icon(t.id)}</span><div class="progress-topic-name"><a href="#/topic/${t.id}">${esc(t.title)}</a><small>${store.data.reviewed[t.id]?'✓ Reviewed':'Not reviewed'}</small></div><div class="topic-score"><strong>${s.count?`${s.accuracy}%`:'—'}</strong><small>${s.count} attempt${s.count===1?'':'s'}</small></div><a class="button secondary compact" href="#/practice?topic=${t.id}">Practise <span class="sr-only">${esc(t.title)}</span> →</a></article>`;}).join('')}</div></section>
  <section class="data-note"><p>Progress stays in this browser and is not sent to your instructor or synced across devices. Activity in the separate interactive platforms is not included.</p><button class="button secondary" data-action="export-progress">Download my record ↓</button></section>${attempts.length?`<details class="clear-progress"><summary>Manage record</summary><p>Clearing removes your attempts, review checklist, and saved session.</p><button class="text-button danger" data-action="clear-progress">Clear this browser’s record</button></details>`:''}`;
}

function render(){
  const hash=location.hash.slice(1)||'/';
  const [path,search='']=hash.split('?');
  const params=new URLSearchParams(search);
  const page=path.split('/')[1]||'home';
  const active=page==='topic'?'home':page;
  document.querySelectorAll('[data-nav]').forEach(a=>{const selected=a.dataset.nav===active;a.classList.toggle('active',selected);selected?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
  const labels={home:'Topics',topic:'Topic review',practice:'Practice',progress:'My progress'};
  document.getElementById('pageLabel').textContent=labels[page]||'Topics';
  let html;
  if(page==='home')html=home();
  else if(page==='topic'){const t=topicById(path.split('/')[2]);html=t?topicPage(t):`${heading('Topic not found')}<a class="button primary" href="#/">Topics →</a>`;}
  else if(page==='practice')html=runVisible?questionView():pendingSet?practiceChoice():customVisible?practiceBuilder():practiceHome();
  else if(page==='progress')html=progressPage();
  else html=`${heading('Page not found')}<a class="button primary" href="#/">Topics →</a>`;
  main.innerHTML=(!store.available?'<div class="storage-alert" role="status">Browser storage is unavailable. You can practise, but progress may not survive closing this page.</div>':'')+html;
  void renderEquations(main);
  document.title=`${page==='topic'?topicName(path.split('/')[2]):labels[page]||'Topics'} · CE2134 Learning Hub`;
}
function toast(text){clearTimeout(toastTimer);const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function showSession(replaceRoute=false){
  if(replaceRoute||location.hash!=='#/practice?run=1')history[replaceRoute?'replaceState':'pushState'](null,'','#/practice?run=1');
  pendingSet=null;runVisible=true;formError='';render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
function begin(ids,mode,replaceRoute=false){
  if(!ids.length){toast('Complete some practice before retrying mistakes.');return;}
  for(const id of Object.keys(drafts))delete drafts[id];
  store.data.session={id:crypto.randomUUID(),ids,index:0,answers:{},hints:{},mode,finished:false};store.save();showSession(replaceRoute);
}
function requestSet(options,replaceRoute=false){
  const ids=makeSet(questions,{...options,attempts:store.data.attempts});
  if(!ids.length){toast('Complete some practice before retrying mistakes.');return;}
  if(!hasUnfinishedSession(store.data.session)){begin(ids,options.mode,replaceRoute);return;}
  pendingSet={ids,mode:options.mode,label:setName(options),replaceRoute};
  // A choice is not a start command: refreshing or going Back must keep the saved set.
  if(location.hash!=='#/practice')history[replaceRoute?'replaceState':'pushState'](null,'','#/practice');
  runVisible=false;formError='';render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
function onRoute(){
  runVisible=false;customVisible=false;pendingSet=null;formError='';
  if(location.hash.split('?')[0]==='#/topics')history.replaceState(null,'','#/');
  const [path,search='']=location.hash.slice(1).split('?');
  const params=new URLSearchParams(search);
  if(path==='/practice'){
    const topic=params.get('topic'),mode=params.get('mode');
    customVisible=params.get('settings')==='1'||['mixed','connect','retry'].includes(mode);
    if(topicById(topic)){builder.mode='topic';builder.topic=topic;builder.count=6;}
    else if(['mixed','connect','retry'].includes(mode)){builder.mode=mode;builder.count=6;}
    if(params.get('run')==='1'){
      if(store.data.session)runVisible=true;
      else history.replaceState(null,'','#/practice');
    }else if(topicById(topic)&&!customVisible){
      const action=topicPracticeAction(store.data.session,topic,questions);
      if(action==='resume'){showSession(true);return;}
      if(action==='start'||action==='choose'){requestSet({mode:'topic',topic,count:6},true);return;}
    }
  }
  render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
main.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='review'){const id=button.dataset.topic;if(store.data.reviewed[id])delete store.data.reviewed[id];else store.data.reviewed[id]=new Date().toISOString();store.save();render();toast(store.data.reviewed[id]?'Topic marked reviewed.':'Review mark removed.');}
  if(action==='mode'){builder.mode=button.dataset.mode;builder.count=6;render();}
  if(action==='start')requestSet({...builder});
  if(action==='quick-start')requestSet({mode:'mixed',count:6});
  if(action==='replace-session'&&pendingSet){const selected=pendingSet;begin(selected.ids,selected.mode,selected.replaceRoute);}
  if(action==='leave')location.hash='#/practice';
  if(action==='hint'){const s=store.data.session,id=s.ids[s.index];s.hints[id]=!s.hints[id];s.hintEverUsed??={};s.hintEverUsed[id]=true;store.save();render();}
  if(action==='next'){const s=store.data.session;if(!s.answers[s.ids[s.index]])return;if(s.index===s.ids.length-1)s.finished=true;else s.index++;store.save();formError='';render();main.focus();window.scrollTo({top:0});}
  if(action==='retry-session'){const s=store.data.session;begin(s.ids.filter(id=>!s.answers[id]?.correct),'retry');}
  if(action==='export-progress'){
    const data={...store.data,session:null,exportedAt:new Date().toISOString(),note:'Hub practice in this browser only; no external platform activity.'};
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`ce2134-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  if(action==='clear-progress'&&window.confirm('Clear this browser’s hub practice, review checklist, and saved session? Download your record first if you want to keep a copy.')){store.clear();render();toast('This browser’s hub record has been cleared.');}
});
main.addEventListener('change',event=>{
  if(event.target.id==='practiceTopic')builder.topic=event.target.value;
  if(event.target.id==='practiceCount')builder.count=Number(event.target.value);
  if(event.target.name==='answer'&&store.data.session){const id=store.data.session.ids[store.data.session.index];drafts[id]=event.target.value;main.querySelectorAll('.answer-option').forEach(label=>label.classList.toggle('chosen',label.querySelector('input').checked));}
});
main.addEventListener('input',event=>{if(event.target.name==='answer'&&store.data.session)drafts[store.data.session.ids[store.data.session.index]]=event.target.value;});
main.addEventListener('submit',event=>{
  if(event.target.id!=='answerForm')return;event.preventDefault();const s=store.data.session,id=s.ids[s.index];if(s.answers[id])return;
  const q=questions.find(item=>item.id===id);const value=new FormData(event.target).get('answer');const grade=gradeQuestion(q,value);
  if(!grade.valid){formError=grade.message;document.getElementById('answerError').textContent=formError;return;}
  const answer={value:grade.value,correct:grade.correct,hintUsed:!!(s.hintEverUsed?.[id]||s.hints[id])};s.answers[id]=answer;
  store.data.attempts.push({runId:s.id,questionId:id,topic:q.topic,...answer,at:new Date().toISOString()});store.save();formError='';render();document.getElementById('feedback')?.focus({preventScroll:true});
});
window.addEventListener('hashchange',onRoute);
document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();});
onRoute();
