const CONFIG={phone:GH.wa,name:"Your PG Name"};
const DEMO=[
{id:"s-ac",name:"Single Room (AC)",ac:true,occ:"Single",rent:12000,deposit:12000,status:"Available",am:["AC","Attached bath","Study desk","Wardrobe"]},
{id:"s-nac",name:"Single Room",ac:false,occ:"Single",rent:8500,deposit:8500,status:"Limited",am:["Cooler","Attached bath","Study desk"]},
{id:"d-ac",name:"Double Sharing (AC)",ac:true,occ:"Double",rent:8000,deposit:8000,status:"Available",am:["AC","Shared bath","Study desks"]},
{id:"d-nac",name:"Double Sharing",ac:false,occ:"Double",rent:5500,deposit:5500,status:"Available",am:["Cooler","Shared bath","Study desks"]},
{id:"t-nac",name:"Triple Sharing",ac:false,occ:"Triple",rent:4200,deposit:4200,status:"Full",am:["Cooler","Shared bath","Lockers"]}];
let rooms=loadRooms(),flt="All",sel=[];
function loadRooms(){try{const s=localStorage.getItem("pgRooms");if(s)return JSON.parse(s)}catch(e){}return DEMO.map(r=>({...r}))}
function saveRoom(){try{localStorage.setItem("pgRooms",JSON.stringify(rooms))}catch(e){}}
const $=s=>document.querySelector(s),inr=n=>"₹"+Number(n).toLocaleString("en-IN");
const wa=t=>`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(t)}`;
$("#wa").href=wa("Hi, I’m interested in a room at "+CONFIG.name+", Rewari.");
$("#call").href="tel:+"+CONFIG.phone;
function renderFilters(){const o=["All","Single","Double","Triple","AC","Non-AC"];
$("#filters").innerHTML=o.map(x=>`<button class="${x===flt?"on":""}" data-flt="${x}">${x}</button>`).join("")}
function render(){renderFilters();
const l=rooms.filter(r=>flt==="All"||r.occ===flt||(flt==="AC"&&r.ac)||(flt==="Non-AC"&&!r.ac));
$("#roomGrid").innerHTML=l.map(r=>`<div class="card"><div class="ph" role="img" aria-label="${r.name} photo placeholder">Photo: ${r.name}</div>
<h3>${r.name}</h3><div>${r.am.map(a=>`<span class="tag">${a}</span>`).join("")}</div>
<div class="price">${inr(r.rent)}<small style="font-size:13px;font-weight:400">/month</small></div>
<div style="font-size:14px;color:var(--mute)">Deposit ${inr(r.deposit)} · ${r.occ} occupancy</div>
<div class="st ${r.status}">● ${r.status}</div><br>
<a class="btn sm" href="#contact" data-room="${r.ac?(r.occ==="Single"?"Single Room":"AC Room"):r.occ+(r.occ==="Single"?" Room":" Sharing")}">Enquire Now</a>
<label style="display:inline-flex;grid-auto-flow:column;align-items:center;margin-left:8px;font-weight:400"><input type="checkbox" style="width:auto" ${sel.includes(r.id)?"checked":""} data-tog="${r.id}"> Compare</label></div>`).join("");
cmp();adm()}
function tog(id,el){if(el.checked){if(sel.length>=3){el.checked=false;return}sel.push(id)}else sel=sel.filter(x=>x!==id);cmp()}
function cmp(){const c=rooms.filter(r=>sel.includes(r.id));
$("#cmp").innerHTML=c.length<2?(c.length?"<p class='note'>Select one more room to compare.</p>":""):`<h3>Compare Rooms</h3><table><tr><th></th>${c.map(r=>`<th>${r.name}</th>`).join("")}</tr>
${[["Rent",r=>inr(r.rent)],["Deposit",r=>inr(r.deposit)],["Occupancy",r=>r.occ],["AC",r=>r.ac?"Yes":"No"],["Amenities",r=>r.am.join(", ")],["Status",r=>r.status]].map(([k,f])=>`<tr><td><b>${k}</b></td>${c.map(r=>`<td>${f(r)}</td>`).join("")}</tr>`).join("")}</table>`}
function adm(){$("#adm").innerHTML=`<tr><th>Room</th><th>Rent</th><th>Deposit</th><th>Status</th></tr>`+rooms.map((r,i)=>`<tr><td>${r.name}</td>
<td><input type="number" value="${r.rent}" style="width:100px" data-adm="rent" data-i="${i}"></td>
<td><input type="number" value="${r.deposit}" style="width:100px" data-adm="deposit" data-i="${i}"></td>
<td><select data-adm="status" data-i="${i}">${["Available","Limited","Full"].map(s=>`<option ${s===r.status?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("")}
const F=[["📶","High-speed Wi-Fi"],["🧹","Daily housekeeping"],["🧺","Laundry"],["🍽️","Optional meals"],["🔒","CCTV & secure entry"],["⚡","Power backup"],["💧","RO drinking water"],["📚","Study area"]];
$("#fac").innerHTML=F.map(([i,t])=>`<div class="card"><div style="font-size:28px">${i}</div><b>${t}</b></div>`).join("");
const P=[["Basic","Triple / Double Non-AC","₹4,200+",["Electricity: as per meter/shared","Food: optional","Wi-Fi ✔","Housekeeping ✔","Laundry: paid"]],
["Comfort","Double Sharing AC","₹8,000+",["Electricity: AC charges extra","Food: optional","Wi-Fi ✔","Housekeeping ✔","Laundry: weekly"]],
["Premium","Single AC","₹12,000+",["Electricity: policy applies","Food: available","Wi-Fi ✔","Housekeeping ✔","Laundry ✔"]]];
$("#plans").innerHTML=P.map(p=>`<div class="card"><h3>${p[0]}</h3><div style="color:var(--mute)">${p[1]}</div><div class="price">${p[2]}<small style="font-size:13px;font-weight:400">/mo (demo)</small></div><ul>${p[3].map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn sm" href="#contact">Enquire</a></div>`).join("");
$("#gal").innerHTML=["Rooms","Common area","Dining","Study space","Exterior","Washrooms"].map(t=>`<div class="ph" role="img" aria-label="${t} of PG in Rewari (placeholder)" style="height:150px">${t}</div>`).join("");
$("#f").addEventListener("submit",e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
const er=f.querySelectorAll(".err");er.forEach(x=>x.textContent="");
if(d.name.trim().length<2){er[0].textContent="Enter your full name";ok=false}
if(!/^[6-9]\d{9}$/.test(d.mobile)){er[1].textContent="Enter a valid 10-digit mobile number";ok=false}
if(!ok)return;
const t=`${d.visit?"*Property visit request*":"*Room enquiry*"} – ${CONFIG.name}, Rewari\nName: ${d.name}\nMobile: ${d.mobile}\nI am a: ${d.who}\nRoom: ${d.room}\nBudget: ${d.budget?inr(d.budget):"Not specified"}\nMove-in: ${d.date||"Flexible"}\nFood: ${d.food}${d.visit?"\nVisit date: "+d.visit:""}\nNotes: ${d.msg||"-"}`;
GH.send(f,"PG & hostel enquiry",{name:d.name,phone:d.mobile},t.replace(/\*/g,""))});
render();

document.getElementById('printbtn')&&document.getElementById('printbtn').addEventListener('click',function(){window.print()});

document.addEventListener("click",e=>{const b=e.target.closest("[data-flt]");if(b){flt=b.dataset.flt;render();return}const a=e.target.closest("[data-room]");if(a)document.querySelector("[name=room]").value=a.dataset.room});
document.addEventListener("change",e=>{const t=e.target;if(t.dataset.tog){tog(t.dataset.tog,t);return}if(t.dataset.adm){rooms[+t.dataset.i][t.dataset.adm]=t.dataset.adm==="status"?t.value:+t.value;saveRoom();render()}});
