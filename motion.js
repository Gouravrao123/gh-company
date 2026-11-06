(function(){
'use strict';
var d=document,de=d.documentElement,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
de.classList.add('js');if(RM)de.classList.add('rm');
function $(s,c){return(c||d).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}
function boot(){
var IO='IntersectionObserver'in window;
/* shared observer: adds .in once, runs one-off effects, tracks live visibility */
var io=IO&&new IntersectionObserver(function(es){es.forEach(function(e){var t=e.target;
 if(t._live){t._vis=e.isIntersecting;if(e.isIntersecting&&t.classList.contains('rv'))t.classList.add('in');if(t._onvis)t._onvis(e.isIntersecting);return}
 if(!e.isIntersecting)return;io.unobserve(t);t.classList.add('in');
 if(t.classList.contains('cu'))count(t);if(t.classList.contains('roll'))roll(t)})},{rootMargin:'0px 0px -6% 0px',threshold:.12});
function live(el,fn){if(!io){return}el._live=1;el._onvis=fn;io.observe(el)}
function fmt(n){return n.toLocaleString('en-IN')}
function ease(t){return 1-Math.pow(1-t,3)}
function tween(ms,step,end){var s=null;function f(ts){if(s===null)s=ts;var p=Math.min(1,(ts-s)/ms);step(ease(p));if(p<1)requestAnimationFrame(f);else if(end)end()}requestAnimationFrame(f)}
/* 05 count-up */
function count(el){if(RM)return;var to=+el.getAttribute('data-to'),pre=el.getAttribute('data-prefix')||'',suf=el.getAttribute('data-suffix')||'',fin=el.textContent;
 tween(1000,function(p){el.textContent=pre+fmt(Math.round(to*p))+suf},function(){el.textContent=fin})}
/* 10 price roll */
function roll(el){if(RM)return;var fin=el.textContent,nums=fin.match(/\d[\d,]*/g);if(!nums)return;var vals=nums.map(function(n){return+n.replace(/,/g,'')});
 tween(900,function(p){var i=0;el.textContent=fin.replace(/\d[\d,]*/g,function(){var v=vals[i++];return fmt(Math.round(v*p))})},function(){el.textContent=fin})}
/* scroll reveal: only items below the fold, so nothing flickers on load */
(function(){if(RM||!io)return;var H=window.innerHeight;
 $$('.card,.post,.why>div,.steps>div,.trio>div,.statgrid>div,.vs-r,.demo-win,.ba,.deckwrap,.tbl').forEach(function(el){
  if(el.getBoundingClientRect().top<H*.95)return;var p=el.parentNode,i=p?Array.prototype.indexOf.call(p.children,el):0;
  el.classList.add('rv');el.style.setProperty('--d',Math.min(i,5)*70+'ms');io.observe(el)})})();
$$('.cu,.roll,.steps.draw').forEach(function(el){if(io)io.observe(el);else el.classList.add('in')});
if(RM)$$('.steps.draw').forEach(function(e){e.classList.add('in')});
/* 02 word rotator: starts after the first user interaction so it never changes the LCP candidate */
(function(){var el=$('[data-rot]');if(!el||RM)return;var w=el.getAttribute('data-rot').split('|'),i=0,run=true,busy=false,go=false;
 live(el,function(v){run=v});
 function start(){if(go)return;go=true;['pointerdown','keydown','touchstart','scroll','mousemove'].forEach(function(ev){removeEventListener(ev,start)});
  setInterval(function(){if(!run||busy||d.hidden)return;busy=true;el.classList.add('out');
   setTimeout(function(){i=(i+1)%w.length;el.textContent=w[i];el.classList.remove('out');el.classList.add('pre');void el.offsetWidth;el.classList.remove('pre');busy=false},230)},2800)}
 ['pointerdown','keydown','touchstart','scroll','mousemove'].forEach(function(ev){addEventListener(ev,start,{passive:true})})})();
/* pause the orbit animation when hero is off-screen */
(function(){var v=$('.viz');if(!v)return;live(v,function(on){v.classList.toggle('pz',!on)})})();
/* 07 cursor tour */
$$('.demo').forEach(function(el){if(RM){el.classList.add('rm');return}live(el,function(on){el.classList.toggle('play',on)})});
/* 04 answer shuffle */
$$('.deck').forEach(function(dk){var wrap=dk.parentNode,busy=false,hover=false,run=true;
 function mark(){Array.prototype.forEach.call(dk.children,function(li,i){li.inert=i>0;li.setAttribute('aria-hidden',i>0?'true':'false')})}mark();
 function next(){if(busy)return;busy=true;var t=dk.firstElementChild;if(!t){busy=false;return}t.classList.add('leave');setTimeout(function(){t.classList.remove('leave');dk.appendChild(t);mark();busy=false},RM?0:420)}
 function prev(){if(busy)return;var l=dk.lastElementChild;if(l){dk.insertBefore(l,dk.firstElementChild);mark()}}
 var n=$('[data-deck=next]',wrap),p=$('[data-deck=prev]',wrap);if(n)n.addEventListener('click',next);if(p)p.addEventListener('click',prev);
 wrap.addEventListener('mouseenter',function(){hover=true});wrap.addEventListener('mouseleave',function(){hover=false});wrap.addEventListener('focusin',function(){hover=true});wrap.addEventListener('focusout',function(){hover=false});
 if(!RM){live(wrap,function(v){run=v});setInterval(function(){if(run&&!hover&&!d.hidden)next()},6500)}});
/* 09 before / after */
$$('.ba').forEach(function(b){var r=$('input',b);if(!r)return;function s(){b.style.setProperty('--p',r.value+'%')}r.addEventListener('input',s);s()});
/* 03 update pings: real information only, max 3 per visit, easy to close */
(function(){if(/\/contact\/?(index\.html)?$/.test(location.pathname)||$('.nf'))return;var K='ghp',n=0;try{n=+sessionStorage.getItem(K)||0}catch(e){}if(n>=3)return;
 var base=(function(){var s=$('script[src$="motion.js"]');return s?s.src.replace(/motion\.js.*$/,''):'/'})(),idx=location.protocol==='file:'?'index.html':'';
 var M=[['New guide: Google Ads basics for small businesses','blog/google-ads-basics-for-small-businesses/'],['All Services Package: 10% off the total price','digital-marketing-agency-pricing-india/'],['Free consultation: tell us your goal','contact/'],['Prices start at \u20B915,000 per month','digital-marketing-agency-pricing-india/']];
 var el=d.createElement('div');el.className='ping';el.setAttribute('role','status');el.setAttribute('aria-live','polite');
 el.innerHTML='<i aria-hidden="true"></i><a href="#"></a><button type="button" aria-label="Close notification">\u00D7</button>';d.body.appendChild(el);
 var a=$('a',el),x=$('button',el),k=(n+Math.floor(Date.now()/1000))%M.length,timer;
 x.addEventListener('click',function(){el.classList.remove('on');try{sessionStorage.setItem(K,'9')}catch(e){}n=9});
 function show(){if(n>=3||d.hidden||$('#amov:not([hidden])')){timer=setTimeout(show,8000);return}
  var m=M[k%M.length];k++;a.textContent=m[0];a.href=base+m[1]+(m[1].slice(-1)==='/'?idx:'');el.classList.add('on');n++;try{sessionStorage.setItem(K,String(n))}catch(e){}
  setTimeout(function(){el.classList.remove('on')},6500);if(n<3)timer=setTimeout(show,22000)}
 timer=setTimeout(show,9000)})();
/* 12 click -> success: checkmark + confetti when a form reports success */
function burst(near){var r=near.getBoundingClientRect(),o=d.createElement('div');o.className='okfx';o.style.left=(r.left+Math.min(r.width,260)/2)+'px';o.style.top=Math.max(90,r.top)+'px';
 var h='<svg viewBox="0 0 56 56" fill="none" stroke="#ffb51b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="28" cy="28" r="24" stroke-opacity=".35"/><path d="M16 29l8 8 16-18"/></svg>';
 if(!RM)for(var i=0;i<16;i++){var a=Math.PI*2*i/16,dist=50+Math.random()*50;h+='<s style="--i:'+i+';--x:'+Math.round(Math.cos(a)*dist)+'px;--y:'+Math.round(Math.sin(a)*dist-30)+'px;--r:'+Math.round(Math.random()*360)+'deg"></s>'}
 o.innerHTML=h;d.body.appendChild(o);setTimeout(function(){o.remove()},1700)}
d.addEventListener('submit',function(e){var f=e.target;if(!f||f.tagName!=='FORM')return;var tries=0,t=setInterval(function(){var s=f.querySelector('[role=status]');tries++;
 if(s&&/Thank you|WhatsApp has opened/.test(s.textContent)){clearInterval(t);burst(s)}else if(tries>30)clearInterval(t)},400)},true);
}
var ric=window.requestIdleCallback||function(f){setTimeout(f,120)};
ric(boot,{timeout:1000});
})();
