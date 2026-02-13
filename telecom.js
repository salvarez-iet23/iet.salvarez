document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1500);

window.toggleExclusive=function(header){

let card=header.parentElement;

document.querySelectorAll(".accordion-card")
.forEach(c=>{
if(c!==card)c.classList.remove("active");
});

card.classList.toggle("active");
}

/* WhatsApp */
document.getElementById("contactForm").addEventListener("submit",e=>{
e.preventDefault();

let n=nombre.value;
let c=correo.value;
let m=mensaje.value;

window.open(`https://wa.me/527771060169?text=Nombre:${n}%0ACorreo:${c}%0AMensaje:${m}`);
});

/* ScrollSpy */
let sections=document.querySelectorAll(".section");
let links=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(sec=>{
let top=window.scrollY;
let offset=sec.offsetTop-150;

if(top>=offset)current=sec.id;
});

links.forEach(a=>{
a.classList.remove("active");
if(a.getAttribute("href")==="#"+current)a.classList.add("active");
});
});

/* Cursor WiFi */
let cursor=document.querySelector(".wifi-cursor");

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

});
