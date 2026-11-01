(function(){
/* ====== SETTINGS ====== */
var FORM_KEY='PASTE_WEB3FORMS_ACCESS_KEY_HERE'; /* free key from web3forms.com (email notification) */
var WA='917206718075',DELAY=10000;             /* WhatsApp number, popup delay in ms */
var POLICY='Privacy Policy dated 1 November 2026';
/* ====================== */
var B=(document.currentScript&&document.currentScript.src||'').replace(/script\.js.*$/,'');
var PP=B+'privacy-policy/'+(location.protocol==='file:'?'index.html':'');
var $=function(i){return document.getElementById(i)};
var T0=Date.now(),lastT=0;
var PH=/^\+?[0-9][0-9\s\-]{7,17}$/,EM=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var LIM={n:80,p:100,m:1000,amn:80,amb:100,amp:20,ame:100,amm:1000};
function lim(){Object.keys(LIM).forEach(function(k){var e=$(k);if(e)e.maxLength=LIM[k]})}
function clean(v){return String(v||'').replace(/[\u0000-\u001f\u007f]/g,' ').trim()}
function ok(){return FORM_KEY.indexOf('PASTE')!==0&&FORM_KEY.length>10}
function st(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
function ss(k){try{sessionStorage.setItem(k,'1')}catch(e){}}
function throttled(){var n=Date.now();if(n-T0<2000||n-lastT<30000)return true;lastT=n;return false}
function lead(d,done){
 d={name:clean(d.name),business:clean(d.business),phone:clean(d.phone),email:clean(d.email),service:clean(d.service),message:clean(d.message)};
 var msg='Hi GH Company, I am '+d.name+(d.business?' from '+d.business:'')+'. Service: '+d.service+'. Contact: '+d.phone+(d.email?' / '+d.email:'')+'. '+d.message+' (I agree to the Privacy Policy.)';
 function wa(){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');done('wa')}
 if(!ok()){wa();return}
 var p={access_key:FORM_KEY,subject:'New lead from GH Company website: '+d.service,from_name:'GH Company Website',name:d.name,phone:d.phone,service:d.service,message:d.message||'-',consent:'YES - ticked consent box on '+new Date().toISOString()+' ('+POLICY+')'};
 if(d.business)p.business=d.business;if(d.email)p.email=d.email;
 fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(p)})
 .then(function(r){return r.json()}).then(function(j){j.success?done('sent'):wa()}).catch(wa)
}
var OKMSG={sent:'Thank you! We have received your request and will contact you soon.',wa:'WhatsApp has opened with your message. Please press send so that we receive it.'};
var burger=$('burger'),menu=$('menu');
if(burger&&menu){burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')})}
lim();
/* contact form */
var f=$('enquiry');
if(f&&f.tagName==='FORM'){var btn=f.querySelector('button[type=submit]'),msgp=document.createElement('p');msgp.className='small';msgp.setAttribute('role','status');f.appendChild(msgp);
f.addEventListener('submit',function(e){e.preventDefault();if($('ch')&&$('ch').checked)return;
var c=$('cc');if(!c||!c.checked){msgp.textContent='Please tick the consent box to continue.';if(c)c.focus();return}
var pv=clean($('p').value);if(!PH.test(pv)&&!EM.test(pv)){msgp.textContent='Please enter a valid phone number or email.';$('p').focus();return}
if(throttled()){msgp.textContent='Please wait a few seconds and try again.';return}
btn.disabled=true;lead({name:$('n').value,phone:pv,service:$('s').value,message:$('m').value},function(h){btn.disabled=false;f.reset();msgp.textContent=OKMSG[h]})})}
/* audit popup */
if(/\/contact(\/index\.html)?\/?$/.test(location.pathname)||document.querySelector('.nf'))return;
var I='<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#ffb224" stroke-width="2" aria-hidden="true">';
var H='<div class="am-ov" id="amov" hidden><div class="am" role="dialog" aria-modal="true" aria-labelledby="amt"><button class="am-x" id="amx" aria-label="Close">&times;</button>'+
'<div class="am-l"><div class="am-logo"><img src="'+B+'logo.png" alt="" width="54" height="54"><span>GH COMPANY<small>Digital Growth Partner</small></span></div>'+
'<span class="am-badge">FREE &amp; NO OBLIGATION</span><p class="am-h">Get <b>Free Audit</b> of Your Business</p>'+
'<p class="am-p">Discover how your website, SEO and digital presence can be improved &mdash; <b>completely free!</b></p>'+
'<div class="am-f3"><div>'+I+'<path d="M4 20V14M10 20V10M16 20V6M22 20V2"/></svg><br>Find Growth Opportunities</div><div>'+I+'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg><br>Get Expert Insights</div><div>'+I+'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M8 12l3 3 5-6"/></svg><br>Receive Actionable Recommendations</div></div>'+
'<svg class="am-lap" viewBox="0 0 400 200" aria-hidden="true"><path d="M110 20h180l22 140H88z" fill="#111" stroke="#ffb224" stroke-width="2"/><g fill="#ffb224"><rect x="150" y="105" width="20" height="35"/><rect x="180" y="90" width="20" height="50"/><rect x="210" y="70" width="20" height="70"/><rect x="240" y="50" width="20" height="90"/></g><path d="M140 100L190 70l25 15 50-45" fill="none" stroke="#ffb224" stroke-width="4"/><path d="M60 170h280l30 12H30z" fill="#1d1d20" stroke="#ffb224" stroke-opacity=".5"/><rect x="290" y="70" width="104" height="44" rx="10" fill="#111" stroke="#ffb224"/><text x="342" y="90" fill="#f2efe9" font-size="12" text-anchor="middle" font-family="sans-serif" font-weight="700">Grow Smarter</text><text x="342" y="106" fill="#f2efe9" font-size="12" text-anchor="middle" font-family="sans-serif">with GH Company</text></svg></div>'+
'<div class="am-r"><h2 id="amt">Book Your <b>Free Audit</b> Now</h2><p class="am-p">Fill in the form below and our team will get back to you within <b>24 hours</b>.</p>'+
'<form id="amf" class="am-form"><input id="amn" placeholder="Your Name *" aria-label="Your name" autocomplete="name" required><input id="amb" placeholder="Business Name" aria-label="Business name" autocomplete="organization"><input id="amp" type="tel" placeholder="Your Phone Number *" aria-label="Your phone number" autocomplete="tel" pattern="\\+?[0-9][0-9 \\-]{7,17}" title="Enter a valid phone number" required><input id="ame" type="email" placeholder="Your Email (Optional)" aria-label="Your email" autocomplete="email">'+
'<select id="ams" aria-label="Select service"><option value="Free Business Audit">Select Service</option><option>Digital Marketing</option><option>SEO Services</option><option>Social Media Management</option><option>Creative Content</option><option>Meta Ads Management</option><option>Website Development</option><option>Not sure yet</option></select>'+
'<textarea id="amm" rows="3" placeholder="Tell us about your business..." aria-label="About your business"></textarea><input type="checkbox" id="amc" tabindex="-1" autocomplete="off" class="am-hp" aria-hidden="true">'+
'<label class="cons"><input type="checkbox" id="amk" required><span>I agree that GH Company may collect and use my name, business name, phone, email (if given) and message only to contact me about this request. I have read the <a href="'+PP+'" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. I can withdraw my consent anytime by emailing ghcompanyofficial@gmail.com.</span></label>'+
'<button class="btn" type="submit" id="amg">Book Free Audit</button><p class="small am-sec" id="amst" role="status"></p></form>'+
'<div class="am-ok" id="amok" hidden role="status"><h3>Request received</h3><p id="amokp"></p><button class="btn ghost" type="button" id="amcl">Close</button></div></div></div></div>';
var w=document.createElement('div');w.innerHTML=H;document.body.appendChild(w.firstChild);lim();
var ov=$('amov'),last=null;
function show(){if(!ov.hidden)return;ov.hidden=false;document.body.classList.add('am-lock');last=document.activeElement;ss('ghAudit');setTimeout(function(){$('amn').focus()},50)}
function hide(){ov.hidden=true;document.body.classList.remove('am-lock');if(last&&last.focus)last.focus()}
$('amx').addEventListener('click',hide);$('amcl').addEventListener('click',hide);
ov.addEventListener('mousedown',function(e){if(e.target===ov)hide()});
document.addEventListener('keydown',function(e){if(ov.hidden)return;if(e.key==='Escape')hide();
if(e.key==='Tab'){var q=ov.querySelectorAll('button,input:not(.am-hp),select,textarea,a[href]'),a=[].filter.call(q,function(x){return x.offsetParent!==null});if(!a.length)return;var fi=a[0],la=a[a.length-1];
if(e.shiftKey&&document.activeElement===fi){e.preventDefault();la.focus()}else if(!e.shiftKey&&document.activeElement===la){e.preventDefault();fi.focus()}}});
$('amf').addEventListener('submit',function(e){e.preventDefault();if($('amc').checked)return;var s=$('amst');
if(!$('amk').checked){s.textContent='Please tick the consent box to continue.';return}
if(!PH.test(clean($('amp').value))){s.textContent='Please enter a valid phone number.';return}
if(throttled()){s.textContent='Please wait a few seconds and try again.';return}
s.textContent='';var g=$('amg');g.disabled=true;
lead({name:$('amn').value,business:$('amb').value,phone:$('amp').value,email:$('ame').value,service:$('ams').value,message:$('amm').value},function(h){g.disabled=false;$('amf').hidden=true;$('amokp').textContent=OKMSG[h];$('amok').hidden=false})});
if(!st('ghAudit'))setTimeout(show,DELAY);
})();
