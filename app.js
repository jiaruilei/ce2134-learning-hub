import {topics} from './content/topics.js';
import {questions} from './content/questions.js';
import {gradeQuestion,makeSet,latestMissed,topicStats,validSession} from './lib/practice.js';
import {createStore} from './lib/storage.js';

const main=document.querySelector('main');
let browserStorage;try{browserStorage=window.localStorage;}catch{}
const store=createStore(browserStorage);
store.data.session=validSession(store.data.session,questions);
const knownQuestions=new Set(questions.map(q=>q.id));
store.data.attempts=store.data.attempts.filter(a=>knownQuestions.has(a.questionId));
const builder={mode:'mixed',topic:'pressure',count:6};
let runVisible=false,formError='',toastTimer;
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
function heroArt(){return `<svg class="hero-art" viewBox="0 0 510 310" role="img" aria-label="An illustration connecting pressure, flow, energy and momentum"><defs><linearGradient id="water" x1="0" x2="1"><stop stop-color="#acdce9"/><stop offset="1" stop-color="#caeee6"/></linearGradient></defs><path d="M25 148C100 148 150 99 225 116s105 106 176 53 52-83 89-91" fill="none" stroke="#d9e9e9" stroke-width="112"/><path d="M25 148C100 148 150 99 225 116s105 106 176 53 52-83 89-91" fill="none" stroke="url(#water)" stroke-width="100"/><g fill="none" stroke="#3a91a9" stroke-width="1.4" opacity=".65"><path d="M12 130c95 0 142-52 216-30s106 105 160 58 58-86 97-94"/><path d="M12 150c95 0 142-52 216-30s106 105 160 58 58-86 97-94"/><path d="M12 170c95 0 142-52 216-30s106 105 160 58 58-86 97-94"/></g><g fill="#247a91"><circle cx="90" cy="144" r="4"/><circle cx="178" cy="114" r="4"/><circle cx="286" cy="156" r="4"/><circle cx="361" cy="194" r="4"/><circle cx="440" cy="135" r="4"/></g><g fill="#fff" stroke="#dde7e7"><rect x="44" y="24" width="134" height="52" rx="12"/><rect x="300" y="239" width="160" height="52" rx="12"/></g><g font-family="system-ui" fill="#133b52"><text x="62" y="45" font-size="10" letter-spacing="1.5">CONTINUITY</text><text x="62" y="64" font-size="15">ρ₁A₁v₁ = ρ₂A₂v₂</text><text x="318" y="260" font-size="10" letter-spacing="1.5">MOMENTUM</text><text x="318" y="279" font-size="15">Force changes flow.</text></g><path d="M112 77v28m257 121v13" fill="none" stroke="#77a9ad" stroke-dasharray="3 4"/><text x="53" y="253" font-size="10" letter-spacing="2" font-family="system-ui" fill="#5b8086">ONE CONNECTED STORY</text></svg>`;}

function heading(kicker,title,text,extra=''){return `<div class="page-heading"><div><p class="eyebrow">${kicker}</p><h1>${title}</h1>${text?`<p class="lede">${text}</p>`:''}</div>${extra}</div>`;}
function launch(t,label='Open interactive lab'){return `<a class="button secondary" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;}
function topicCard(t){
  const stats=topicStats(store.data.attempts,t.id);
  return `<article class="topic-card" style="--topic-color:${esc(t.color)}"><a class="topic-card-main" href="#/topic/${t.id}"><div class="topic-card-top"><span class="topic-icon">${icon(t.id)}</span><span class="topic-number">${esc(t.number)}</span></div><p class="eyebrow">${esc(t.eyebrow)}</p><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p></a><div class="topic-meta"><span>${store.data.reviewed[t.id]?'<span class="review-check">✓ Reviewed</span>':esc(t.duration)}</span><span>${stats.count?`${stats.accuracy}% · ${stats.count} attempts`:'6 practice questions'}</span></div><div class="topic-card-bottom"><a href="#/topic/${t.id}">Review topic <span aria-hidden="true">→</span></a><a href="${esc(t.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(t.title)} lab in a new tab">Explore lab <span aria-hidden="true">↗</span></a></div></article>`;
}
function home(){
  const next=topics.find(t=>!store.data.reviewed[t.id])||topics[0];
  const attempts=store.data.attempts,correct=attempts.filter(a=>a.correct).length;
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> CE2134 · FLUID MECHANICS</p><h1>See how the<br>concepts connect.</h1><p>Build your intuition with interactive labs.<br>Put it to work with focused practice.</p><div class="button-row"><a class="button primary" href="#/topic/${next.id}">${reviewed().length?'Continue reviewing':'Start with the fundamentals'} <span aria-hidden="true">→</span></a><a class="quiet-link" href="#/practice">Try mixed practice ↗</a></div></div>${heroArt()}</section>
  <div class="stat-strip"><div><strong>${reviewed().length}<span>/ ${topics.length}</span></strong><span>Topics marked reviewed</span><div class="mini-track"><i style="width:${reviewed().length/topics.length*100}%"></i></div></div><div><strong>${attempts.length}</strong><span>Hub questions attempted</span></div><div><strong>${attempts.length?`${Math.round(correct/attempts.length*100)}<span>%</span>`:'—'}</strong><span>Practice accuracy</span></div></div>
  <section class="section-block"><div class="section-heading"><div><p class="eyebrow">YOUR LEARNING PATH</p><h2>Six ideas. One foundation.</h2></div><a class="quiet-link" href="#/topics">Browse the library <span aria-hidden="true">→</span></a></div><div class="topic-grid">${topics.map(topicCard).join('')}</div></section>
  <section class="revision-banner"><div class="revision-orbit" aria-hidden="true">↗</div><div><p class="eyebrow">BRING IT ALL TOGETHER</p><h2>Ready to connect the dots?</h2><p>Move between topics with a six-question revision set, or work through a problem that combines concepts.</p></div><div class="banner-actions"><a class="button primary" href="#/practice?mode=mixed">Start mixed revision →</a><a class="quiet-link" href="#/practice?mode=connect">Connect concepts ↗</a></div></section>`;
}
function topicLibrary(){return `${heading('THE TOPIC LIBRARY','Find your next connection.','Follow the suggested sequence, or go straight to the concept you want to revisit.')}<div class="learning-sequence" aria-label="Suggested topic sequence">${topics.map((t,i)=>`<a href="#/topic/${t.id}"><span>${i+1}</span>${esc(t.title)}</a>`).join('')}</div><div class="topic-grid">${topics.map(topicCard).join('')}</div><p class="footnote">Each review page links to an existing interactive lab. Labs open in a new tab, so this hub stays available.</p>`;}
function topicPage(t){
  const done=!!store.data.reviewed[t.id];
  const next=topicById(t.connection.nextId);
  return `<a class="back-link" href="#/topics">← Topic library</a><div class="topic-title" style="--topic-color:${esc(t.color)}"><span class="topic-icon large">${icon(t.id)}</span>${heading(`MODULE ${esc(t.number)} · ${esc(t.eyebrow)}`,esc(t.title),esc(t.description))}</div><div class="topic-layout"><div class="topic-body">
  <section class="review-section"><p class="eyebrow">01 / REVIEW</p><h2>What you should be able to do</h2><ul class="objective-list">${t.objectives.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>The essential relationships</h3><div class="equation-list">${t.equations.map(q=>`<article class="equation"><span>${esc(q.label)}</span><strong>${esc(q.formula)}</strong><p>${esc(q.note)}</p></article>`).join('')}</div><details class="assumptions" open><summary>Check the assumptions</summary><ul>${t.assumptions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details></section>
  <section class="review-section"><h2>Watch for these misconceptions</h2><div class="misconceptions">${t.misconceptions.map(m=>`<article><h3>${esc(m.claim)}</h3><p>${esc(m.correction)}</p></article>`).join('')}</div></section>
  <section class="activity review-section"><p class="eyebrow">02 / EXPLORE</p><h2>${esc(t.guidedActivity.title)}</h2><ol class="steps">${t.guidedActivity.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="reflection"><strong>Pause and explain</strong><p>${esc(t.guidedActivity.reflection)}</p></div>${launch(t)}<p class="small-note">Opens the existing platform in a new tab. Return here when you are ready to practise.</p></section>
  <section class="review-section practice-callout"><p class="eyebrow">03 / PRACTISE</p><h2>Make the idea your own.</h2><p>Try six questions with hints and worked solutions. Your answers here are saved in this browser.</p><a class="button primary" href="#/practice?topic=${t.id}">Practise ${esc(t.title.toLowerCase())} →</a></section>
  <section class="connection"><p class="eyebrow">THE NEXT CONNECTION</p><h2>${esc(t.connection.title)}</h2><p>${esc(t.connection.text)}</p>${next?`<a class="quiet-link" href="#/topic/${next.id}">Continue to ${esc(next.title)} →</a>`:'<a class="quiet-link" href="#/practice?mode=connect">Try a connecting problem →</a>'}</section></div>
  <aside class="topic-side"><div class="side-card"><p class="eyebrow">YOUR REVIEW</p><p class="review-time">${esc(t.duration)}</p><button class="button ${done?'secondary':'primary'} full" data-action="review" data-topic="${t.id}" aria-pressed="${done}">${done?'✓ Marked reviewed':'Mark as reviewed'}</button><p class="small-note">A personal checklist for the review page.</p><hr><h3>Useful foundations</h3>${t.prerequisites.length?t.prerequisites.map(id=>`<a class="side-link" href="#/topic/${id}">${esc(topicName(id))} →</a>`).join(''):'<p class="small-note">Start here. No earlier module is required.</p>'}<hr>${launch(t,'Launch the lab')}<p class="small-note">Lab activity is separate from your hub practice record.</p></div></aside></div>`;
}

function practiceBuilder(){
  const saved=store.data.session;
  const missed=latestMissed(store.data.attempts).length;
  const modes=[['mixed','↗','Mixed revision','One set spanning the six topics.'],['topic','◎','Focus on a topic','Build confidence in one concept.'],['connect','⤴','Connect concepts','Combine ideas in a single problem.'],['retry','↻','Retry mistakes',missed?`${missed} question${missed===1?'':'s'} to revisit.`:'Questions appear here after practice.']];
  return `${heading('THE PRACTICE STUDIO','A little challenge. A clearer idea.','Choose a focus, try your reasoning, then use the worked solution to check your approach.')}<div class="practice-layout"><section class="builder-card"><h2>What would you like to work on?</h2><div class="practice-modes">${modes.map(([id,symbol,title,desc])=>`<button class="mode-card ${builder.mode===id?'selected':''}" data-action="mode" data-mode="${id}" aria-pressed="${builder.mode===id}" ${id==='retry'&&!missed?'disabled':''}><span class="mode-symbol" aria-hidden="true">${symbol}</span><strong>${title}</strong><span>${desc}</span><i aria-hidden="true">${builder.mode===id?'●':'○'}</i></button>`).join('')}</div>
  <div class="builder-controls">${builder.mode==='topic'?`<label>Topic<select id="practiceTopic">${topics.map(t=>`<option value="${t.id}" ${t.id===builder.topic?'selected':''}>${esc(t.title)}</option>`).join('')}</select></label>`:''}<label>Set length<select id="practiceCount"><option value="6" ${builder.count===6?'selected':''}>6 questions · a quick session</option>${builder.mode==='mixed'||builder.mode==='retry'&&missed>6?`<option value="12" ${builder.count===12?'selected':''}>12 questions · a longer session</option>`:''}</select></label></div><button class="button primary" data-action="start" ${builder.mode==='retry'&&!missed?'disabled':''}>Start practice <span aria-hidden="true">→</span></button><p class="small-note">A set uses distinct questions from the ${questions.length}-question bank. Shorter pools use all available questions.</p></section>
  <aside class="practice-side">${saved&&!saved.finished?`<div class="resume-card"><p class="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h3>Your saved session</h3><p>${Object.keys(saved.answers).length} of ${saved.ids.length} questions checked.</p><button class="button secondary full" data-action="resume">Resume practice →</button><p class="small-note">Starting a new set replaces this unfinished session. Checked answers remain in My progress.</p></div>`:''}<div class="practice-note"><span class="note-icon" aria-hidden="true">✦</span><h3>Think first. Then check.</h3><p>Write down your assumptions and keep track of units. Use a hint when you need a starting point.</p><ul><li>Hints before you submit</li><li>Worked solutions after checking</li><li>Review links for every topic</li></ul></div><p class="small-note">For self-study. Your hub practice stays in this browser; it does not sync with the separate labs or an instructor dashboard.</p></aside></div>`;
}
function questionView(){
  const session=store.data.session;
  if(!session)return practiceBuilder();
  if(session.finished)return resultView();
  const q=questions.find(item=>item.id===session.ids[session.index]);
  const answer=session.answers[q.id],draft=answer?.value??drafts[q.id]??'';
  const hintUsed=!!session.hints[q.id];
  return `<div class="practice-top"><button class="text-button" data-action="leave">← Save & leave</button><span>${session.index+1} / ${session.ids.length} questions</span></div><div class="question-progress" aria-label="${Object.keys(session.answers).length} of ${session.ids.length} questions checked">${session.ids.map((id,i)=>`<span class="${session.answers[id]?(session.answers[id].correct?'correct':'incorrect'):i===session.index?'current':''}"></span>`).join('')}</div>
  <div class="question-layout"><section class="question-card"><div class="question-tags"><span class="topic-pill">${esc(topicName(q.topic))}</span><span>${esc(q.difficulty)}</span></div><h1>${esc(q.prompt)}</h1>${q.given?`<p class="givens">${esc(q.given)}</p>`:''}<form id="answerForm" novalidate>
  ${q.kind==='choice'?`<fieldset class="answer-options"><legend class="sr-only">Choose your answer</legend>${q.choices.map((choice,i)=>`<label class="answer-option ${String(draft)===String(i)?'chosen':''} ${answer&&i===q.answerIndex?'answer-correct':''}"><input type="radio" name="answer" value="${i}" ${String(draft)===String(i)?'checked':''} ${answer?'disabled':''}><span class="choice-letter">${String.fromCharCode(65+i)}</span><span>${esc(choice)}</span>${answer&&i===q.answerIndex?'<span class="option-check" aria-label="Correct answer">✓</span>':''}</label>`).join('')}</fieldset>`:`<label class="numeric-label" for="numericAnswer">Your answer</label><div class="numeric-answer"><input id="numericAnswer" name="answer" type="number" step="any" inputmode="decimal" placeholder="Enter a value" value="${esc(draft)}" ${answer?'disabled':''} aria-describedby="answerUnits answerError"><span id="answerUnits">${esc(q.unit)}</span></div><p class="small-note">Use the unit shown. Accepted tolerance: ±${esc(fmt(q.tolerance))} ${esc(q.unit)}.</p>`}
  <p id="answerError" class="form-error" role="alert">${esc(formError)}</p>${answer?'':`<div class="answer-actions"><button class="button primary" type="submit">Check my answer →</button><button type="button" class="text-button" data-action="hint">${hintUsed?'Hide hint':'I’d like a hint'}</button></div>`}</form>
  ${hintUsed&&!answer?`<div class="hint"><strong>A starting point</strong><p>${esc(q.hint)}</p></div>`:''}
  ${answer?`<section class="feedback ${answer.correct?'success':'try-again'}" tabindex="-1" id="feedback"><p class="eyebrow">${answer.correct?'✓ CORRECT':'↻ A CHANCE TO LEARN'}</p><h2>${answer.correct?'Your reasoning is on track.':'Compare your approach.'}</h2>${!answer.correct?`<p>The correct answer is <strong>${q.kind==='choice'?esc(q.choices[q.answerIndex]):`${esc(fmt(q.answer))} ${esc(q.unit)}`}</strong>.</p>`:''}<h3>Worked solution</h3><ol>${q.solution.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="takeaway"><strong>Keep this idea</strong><p>${esc(q.takeaway)}</p></div></section><div class="next-row"><button class="button primary" data-action="next">${session.index===session.ids.length-1?'See my summary':'Next question'} →</button></div>`:''}</section>
  <aside class="question-side"><div class="side-card"><p class="eyebrow">NEED A REFRESHER?</p><h3>Return to the concept.</h3><p>Use the review pages whenever you need to. Your checked answers are saved.</p>${(q.topic==='mixed'?(q.relatedTopics||q.tags||[]).filter(id=>topicById(id)):[q.topic]).map(id=>`<a href="#/topic/${id}" class="side-link">${esc(topicName(id))} →</a>`).join('')}<hr><span class="small-note">For calculations, use the constants and assumptions stated in the question.</span></div></aside></div>`;
}
function resultView(){
  const session=store.data.session,answers=Object.values(session.answers);
  const correct=answers.filter(a=>a.correct).length;
  const missed=session.ids.filter(id=>!session.answers[id]?.correct);
  return `<section class="result-hero"><p class="eyebrow">SESSION COMPLETE</p><h1>One session closer<br>to a clearer understanding.</h1><div class="result-score"><strong>${correct}</strong><span>/ ${session.ids.length}<small>questions correct</small></span></div><p>${missed.length?'Revisit the ideas below, then give them another go.':'Good work. Try connecting these ideas in a different context.'}</p><div class="button-row">${missed.length?'<button class="button primary" data-action="retry-session">Retry these questions →</button>':'<a class="button primary" href="#/practice?mode=connect">Connect concepts →</a>'}<button class="button secondary" data-action="leave">Choose a new set</button></div></section><section class="section-block"><div class="section-heading"><h2>Your question trail</h2><a class="quiet-link" href="#/progress">View all progress →</a></div><div class="question-trail">${session.ids.map((id,i)=>{const q=questions.find(x=>x.id===id),a=session.answers[id];return `<details><summary><span class="trail-result ${a.correct?'is-correct':'is-incorrect'}">${a.correct?'✓':'↻'}</span><span><small>${i+1} · ${esc(topicName(q.topic))}</small>${esc(q.prompt)}</span><span class="trail-expand" aria-hidden="true">+</span></summary><div><ol>${q.solution.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p>${esc(q.takeaway)}</p></div></details>`;}).join('')}</div></section>`;
}
function progressPage(){
  const attempts=store.data.attempts,correct=attempts.filter(a=>a.correct).length,missed=latestMissed(attempts);
  return `${heading('YOUR PERSONAL CHECK-IN','Small steps add up.','Your review checklist and practice record from this browser.')}<div class="progress-summary"><div><strong>${reviewed().length}<span> / 6</span></strong><p>Topics marked reviewed</p></div><div><strong>${attempts.length}</strong><p>Hub questions attempted</p></div><div><strong>${attempts.length?`${Math.round(correct/attempts.length*100)}%`:'—'}</strong><p>Accuracy across attempts</p></div></div>
  ${!attempts.length?`<div class="empty-state"><span aria-hidden="true">✎</span><h2>Your practice story starts here.</h2><p>Complete a short set to see your accuracy and the questions you can revisit.</p><a class="button primary" href="#/practice">Try your first set →</a></div>`:''}<section class="section-block"><div class="section-heading"><h2>A topic-by-topic view</h2>${missed.length?`<a class="quiet-link" href="#/practice?mode=retry">Retry ${missed.length} missed questions →</a>`:''}</div><div class="progress-topics">${topics.map(t=>{const s=topicStats(attempts,t.id);return `<article><span class="topic-icon" style="--topic-color:${esc(t.color)}">${icon(t.id)}</span><div class="progress-topic-name"><a href="#/topic/${t.id}">${esc(t.title)}</a><small>${store.data.reviewed[t.id]?'✓ Review marked complete':'Review not marked yet'}</small></div><div class="topic-score"><strong>${s.count?`${s.accuracy}%`:'—'}</strong><small>${s.count} attempt${s.count===1?'':'s'}</small></div><a class="button secondary compact" href="#/practice?topic=${t.id}">Practise <span class="sr-only">${esc(t.title)}</span> →</a></article>`;}).join('')}</div></section>
  <section class="data-note"><div><h3>About this record</h3><p>Progress is stored only in this browser. It does not include activity in the separate interactive labs, does not follow you to another device, and is not sent to your instructor. “Reviewed” is your own checklist; accuracy describes your practice attempts.</p><p>You can download a copy of your hub record for your own reference.</p></div><button class="button secondary" data-action="export-progress">Download my record ↓</button></section>${attempts.length?`<details class="clear-progress"><summary>Manage this browser’s record</summary><p>Clearing the record removes your hub attempts, review checklist, and saved session from this browser.</p><button class="text-button danger" data-action="clear-progress">Clear this browser’s record</button></details>`:''}`;
}

function render(){
  const hash=location.hash.slice(1)||'/';
  const [path,search='']=hash.split('?');
  const params=new URLSearchParams(search);
  const page=path.split('/')[1]||'home';
  const active=page==='topic'?'topics':page;
  document.querySelectorAll('[data-nav]').forEach(a=>{const selected=a.dataset.nav===active;a.classList.toggle('active',selected);selected?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
  const labels={home:'Overview',topics:'Topic library',topic:'Topic review',practice:'Practice studio',progress:'My progress'};
  document.getElementById('pageLabel').textContent=labels[page]||'Overview';
  let html;
  if(page==='home')html=home();
  else if(page==='topics')html=topicLibrary();
  else if(page==='topic'){const t=topicById(path.split('/')[2]);html=t?topicPage(t):`${heading('TOPIC NOT FOUND','Let’s get you back on track.','Choose a topic from the library.')}<a class="button primary" href="#/topics">Open topic library →</a>`;}
  else if(page==='practice')html=runVisible?questionView():practiceBuilder();
  else if(page==='progress')html=progressPage();
  else html=`${heading('PAGE NOT FOUND','Return to your learning path.','')}<a class="button primary" href="#/">Back to overview →</a>`;
  main.innerHTML=(!store.available?'<div class="storage-alert" role="status">Browser storage is unavailable. You can practise, but progress may not survive closing this page.</div>':'')+html;
  document.title=`${page==='topic'?topicName(path.split('/')[2]):labels[page]||'Overview'} · CE2134 Learning Hub`;
}
function toast(text){clearTimeout(toastTimer);const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function begin(ids,mode){
  if(!ids.length){toast('Complete some practice before retrying mistakes.');return;}
  for(const id of Object.keys(drafts))delete drafts[id];
  store.data.session={id:crypto.randomUUID(),ids,index:0,answers:{},hints:{},mode,finished:false};store.save();runVisible=true;formError='';render();main.focus();window.scrollTo({top:0});
}
function onRoute(){
  runVisible=false;formError='';
  const params=new URLSearchParams((location.hash.split('?')[1]||''));
  if(topicById(params.get('topic'))){builder.mode='topic';builder.topic=params.get('topic');builder.count=6;}
  else if(['mixed','connect','retry'].includes(params.get('mode'))){builder.mode=params.get('mode');builder.count=6;}
  render();window.scrollTo({top:0});main.focus({preventScroll:true});
}
main.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='review'){const id=button.dataset.topic;if(store.data.reviewed[id])delete store.data.reviewed[id];else store.data.reviewed[id]=new Date().toISOString();store.save();render();toast(store.data.reviewed[id]?'Topic marked reviewed.':'Review mark removed.');}
  if(action==='mode'){builder.mode=button.dataset.mode;builder.count=6;render();}
  if(action==='start')begin(makeSet(questions,{...builder,attempts:store.data.attempts}),builder.mode);
  if(action==='resume'){runVisible=true;render();main.focus();}
  if(action==='leave'){runVisible=false;render();main.focus();window.scrollTo({top:0});}
  if(action==='hint'){const s=store.data.session,id=s.ids[s.index];s.hints[id]=!s.hints[id];s.hintEverUsed??={};s.hintEverUsed[id]=true;store.save();render();}
  if(action==='next'){const s=store.data.session;if(!s.answers[s.ids[s.index]])return;if(s.index===s.ids.length-1)s.finished=true;else s.index++;store.save();formError='';render();main.focus();window.scrollTo({top:0});}
  if(action==='retry-session'){const s=store.data.session;begin(s.ids.filter(id=>!s.answers[id]?.correct),'retry');}
  if(action==='export-progress'){
    const data={...store.data,session:null,exportedAt:new Date().toISOString(),note:'Hub practice in this browser only; no external lab activity.'};
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
