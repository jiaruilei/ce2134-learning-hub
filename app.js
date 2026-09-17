import {topics} from './content/topics.js';
import {questions} from './content/questions.js';
import {presentQuestion,presentUnit,presentQuantity} from './content/question-math.js';
import {CHAPTER_SET_SIZE,gradeQuestion,makeSet} from './lib/practice.js';
import {createStore} from './lib/storage.js';
import {renderEquations,renderMathText as rich} from './lib/math.js';
import {hasUnfinishedSession,normalizeSessions,topicProgress} from './lib/practice-flow.js';

const main=document.querySelector('main');
let browserStorage;try{browserStorage=window.localStorage;}catch{}
const store=createStore(browserStorage);
const migratedTopic=normalizeSessions(store.data,questions);
const knownQuestions=new Set(questions.map(q=>q.id));
store.data.attempts=store.data.attempts.filter(a=>knownQuestions.has(a.questionId));
store.save();
let runVisible=false,activeTopic=null,formError='',toastTimer;
const drafts={};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const topicById=id=>topics.find(t=>t.id===id);
const topicName=id=>topicById(id)?.title||'Connecting concepts';
const currentSession=()=>activeTopic?store.data.topicSessions[activeTopic]:null;
const practiceLabel=id=>hasUnfinishedSession(store.data.topicSessions[id])?'Resume practice':store.data.topicSessions[id]?.finished?'Practice again':'Practice';

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
function launch(t,label='Interactive platform'){return `<a class="button secondary" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer" title="Opens in a new tab">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;}
function topicCard(t){
  const progress=topicProgress(store.data.topicSessions[t.id]);
  const total=progress.total||Math.min(CHAPTER_SET_SIZE,questions.filter(q=>q.topic===t.id).length);
  const label=practiceLabel(t.id);
  return `<article class="topic-card" style="--topic-color:${esc(t.color)}"><a class="topic-card-main" href="#/topic/${t.id}"><div class="topic-card-top"><span class="topic-icon">${icon(t.id)}</span><span class="topic-number">${esc(t.number)}</span></div><h2>${esc(t.title)}</h2></a><div class="topic-practice-progress"><div class="topic-progress-label"><span>Practice progress</span><span>${progress.checked} / ${total}</span></div><progress max="${total}" value="${progress.checked}" aria-label="${esc(t.title)} practice progress: ${progress.checked} of ${total} questions checked"></progress></div><div class="topic-meta"><span>${store.data.reviewed[t.id]?'<span class="review-check">✓ Reviewed</span>':'Not reviewed'}</span></div><div class="topic-card-bottom"><a href="#/topic/${t.id}" aria-label="Review ${esc(t.title)}">Review</a><a class="card-practise" href="#/practice?topic=${t.id}" aria-label="${label}: ${esc(t.title)}">${label}</a><a class="platform-link" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer" title="Opens in a new tab" aria-label="Interactive platform for ${esc(t.title)} (opens in a new tab)">Interactive platform</a></div></article>`;
}
function home(){
  return `${heading('Topics')}
  <div class="topic-grid">${topics.map(topicCard).join('')}</div>`;
}
function topicPage(t){
  const done=!!store.data.reviewed[t.id];
  const next=topicById(t.connection.nextId);
  return `<a class="back-link" href="#/">← Topics</a><header class="topic-header"><div class="topic-title" style="--topic-color:${esc(t.color)}"><span class="topic-icon large">${icon(t.id)}</span>${heading(esc(t.title))}</div><nav class="topic-actions" aria-label="Topic actions"><a class="button secondary current" href="#/topic/${t.id}" aria-current="page">Review</a>${launch(t)}<a class="button primary" href="#/practice?topic=${t.id}">${practiceLabel(t.id)}</a></nav></header><div class="topic-layout"><div class="topic-body">
  <details class="review-section review-details"><summary><h2>Learning objectives</h2></summary><ul class="objective-list">${t.objectives.map(x=>`<li>${rich(x)}</li>`).join('')}</ul></details>
  <section class="review-section"><h2>Key equations</h2><div class="equation-list">${t.equations.map(q=>`<article class="equation"><span>${rich(q.label)}</span><div class="equation-formula" ${q.tex?`data-tex="${esc(q.tex)}"`:''}>${rich(q.formula)}</div><p>${rich(q.note)}</p></article>`).join('')}</div><section class="assumptions"><h2>Assumptions</h2><ul>${t.assumptions.map(x=>`<li>${rich(x)}</li>`).join('')}</ul></section></section>
  <details class="review-section review-details"><summary><h2>Common misconceptions</h2></summary><div class="misconceptions">${t.misconceptions.map(m=>`<article><h3>${rich(m.claim)}</h3><p>${rich(m.correction)}</p></article>`).join('')}</div></details>
  <details class="review-section review-details"><summary><h2>Guided activity</h2></summary><h3>${rich(t.guidedActivity.title)}</h3><ol class="steps">${t.guidedActivity.steps.map(s=>`<li>${rich(s)}</li>`).join('')}</ol><div class="reflection"><strong>Pause and explain</strong><p>${rich(t.guidedActivity.reflection)}</p></div></details>
  <details class="connection review-details"><summary><h2>${rich(t.connection.title)}</h2></summary><p>${rich(t.connection.text)}</p>${next?`<a class="quiet-link" href="#/topic/${next.id}">${esc(next.title)} →</a>`:'<a class="quiet-link" href="#/">All topics →</a>'}</details></div>
  <aside class="topic-side"><div class="side-card"><button class="button ${done?'secondary':'primary'} full" data-action="review" data-topic="${t.id}" aria-pressed="${done}">${done?'✓ Reviewed':'Mark as reviewed'}</button>${t.prerequisites.length?`<hr><h2>Prerequisites</h2>${t.prerequisites.map(id=>`<a class="side-link" href="#/topic/${id}">${esc(topicName(id))} →</a>`).join('')}`:''}</div></aside></div>`;
}

function questionView(){
  const session=currentSession();
  if(!session)return home();
  if(session.finished)return resultView();
  const q=presentQuestion(questions.find(item=>item.id===session.ids[session.index]));
  const answer=session.answers[q.id],draft=answer?.value??drafts[`${session.id}:${q.id}`]??'';
  const hintUsed=!!session.hints[q.id];
  return `<div class="practice-top"><button class="text-button" data-action="leave">← Save & leave</button><span>${session.index+1} / ${session.ids.length} questions</span></div><div class="question-progress" aria-label="${Object.keys(session.answers).length} of ${session.ids.length} questions checked">${session.ids.map((id,i)=>`<span class="${session.answers[id]?(session.answers[id].correct?'correct':'incorrect'):i===session.index?'current':''}"></span>`).join('')}</div>
  <div class="question-layout"><section class="question-card"><div class="question-tags"><span class="topic-pill">${esc(topicName(q.topic))}</span><span>${esc(q.difficulty)}</span></div><h1>${rich(q.prompt)}</h1>${q.given?`<p class="givens">${rich(q.given)}</p>`:''}<form id="answerForm" novalidate>
  ${q.kind==='choice'?`<fieldset class="answer-options"><legend class="sr-only">Choose your answer</legend>${q.choices.map((choice,i)=>`<label class="answer-option ${String(draft)===String(i)?'chosen':''} ${answer&&i===q.answerIndex?'answer-correct':''}"><input type="radio" name="answer" value="${i}" ${String(draft)===String(i)?'checked':''} ${answer?'disabled':''}><span class="choice-letter">${String.fromCharCode(65+i)}</span><span>${rich(choice)}</span>${answer&&i===q.answerIndex?'<span class="option-check" aria-label="Correct answer">✓</span>':''}</label>`).join('')}</fieldset>`:`<label class="numeric-label" for="numericAnswer">Your answer</label><div class="numeric-answer"><input id="numericAnswer" name="answer" type="number" step="any" inputmode="decimal" placeholder="Enter a value" value="${esc(draft)}" ${answer?'disabled':''} aria-describedby="answerUnits answerError"><span id="answerUnits">${rich(presentUnit(q.unit))}</span></div><p class="small-note">Use the unit shown. Accepted tolerance: ±${rich(presentQuantity(q.tolerance,q.unit))}.</p>`}
  <p id="answerError" class="form-error" role="alert">${esc(formError)}</p>${answer?'':`<div class="answer-actions"><button class="button primary" type="submit">Check my answer →</button><button type="button" class="text-button" data-action="hint">${hintUsed?'Hide hint':'I’d like a hint'}</button></div>`}</form>
  ${hintUsed&&!answer?`<div class="hint"><strong>A starting point</strong><p>${rich(q.hint)}</p></div>`:''}
  ${answer?`<section class="feedback ${answer.correct?'success':'try-again'}" tabindex="-1" id="feedback"><h2>${answer.correct?'Correct':'Not quite'}</h2>${!answer.correct?`<p>The correct answer is <strong>${q.kind==='choice'?rich(q.choices[q.answerIndex]):rich(presentQuantity(q.answer,q.unit))}</strong>.</p>`:''}<h3>Worked solution</h3><ol>${q.solution.map(s=>`<li>${rich(s)}</li>`).join('')}</ol><div class="takeaway"><strong>Keep this idea</strong><p>${rich(q.takeaway)}</p></div></section><div class="next-row"><button class="button primary" data-action="next">${session.index===session.ids.length-1?'See my summary':'Next question'} →</button></div>`:''}</section>
  <aside class="question-side"><div class="side-card"><h2>Review topic</h2>${(q.topic==='mixed'?(q.relatedTopics||q.tags||[]).filter(id=>topicById(id)):[q.topic]).map(id=>`<a href="#/topic/${id}" class="side-link">${esc(topicName(id))} →</a>`).join('')}</div></aside></div>`;
}
function resultView(){
  const session=currentSession(),answers=Object.values(session.answers);
  const correct=answers.filter(a=>a.correct).length;
  const missed=session.ids.filter(id=>!session.answers[id]?.correct);
  return `<section class="result-hero"><h1>Session complete</h1><div class="result-score"><strong>${correct}</strong><span>/ ${session.ids.length}<small>questions correct</small></span></div><div class="button-row">${missed.length?'<button class="button primary" data-action="retry-session">Retry these questions →</button>':''}<button class="button ${missed.length?'secondary':'primary'}" data-action="leave">Back to topic</button></div></section><section class="section-block"><div class="section-heading"><h2>Answers &amp; solutions</h2><a class="quiet-link" href="#/">All topics →</a></div><div class="question-trail">${session.ids.map((id,i)=>{const q=presentQuestion(questions.find(x=>x.id===id)),a=session.answers[id];return `<details><summary><span class="trail-result ${a.correct?'is-correct':'is-incorrect'}" aria-label="${a.correct?'Correct':'Incorrect'}">${a.correct?'✓':'↻'}</span><span><small>${i+1} · ${esc(topicName(q.topic))}</small>${rich(q.prompt)}</span><span class="trail-expand" aria-hidden="true">+</span></summary><div><ol>${q.solution.map(s=>`<li>${rich(s)}</li>`).join('')}</ol><p>${rich(q.takeaway)}</p></div></details>`;}).join('')}</div></section>`;
}
function render(){
  const hash=location.hash.slice(1)||'/';
  const [path]=hash.split('?');
  const page=path.split('/')[1]||'home';
  const labels={home:'Topics',topic:'Topic review',practice:activeTopic?topicName(activeTopic)+' practice':'Topics'};
  document.getElementById('pageLabel').textContent=labels[page]||'Topics';
  let html;
  if(page==='home')html=home();
  else if(page==='topic'){const t=topicById(path.split('/')[2]);html=t?topicPage(t):`${heading('Topic not found')}<a class="button primary" href="#/">Topics →</a>`;}
  else if(page==='practice')html=runVisible?questionView():home();
  else html=`${heading('Page not found')}<a class="button primary" href="#/">Topics →</a>`;
  main.innerHTML=(!store.available?'<div class="storage-alert" role="status">Browser storage is unavailable. You can practise, but progress may not survive closing this page.</div>':'')+html;
  void renderEquations(main);
  document.title=`${page==='topic'?topicName(path.split('/')[2]):labels[page]||'Topics'} · CE2134 Learning Hub (Part 1)`;
}
function toast(text){clearTimeout(toastTimer);const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function showSession(replaceRoute=false){
  const route=`#/practice?run=1&topic=${activeTopic}`;
  if(replaceRoute||location.hash!==route)history[replaceRoute?'replaceState':'pushState'](null,'',route);
  runVisible=true;formError='';render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
function begin(ids,mode,replaceRoute=false){
  if(!ids.length){toast('Complete some practice before retrying mistakes.');return;}
  const session={id:crypto.randomUUID(),ids,index:0,answers:{},hints:{},mode,finished:false};
  store.data.topicSessions[activeTopic]=session;
  store.save();showSession(replaceRoute);
}
function startChapter(topic,replaceRoute=false){
  activeTopic=topic;
  if(hasUnfinishedSession(currentSession())){showSession(replaceRoute);return;}
  begin(makeSet(questions,{mode:'topic',topic,count:CHAPTER_SET_SIZE,attempts:store.data.attempts}),'topic',replaceRoute);
}
function onRoute(){
  runVisible=false;activeTopic=null;formError='';
  const [path,search='']=location.hash.slice(1).split('?');
  const params=new URLSearchParams(search);
  if(path==='/topics'||path==='/progress')history.replaceState(null,'','#/');
  if(path==='/practice'){
    const requested=params.get('topic');
    const topic=topicById(requested)?requested:!requested&&params.get('run')==='1'?migratedTopic:null;
    if(topic){
      activeTopic=topic;
      if(params.get('run')!=='1'){startChapter(topic,true);return;}
      if(currentSession()){showSession(true);return;}
      history.replaceState(null,'','#/topic/'+topic);
    }else history.replaceState(null,'','#/');
  }
  render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
main.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='review'){const id=button.dataset.topic;if(store.data.reviewed[id])delete store.data.reviewed[id];else store.data.reviewed[id]=new Date().toISOString();store.save();render();toast(store.data.reviewed[id]?'Topic marked reviewed.':'Review mark removed.');}
  if(action==='leave')location.hash=activeTopic?`#/topic/${activeTopic}`:'#/';
  if(action==='hint'){const s=currentSession(),id=s.ids[s.index];s.hints[id]=!s.hints[id];s.hintEverUsed??={};s.hintEverUsed[id]=true;store.save();render();}
  if(action==='next'){const s=currentSession();if(!s.answers[s.ids[s.index]])return;if(s.index===s.ids.length-1)s.finished=true;else s.index++;store.save();formError='';render();main.focus();window.scrollTo({top:0});}
  if(action==='retry-session'){const s=currentSession();begin(s.ids.filter(id=>!s.answers[id]?.correct),'retry');}
});
document.querySelector('.page-footer').addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='clear-progress'){
    const dialog=document.getElementById('clearRecordDialog');
    dialog.returnValue='cancel';dialog.showModal();
  }
});
document.getElementById('clearRecordDialog').addEventListener('close',event=>{
  if(event.target.returnValue!=='clear')return;
  store.clear();for(const key of Object.keys(drafts))delete drafts[key];
  history.replaceState(null,'','#/');onRoute();toast('This browser’s hub record has been cleared.');
});
main.addEventListener('change',event=>{
  if(event.target.name==='answer'&&currentSession()){const s=currentSession(),id=s.ids[s.index];drafts[`${s.id}:${id}`]=event.target.value;main.querySelectorAll('.answer-option').forEach(label=>label.classList.toggle('chosen',label.querySelector('input').checked));}
});
main.addEventListener('input',event=>{if(event.target.name==='answer'&&currentSession()){const s=currentSession();drafts[`${s.id}:${s.ids[s.index]}`]=event.target.value;}});
main.addEventListener('submit',event=>{
  if(event.target.id!=='answerForm')return;event.preventDefault();const s=currentSession(),id=s.ids[s.index];if(s.answers[id])return;
  const q=questions.find(item=>item.id===id);const value=new FormData(event.target).get('answer');const grade=gradeQuestion(q,value);
  if(!grade.valid){formError=grade.message;document.getElementById('answerError').textContent=formError;return;}
  const answer={value:grade.value,correct:grade.correct,hintUsed:!!(s.hintEverUsed?.[id]||s.hints[id])};s.answers[id]=answer;
  store.data.attempts.push({runId:s.id,questionId:id,topic:q.topic,...answer,at:new Date().toISOString()});store.save();formError='';render();document.getElementById('feedback')?.focus({preventScroll:true});
});
window.addEventListener('hashchange',onRoute);
document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();});
onRoute();
