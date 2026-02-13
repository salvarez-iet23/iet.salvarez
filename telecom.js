window.onload=()=>{
setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1500);
};

/* EXPERIENCIA MULTI */
function toggleWork(card){
card.classList.toggle("active");
}

/* FORMACION */
function toggleSchool(id){
document.querySelectorAll(".school-content")
.forEach(el=>el.classList.remove("show"));

document.getElementById(id).classList.add("show");
}

/* SCROLLSPY */
const sections=document.querySelectorAll(".section");
const navLinks=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{
let current="";

sections.forEach(sec=>{
const top=window.scrollY;
const offset=sec.offsetTop-150;
const height=sec.offsetHeight;

if(top>=offset && top<offset+height){
current=sec.getAttribute("id");
}
});

navLinks.forEach(a=>{
a.classList.remove("active");
if(a.getAttribute("href")==="#"+current){
a.classList.add("active");
}
});
});

/* CURSOR */
const cursor=document.querySelector(".rf-cursor");

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* CONTACT WHATS */
document.getElementById("contactForm").addEventListener("submit",e=>{
e.preventDefault();

let nombre=document.getElementById("nombre").value;
let correo=document.getElementById("correo").value;
let mensaje=document.getElementById("mensaje").value;

let texto=`Nombre: ${nombre}%0ACorreo: ${correo}%0AMensaje: ${mensaje}`;

window.open(`https://wa.me/527771060169?text=${texto}`);
});

/* NETWORK */
const net=document.getElementById("networkCanvas");
const ctx=net.getContext("2d");

net.width=window.innerWidth;
net.height=window.innerHeight;

let nodes=[];

for(let i=0;i<50;i++){
nodes.push({
x:Math.random()*net.width,
y:Math.random()*net.height,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
});
}

function draw(){
ctx.clearRect(0,0,net.width,net.height);

nodes.forEach(n=>{
n.x+=n.vx;
n.y+=n.vy;

ctx.beginPath();
ctx.arc(n.x,n.y,2,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();
});

requestAnimationFrame(draw);
}

draw();
