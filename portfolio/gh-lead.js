/* GH Company shared helpers for the sample sites in /portfolio/
   - GH Company contact details
   - Same enquiry system as the main GH Company site: consent tick, honeypot, throttle,
     email notification through Web3Forms, WhatsApp fallback
   - "Back to Our Work" bar on every sample */
(function(){
var C=window.GH={
 key:'b9e02b30-b9eb-4c39-accb-f196cd7f5a85',   /* same Web3Forms key as /script.js */
 phone:'7206718075',tel:'+917206718075',telShow:'+91 72067 18075',wa:'917206718075',
 email:'ghcompanyofficial@gmail.com',
 insta:'https://www.instagram.com/ghcompany.official/',
 city:'Rewari, Haryana, India',
 privacy:'../../privacy-policy/index.html',
 back:'../index.html'
};
var T0=Date.now(),lastT=0;
var OK={sent:'Thank you! We have received your request and will contact you soon.',wa:'WhatsApp has opened with your message. Please press send so that we receive it.'};
C.throttled=function(){return throttled()};
C.clean=function(v){return String(v==null?'':v).replace(/[\u0000-\u001f\u007f]/g,' ').trim()};
C.waLink=function(t){return 'https://wa.me/'+C.wa+(t?'?text='+encodeURIComponent(t):'')};
function throttled(){var n=Date.now();if(n-T0<2000||n-lastT<30000)return true;lastT=n;return false}

/* styles for the injected pieces */
var css=document.createElement('style');
css.textContent='.gh-cons{grid-column:1/-1;display:block;margin:6px 0 0;font:400 13px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;color:inherit;text-align:left}'
+'.gh-cons label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;opacity:.9}'
+'.gh-cons input[type=checkbox].gh-cc{width:20px;height:20px;min-width:20px;padding:0;margin:2px 0 0;flex:none;accent-color:#ffb51b}'
+'.gh-cons a{color:inherit;text-decoration:underline}'
+'.gh-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0}'
+'.gh-st{margin:8px 0 0;font-weight:600;min-height:1.2em}'
+'.gh-bar{display:flex;gap:10px 18px;flex-wrap:wrap;align-items:center;justify-content:space-between;background:#1c1d22;color:#f5f5f5;font:600 13px/1.3 system-ui,-apple-system,Segoe UI,sans-serif;padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top,0px));position:relative;z-index:9998}'
+'.gh-bar a{color:#ffb51b;text-decoration:none}.gh-bar a:hover{text-decoration:underline}'
+'.gh-bar .gh-b1{background:#ffb51b;color:#1b1300;border-radius:99px;padding:9px 16px;font-weight:800}.gh-bar .gh-b1:hover{text-decoration:none;filter:brightness(1.08)}'
+'.gh-bar span{opacity:.8}'
+'.gh-fab{position:fixed;left:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:9999;background:#1c1d22;color:#ffb51b;font:800 13px/1 system-ui,sans-serif;padding:12px 16px;border-radius:99px;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.4);display:none}'
+'.gh-fab.on{display:block}'
+'@media print{.gh-bar,.gh-fab{display:none!important}}';
document.head.appendChild(css);

function bar(){
 if(window.GH_NOBAR)return;
 var b=document.createElement('div');b.className='gh-bar';
 b.innerHTML='<a class="gh-b1" href="'+C.back+'">&larr; Back to Our Work</a><span>Sample website by GH Company</span><a href="../../contact/index.html">Get a website like this &rarr;</a>';
 document.body.insertBefore(b,document.body.firstChild);
 var f=document.createElement('a');f.className='gh-fab';f.href=C.back;f.innerHTML='&larr; Back to Our Work';document.body.appendChild(f);
 var on=function(){f.classList.toggle('on',(window.pageYOffset||document.documentElement.scrollTop)>500)};
 window.addEventListener('scroll',on,{passive:true});on();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bar);else bar();

/* consent tick + honeypot + status line, placed before the submit button */
C.prep=function(form){
 if(!form||form.querySelector('.gh-cons'))return;
 var d=document.createElement('div');d.className='gh-cons';
 d.innerHTML='<label><input type="checkbox" class="gh-cc"><span>I agree that GH Company may collect and use my name, phone, email (if given) and message only to contact me about this enquiry. See the <a href="'+C.privacy+'" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. I can withdraw my consent anytime by emailing '+C.email+'.</span></label>'
 +'<input type="checkbox" class="gh-hp" tabindex="-1" autocomplete="off" aria-hidden="true"><p class="gh-st" role="status"></p>';
 var btn=form.querySelector('button[type=submit]');
 var host=btn?(btn.closest('.full')||btn.parentNode):null;
 if(host&&host.parentNode===form)form.insertBefore(d,host);else form.appendChild(d);
};
C.guard=function(form){
 C.prep(form);
 var st=form.querySelector('.gh-st'),hp=form.querySelector('.gh-hp'),cc=form.querySelector('.gh-cc');
 if(hp&&hp.checked)return false;
 if(!cc.checked){st.textContent='Please tick the consent box to continue.';cc.focus();return false}
 if(throttled()){st.textContent='Please wait a few seconds and try again.';return false}
 st.textContent='';return true;
};
/* send lead: Web3Forms email first, WhatsApp as fallback (same as main site) */
C.deliver=function(label,data,msg,st,done){
 function fin(h){if(st)st.textContent=OK[h];if(done)done(h)}
 function wa(){window.open(C.waLink(msg),'_blank','noopener');fin('wa')}
 var p={access_key:C.key,subject:'New lead from GH Company Our Work sample: '+label,from_name:'GH Company Website',
  name:C.clean(data.name),phone:C.clean(data.phone),service:label,message:C.clean(msg).replace(/\s*\n\s*/g,' | ')||'-',
  consent:'YES - ticked the consent box (Privacy Policy) on a sample page'};
 if(data.email)p.email=C.clean(data.email);
 if(!C.key||C.key.length<10){wa();return}
 fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(p)})
  .then(function(r){return r.json()}).then(function(j){j.success?fin('sent'):wa()}).catch(wa);
};
C.send=function(form,label,data,msg,done){
 if(!C.guard(form))return;
 var btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
 C.deliver(label,data,msg,form.querySelector('.gh-st'),function(h){if(btn)btn.disabled=false;form.reset();if(done)done(h)});
};
/* show the consent tick on every enquiry form as soon as the page loads */
function prepAll(){['f','bkForm','bqForm'].forEach(function(i){var x=document.getElementById(i);if(x&&x.tagName==='FORM')C.prep(x)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',prepAll);else prepAll();
})();
