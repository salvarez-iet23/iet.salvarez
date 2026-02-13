document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>loader.style.display="none",1500);

window.toggleExclusive=function(header){
let card=header.parentElement;

document.querySelectorAll(".accordion-card")
.forEach(c=>{
if(c!==card)c.classList.remove("active");
});

card.classList.toggle("active");
};

/* WhatsApp */
contactForm.addEventListener("submit",e=>{
e.preventDefault();

window.open(`https://wa.me/527771060169?text=Nombre:${nombre.value}%0ACorreo:${correo.value}%0AMensaje:${mensaje.value}`);
});

/* ScrollSpy */
let sections=document.querySelectorAll(".section");
let links=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{
let current="";

sections.forEach(sec=>{
if(window.scrollY>=sec.offsetTop-150)current=sec.id;
});

links.forEach(a=>{
a.classList.remove("active");
if(a.getAttribute("href")==="#"+current)a.classList.add("active");
});
});

/* Cursor WiFi */
document.addEventListener("mousemove",e=>{
document.querySelector(".wifi-cursor").style.left=e.clientX+"px";
document.querySelector(".wifi-cursor").style.top=e.clientY+"px";
});

/* Fondo nodos */
const net=networkCanvas.getContext("2d");
networkCanvas.width=window.innerWidth;
networkCanvas.height=window.innerHeight;

let nodes=[];
for(let i=0;i<35;i++){
nodes.push({x:Math.random()*networkCanvas.width,
y:Math.random()*networkCanvas.height});
}

function drawNodes(){
net.clearRect(0,0,networkCanvas.width,networkCanvas.height);

nodes.forEach(n=>{
net.beginPath();
net.arc(n.x,n.y,2,0,Math.PI*2);
net.fillStyle="cyan";
net.fill();
});

requestAnimationFrame(drawNodes);
}
drawNodes();

});
