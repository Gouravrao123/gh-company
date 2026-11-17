const WA=GH.wa; // Replace with venue WhatsApp number (country code, no +)
const ENDPOINT=""; // Lead backend: set a URL (e.g. /api/leads or a Google Sheet/CRM webhook) to save enquiries
const $=s=>document.querySelector(s);
$("#wa").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hello, I’d like to enquire about wedding dates at your venue in Rewari.");
$("#menu").onclick=e=>{const o=$("#nav").classList.toggle("open");e.target.setAttribute("aria-expanded",o)};
$("#nav").onclick=()=>$("#nav").classList.remove("open");
document.querySelectorAll("[data-type]").forEach(a=>a.addEventListener("click",()=>{$("#type").value=a.dataset.type;if(a.dataset.venue)$("#venue").value=a.dataset.venue;if(a.dataset.pack)$("#notes").value="Package enquiry: "+a.dataset.pack}));
$("#brochure").onclick=e=>{e.preventDefault();alert("Brochure PDF will be linked here once the owner supplies it.")};
// gallery
const cats=["Wedding Decorations","Wedding Stage","Outdoor Lawn","Indoor Banquet","Reception","Engagement","Night Events","Dining & Catering"];
const hues=[["#B8914A","#4a1420"],["#6B1F2E","#1f0d12"],["#6e7a4a","#2b2a1a"],["#8b4a5c","#2a1520"],["#9a6a3a","#2b1a12"],["#c98f94","#4a2230"],["#2c2a4a","#0f0d1c"],["#a8743a","#3a1d10"]];
const items=[];cats.forEach((c,i)=>[1,2].forEach(n=>items.push({c,n,h:hues[i]})));
let cur="All",view=[],idx=0;
const fb=$("#filters");["All",...cats].forEach(c=>{const b=document.createElement("button");b.textContent=c;b.setAttribute("aria-pressed",c==="All");b.onclick=()=>{cur=c;[...fb.children].forEach(x=>x.setAttribute("aria-pressed",x===b));draw()};fb.append(b)});
function tile(it){return `style="--c1:${it.h[0]};--c2:${it.h[1]}"`}
function draw(){view=items.filter(i=>cur==="All"||i.c===cur);$("#grid").innerHTML=view.map((it,k)=>`<button data-k="${k}" aria-label="View ${it.c} photo ${it.n}"><div class="ph" role="img" aria-label="${it.c} at wedding venue Rewari" ${tile(it)}>${it.c}<small>PHOTO PLACEHOLDER</small></div></button>`).join("")}
$("#grid").onclick=e=>{const b=e.target.closest("button");if(b){idx=+b.dataset.k;show();$("#lb").showModal()}};
function show(){const it=view[idx];const el=$("#lbimg");el.style.setProperty("--c1",it.h[0]);el.style.setProperty("--c2",it.h[1]);el.textContent=it.c+" · "+(idx+1)+"/"+view.length;el.setAttribute("role","img");el.setAttribute("aria-label",it.c+" photo")}
$("#prev").onclick=()=>{idx=(idx-1+view.length)%view.length;show()};$("#next").onclick=()=>{idx=(idx+1)%view.length;show()};
$("#cls").onclick=()=>$("#lb").close();
$("#fs").onclick=()=>{const d=$("#lb");document.fullscreenElement?document.exitFullscreen():d.requestFullscreen&&d.requestFullscreen()};
$("#lb").addEventListener("keydown",e=>{if(e.key==="ArrowRight")$("#next").click();if(e.key==="ArrowLeft")$("#prev").click()});
draw();
// packages (sample data, clearly marked)
const packs=[["Royal Lawn Wedding","Outdoor Lawn","[Sample: 000] guests","Lawn, stage, bridal room, parking","Veg buffet, live counters","Floral mandap, lighting"],
["Grand Banquet Reception","Indoor Banquet","[Sample: 000] guests","AC hall, stage, dance floor, sound","Multi-cuisine veg menu","Chandelier & stage styling"],
["Maharaja Complete","Lawn + Banquet","[Sample: 000] guests","Both venues, guest rooms, valet","Custom menus, tasting session","Full theme design, entry setup"]];
$("#pk").innerHTML=packs.map((p,i)=>`<div class="card${i==2?" feat":""}"><span class="tag">${i==2?"Most complete":"Sample package"}</span><h3>${p[0]}</h3><dl><dt>Venue type</dt><dd>${p[1]}</dd><dt>Guest capacity</dt><dd>${p[2]}</dd><dt>Facilities</dt><dd>${p[3]}</dd><dt>Catering options</dt><dd>${p[4]}</dd><dt>Decoration options</dt><dd>${p[5]}</dd></dl><a class="btn" href="#contact" data-type="Wedding" data-pack="${p[0]}">Enquire for pricing</a></div>`).join("");
document.querySelectorAll("#pk [data-type]").forEach(a=>a.addEventListener("click",()=>{$("#type").value="Wedding";$("#notes").value="Package enquiry: "+a.dataset.pack}));
// forms
const send=async d=>{if(!ENDPOINT)return;try{await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})}catch(e){console.warn("Lead save failed",e)}};
const phoneOK=v=>/^[6-9]\d{9}$/.test(v.replace(/\D/g,"").slice(-10));
$("#cbb").onclick=()=>{const v=$("#cbp").value;if(!phoneOK(v)){$("#cberr").textContent="Enter a valid 10-digit Indian mobile number.";return}if(GH.throttled()){$("#cberr").textContent="Please wait a few seconds and try again.";return}GH.deliver("Wedding venue callback request",{name:"Callback request",phone:v},"Callback request from the wedding venue sample. Mobile: "+v,$("#cberr"),()=>{$("#cbp").value=""})};
$("#f").addEventListener("submit",e=>{e.preventDefault();const g=id=>$("#"+id).value.trim();const er={};
if(g("name").length<2)er.name="Please enter your name.";if(!phoneOK(g("mobile")))er.mobile="Enter a valid 10-digit mobile number.";
if(g("email")&&!/^\S+@\S+\.\S+$/.test(g("email")))er.email="Enter a valid email address.";
if(!g("date"))er.date="Choose your preferred date.";else if(new Date(g("date"))<new Date(new Date().toDateString()))er.date="Choose a future date.";
if(!(+g("guests")>=10))er.guests="Enter at least 10 guests.";
document.querySelectorAll("[data-e]").forEach(x=>x.textContent=er[x.dataset.e]||"");
const first=Object.keys(er)[0];if(first){$("#"+first).focus();return}
const d={};["name","mobile","email","type","date","alt","guests","venue","budget","notes"].forEach(k=>d[k]=g(k));
const msg=`Hello, I’d like to enquire about a ${d.type} at your Rewari venue.\nName: ${d.name}\nMobile: ${d.mobile}\nDate: ${d.date}${d.alt?" (alt: "+d.alt+")":""}\nGuests: ${d.guests}\nVenue: ${d.venue}\nBudget: ${d.budget}${d.email?"\nEmail: "+d.email:""}${d.notes?"\nNotes: "+d.notes:""}`;
GH.send($("#f"),"Wedding venue enquiry",{name:d.name,phone:d.mobile,email:d.email},msg)});
