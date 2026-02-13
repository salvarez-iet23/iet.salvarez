/* LOADER */
window.onload = () => {
setTimeout(()=>{
document.getElementById("loader").style.display="none";
},2000);
};

/* MULTI EXPAND */
function toggleAccordion(card){
card.classList.toggle("active");
}

/* CURSOR RF */
const cursor = document.querySelector(".rf-cursor");

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* NETWORK BACKGROUND */

const net = document.getElementById("networkCanvas");
const ctx = net.getContext("2d");

net.width=window.innerWidth;
net.height=window.innerHeight;

let nodes=[];

for(let i=0;i<70;i++){
nodes.push({
x:Math.random()*net.width,
y:Math.random()*net.height,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
});
}

function drawNetwork(){

ctx.clearRect(0,0,net.width,net.height);

nodes.forEach(n=>{
n.x+=n.vx;
n.y+=n.vy;

if(n.x<0||n.x>net.width)n.vx*=-1;
if(n.y<0||n.y>net.height)n.vy*=-1;

ctx.beginPath();
ctx.arc(n.x,n.y,2,0,Math.PI*2);
ctx.fillStyle="#00c3ff";
ctx.fill();
});

for(let i=0;i<nodes.length;i++){
for(let j=i;j<nodes.length;j++){
let dx=nodes[i].x-nodes[j].x;
let dy=nodes[i].y-nodes[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){
ctx.beginPath();
ctx.moveTo(nodes[i].x,nodes[i].y);
ctx.lineTo(nodes[j].x,nodes[j].y);
ctx.strokeStyle="rgba(0,195,255,0.15)";
ctx.stroke();
}
}
}

requestAnimationFrame(drawNetwork);
}

drawNetwork();

/* SATELITE ANIMADO */

const sat = document.getElementById("satelliteCanvas");
const satCtx = sat.getContext("2d");

sat.width=window.innerWidth;
sat.height=window.innerHeight;

let angle=0;

function drawSatellite(){

satCtx.clearRect(0,0,sat.width,sat.height);

let x = sat.width/2 + Math.cos(angle)*300;
let y = sat.height/2 + Math.sin(angle)*200;

satCtx.fillStyle="white";
satCtx.fillRect(x,y,20,10);

/* señal */
satCtx.beginPath();
satCtx.arc(x+10,y+5,50,0,Math.PI*2);
satCtx.strokeStyle="rgba(0,195,255,0.2)";
satCtx.stroke();

angle+=0.005;

requestAnimationFrame(drawSatellite);
}

drawSatellite();

