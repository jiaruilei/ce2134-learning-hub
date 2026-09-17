const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Author inline notation explicitly, keeping prose and readable fallbacks separate
// from TeX. Ordinary strings are never interpreted as HTML or mathematical syntax.
export const inlineMath=(tex,text=tex)=>({tex,text});
export function mathText(strings,...values){
  return strings.flatMap((text,index)=>index<values.length?[text,values[index]]:[text]);
}
export function renderMathText(value){
  if(!Array.isArray(value))return escapeHtml(value);
  return value.map(part=>typeof part==='object'&&part!==null&&typeof part.tex==='string'
    ?`<span class="inline-math" data-tex="${escapeHtml(part.tex)}" data-math-display="inline">${escapeHtml(part.text)}</span>`
    :escapeHtml(part)).join('');
}

// Convert each equation independently so a route change cannot overwrite a new page.
// The original formula stays readable while MathJax loads or if conversion fails.
let readiness;
function ready(){
  if(!readiness){
    readiness = new Promise((resolve,reject)=>{
      if(window.MathJax?.startup?.promise){resolve();return;}
      const script=document.getElementById('mathjax-script');
      if(!script){reject(new Error('MathJax script is missing.'));return;}
      script.addEventListener('load',resolve,{once:true});
      script.addEventListener('error',()=>reject(new Error('MathJax could not be loaded.')),{once:true});
    }).then(()=>window.MathJax.startup.promise).then(()=>window.MathJax);
  }
  return readiness;
}

export async function renderEquations(root){
  const elements=[...root.querySelectorAll('[data-tex]:not([data-math-rendered])')];
  if(!elements.length)return;
  try{
    const mathjax=await ready();
    if(!document.getElementById('MJX-SVG-styles'))document.head.append(mathjax.svgStylesheet());
    for(const element of elements){
      if(!element.isConnected)continue;
      const fallback=element.textContent;
      const display=element.dataset.mathDisplay!=='inline';
      const metrics=mathjax.getMetricsFor(element,display);
      const equation=await mathjax.tex2svgPromise(element.dataset.tex,{...metrics,display});
      if(element.isConnected){
        element.setAttribute('role','math');
        element.setAttribute('aria-label',fallback);
        equation.setAttribute('aria-hidden','true');
        element.replaceChildren(equation);
        element.dataset.mathRendered='true';
      }
    }
  }catch(error){
    console.warn('Using the plain-text equation fallback.',error);
  }
}
