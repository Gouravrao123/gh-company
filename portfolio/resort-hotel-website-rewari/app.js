// ===== CONFIG: replace placeholders =====
var CFG={name:"Aranya Grand Resort",wa:GH.wa,phone:GH.tel,map:"https://www.google.com/maps/search/?api=1&query=hotel+resort+Rewari+Haryana",endpoint:""};
var ROOMS=[
{id:"deluxe",n:"Deluxe Room",d:"Comfortable room with a refined, calm interior. Replace with real size, bed type and view.",c:["#2c5440","#1f3d2e"]},
{id:"premium",n:"Premium Room",d:"Spacious upgrade with added seating. Replace with real details.",c:["#7a6a45","#2a2a1c"]},
{id:"suite",n:"Executive Suite",d:"Separate living area and bedroom. Replace with real details.",c:["#9b7e4a","#1f3d2e"]},
{id:"royal",n:"Royal Suite",d:"Flagship suite. Replace with real details.",c:["#5b3d2e","#1c1410"]}];
var AM=["Swimming pool","Restaurant","Banquet hall","Free Wi-Fi","Parking","Room service"];
var GC=["All","Hotel exterior","Rooms","Suites","Swimming pool","Restaurant","Banquet hall","Events"];
var $=function(s,e){return (e||document).querySelector(s)},$$=function(s,e){return [].slice.call((e||document).querySelectorAll(s))};
function price(){return "Price on request"}
function roomCard(r){return '<div class="card"><div class="ph" style="--c1:'+r.c[0]+';--c2:'+r.c[1]+'" role="img" aria-label="'+r.n+' at '+CFG.name+', Rewari">'+r.n+'</div><div class="b"><h3>'+r.n+'</h3><p>'+r.d+'</p><b style="color:var(--gold);font-size:.85rem">'+price()+'</b><br><br><a class="btn" href="#room-details" data-room="'+r.id+'">Details</a> <a class="btn" style="background:none;border:1px solid var(--gold);color:var(--ink)" href="#booking" data-room="'+r.id+'">Enquire</a></div></div>'}
$("#homeRooms").innerHTML=ROOMS.slice(0,3).map(roomCard).join("");
$("#allRooms").innerHTML=ROOMS.map(roomCard).join("");
$("#amen").innerHTML=AM.map(function(a){return '<div class="card"><div class="b"><span class="tag">Sample</span><h3>'+a+'</h3></div></div>'}).join("");
$("#catSel").innerHTML='<option value="">Any category</option>'+ROOMS.map(function(r){return '<option>'+r.n+'</option>'}).join("");
var cur=ROOMS[0];
function rd(){$("#rdChips").innerHTML=ROOMS.map(function(r){return '<button class="chip'+(r.id==cur.id?' on':'')+'" data-pick="'+r.id+'">'+r.n+'</button>'}).join("");
$("#rdBody").innerHTML='<div class="ph" style="--c1:'+cur.c[0]+';--c2:'+cur.c[1]+'" role="img" aria-label="'+cur.n+'">'+cur.n+'</div><div><h2>'+cur.n+'</h2><p class="lead">'+cur.d+'</p><p class="note">Size, bed type, occupancy and inclusions: add confirmed details. Rate: '+price()+'.</p><p style="margin-top:20px"><a class="btn" href="#booking" data-room="'+cur.id+'">Enquire About This Room</a></p></div>'}
rd();
document.addEventListener("click",function(e){
var p=e.target.closest("[data-pick]");if(p){cur=ROOMS.filter(function(r){return r.id==p.dataset.pick})[0];rd()}
var r=e.target.closest("[data-room]");if(r){cur=ROOMS.filter(function(x){return x.id==r.dataset.room})[0];rd();$("#catSel").value=cur.n}
var g=e.target.closest("[data-g]");if(g){gc=g.dataset.g;gal()}
if(e.target.id=="bg")$("#lk").classList.toggle("open");
if(e.target.closest("#lk a"))$("#lk").classList.remove("open")});
var gc="All";
function gal(){$("#gChips").innerHTML=GC.map(function(c){return '<button class="chip'+(c==gc?' on':'')+'" data-g="'+c+'">'+c+'</button>'}).join("");
var cs=GC.slice(1).filter(function(c){return gc=="All"||c==gc});var h="";
cs.forEach(function(c,i){for(var k=0;k<2;k++)h+='<div class="ph" style="--c1:hsl('+(150-i*12)+',28%,'+(26+k*8)+'%);--c2:#10231a" role="img" aria-label="'+c+' at '+CFG.name+', Rewari">'+c+'</div>'});$("#gGrid").innerHTML=h}
gal();
// dates
var t=new Date(),iso=t.getFullYear()+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getDate()).slice(-2);
$$(".dmin").forEach(function(i){i.min=iso});
// links
$$("[data-wa]").forEach(function(a){a.href="https://wa.me/"+CFG.wa;a.target="_blank";a.rel="noopener"});
$$("[data-call]").forEach(function(a){a.href="tel:"+CFG.phone;if(!a.textContent.trim()&&!a.classList.contains("btn"))a.textContent=CFG.phone});
$$("[data-map]").forEach(function(a){a.href=CFG.map});$("#mapLink").href=CFG.map;$("#mapLink").target="_blank";$("#mapLink").rel="noopener";
// forms
function bad(f,n,m){var el=f.elements[n];el.parentNode.querySelector(".err").textContent=m;return 1}
function clr(f){$$(".err",f).forEach(function(e){e.textContent=""})}
function phoneOk(v){return /^[6-9]\d{9}$/.test(v.replace(/[\s+\-]|^91/g,""))}
function send(msg,data,form){var v=form.elements;GH.send(form,"Resort "+(data.type==="room"?"room enquiry":"banquet enquiry"),{name:data.name,phone:data.phone,email:(v.em&&v.em.value)||""},msg)}
$("#bkForm").addEventListener("submit",function(e){e.preventDefault();var f=this,v=f.elements,x=0;clr(f);
if(!v.in.value)x=bad(f,"in","Select date");if(!v.out.value)x=bad(f,"out","Select date");
if(v.in.value&&v.out.value&&v.out.value<=v.in.value)x=bad(f,"out","Must be after check-in");
if(+v.a.value<1)x=bad(f,"a","At least 1");if(+v.r.value<1)x=bad(f,"r","At least 1");
if(v.nm.value.trim().length<2)x=bad(f,"nm","Enter your name");if(!phoneOk(v.ph.value))x=bad(f,"ph","Enter valid 10-digit mobile");
if(v.em.value&&!/^\S+@\S+\.\S+$/.test(v.em.value))x=bad(f,"em","Invalid email");if(x)return;
var m="Hello "+CFG.name+", I would like to enquire about a room.\nCheck-in: "+v.in.value+"\nCheck-out: "+v.out.value+"\nAdults: "+v.a.value+", Children: "+v.c.value+"\nRoom: "+(v.cat.value||"Any")+" x "+v.r.value+"\nName: "+v.nm.value+"\nMobile: "+v.ph.value+(v.em.value?"\nEmail: "+v.em.value:"")+(v.sp.value?"\nRequests: "+v.sp.value:"");
send(m,{type:"room",in:v.in.value,out:v.out.value,name:v.nm.value,phone:v.ph.value},f)});
$("#bqForm").addEventListener("submit",function(e){e.preventDefault();var f=this,v=f.elements,x=0;clr(f);
if(!v.t.value)x=bad(f,"t","Select type");if(!v.d.value)x=bad(f,"d","Select date");if(+v.n.value<1)x=bad(f,"n","Enter guests");
if(v.nm.value.trim().length<2)x=bad(f,"nm","Enter your name");if(!phoneOk(v.ph.value))x=bad(f,"ph","Enter valid 10-digit mobile");if(x)return;
var m="Hello "+CFG.name+", banquet enquiry.\nEvent: "+v.t.value+"\nDate: "+v.d.value+"\nGuests: "+v.n.value+"\nVenue: "+v.v.value+"\nName: "+v.nm.value+"\nPhone: "+v.ph.value+(v.x.value?"\nNotes: "+v.x.value:"");
send(m,{type:"banquet",event:v.t.value,date:v.d.value,name:v.nm.value,phone:v.ph.value},f)});
document.addEventListener("submit",function(e){var f=e.target;if(f.dataset.go){e.preventDefault();var h=$("#bkForm").elements,s=f.elements;h.in.value=s.in.value;h.out.value=s.out.value;h.a.value=s.g.value=="5+"?5:s.g.value;h.r.value=s.r.value=="4+"?4:s.r.value;location.hash="booking"}});
// router
var V=["home","about","rooms","room-details","dining","banquet","gallery","offers","contact","booking"],T={home:"Aranya Grand Resort, Rewari | Luxury Hotel, Rooms & Banquets in Haryana",rooms:"Rooms & Suites | Hotel in Rewari, Haryana",banquet:"Wedding & Banquet Venue in Rewari | Aranya Grand",dining:"Restaurant & Dining in Rewari | Aranya Grand",gallery:"Gallery | Aranya Grand Resort, Rewari",offers:"Offers & Packages | Aranya Grand Resort, Rewari",contact:"Contact & Location | Hotel in Rewari, Haryana",about:"About | Aranya Grand Resort, Rewari",booking:"Booking Enquiry | Aranya Grand Resort, Rewari","room-details":"Room Details | Aranya Grand Resort, Rewari"};
function route(){var h=location.hash.slice(1);if(V.indexOf(h)<0)h="home";
$$(".view").forEach(function(v){v.classList.toggle("on",v.id=="v-"+h)});
$$(".links a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")=="#"+h)});
document.title=T[h];window.scrollTo(0,0)}
window.addEventListener("hashchange",route);route();
