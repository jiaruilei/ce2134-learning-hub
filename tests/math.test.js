import test from 'node:test';
import assert from 'node:assert/strict';
import {inlineMath,mathText,renderMathText,renderEquations} from '../lib/math.js';

test('prose keeps literal symbols and escapes HTML unless math is explicitly authored',()=>{
  assert.equal(renderMathText('x_y < 3 & $5'), 'x_y &lt; 3 &amp; $5');
  const text=mathText`Depth ${inlineMath(String.raw`h_{\mathrm c}`,'h_c')} is < 3 m.`;
  const html=renderMathText(text);
  assert.match(html,/data-tex="h_\{\\mathrm c\}" data-math-display="inline">h_c<\/span>/);
  assert.ok(html.endsWith(' is &lt; 3 m.'));
});

test('inline math attributes and fallback text cannot inject markup',()=>{
  const html=renderMathText(mathText`${inlineMath('x" onmouseover="bad','<img src=x>')}`);
  assert.match(html,/data-tex="x&quot; onmouseover=&quot;bad"/);
  assert.ok(html.includes('&lt;img src=x&gt;'));
  assert.ok(!html.includes('<img'));
});

test('inline notation uses inline layout while display equations and navigation remain safe',async()=>{
  const originalWindow=globalThis.window,originalDocument=globalThis.document;
  const conversions=[];
  const node=(tex,display,connected=true)=>({
    dataset:{tex,mathDisplay:display},textContent:`Readable ${tex}`,isConnected:connected,
    attributes:{},setAttribute(name,value){this.attributes[name]=value;},
    replaceChildren(child){this.child=child;},
  });
  const inline=node('h_c','inline'),display=node('F = p A'),detached=node('skip','inline',false);
  const removedDuringConversion=node('leaving','inline');
  globalThis.window={MathJax:{
    startup:{promise:Promise.resolve()},
    getMetricsFor(_element,isDisplay){return {em:16,display:isDisplay};},
    async tex2svgPromise(tex,options){
      conversions.push({tex,display:options.display});
      if(tex==='leaving')removedDuringConversion.isConnected=false;
      return {setAttribute(){}};
    },
  }};
  globalThis.document={getElementById(){return {};}};
  try{
    await renderEquations({querySelectorAll(){return [inline,display,detached,removedDuringConversion];}});
    assert.deepEqual(conversions,[{tex:'h_c',display:false},{tex:'F = p A',display:true},{tex:'leaving',display:false}]);
    assert.equal(inline.dataset.mathRendered,'true');
    assert.equal(inline.attributes['aria-label'],'Readable h_c');
    assert.equal(display.dataset.mathRendered,'true');
    assert.equal(detached.child,undefined);
    assert.equal(removedDuringConversion.child,undefined);
  }finally{
    if(originalWindow===undefined)delete globalThis.window;else globalThis.window=originalWindow;
    if(originalDocument===undefined)delete globalThis.document;else globalThis.document=originalDocument;
  }
});
