document.addEventListener("DOMContentLoaded", () => {

    /* ================= LOADER ================= */
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if(loader) loader.style.display = "none";
    }, 1500);


    /* ================= EXPERIENCIA MULTI ================= */
    window.toggleWork = function(card){
        card.classList.toggle("active");
    };


    /* ================= FORMACION ================= */
    window.toggleSchool = function(id){

        document.querySelectorAll(".school-content")
        .forEach(el => el.classList.remove("show"));

        const target = document.getElementById(id);
        if(target) target.classList.add("show");
    };


    /* ================= SCROLLSPY ================= */
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("#navbar a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(sec => {

            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;

            if(window.scrollY >= offset &&
               window.scrollY < offset + height){

                current = sec.id;
            }
        });

        navLinks.forEach(a => {
            a.classList.remove("active");

            if(a.getAttribute("href") === "#" + current){
                a.classList.add("active");
            }
        });

    });


    /* ================= CURSOR RF ================= */
    const cursor = document.querySelector(".rf-cursor");

    if(cursor){
        document.addEventListener("mousemove", e => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }


    /* ================= WHATSAPP CONTACT ================= */
    const contactForm = document.getElementById("contactForm");

    if(contactForm){

        contactForm.addEventListener("submit", e => {

            e.preventDefault();

            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let mensaje = document.getElementById("mensaje").value;

            let texto =
            `Nombre: ${nombre}%0A` +
            `Correo: ${correo}%0A` +
            `Mensaje: ${mensaje}`;

            window.open(`https://wa.me/527771060169?text=${texto}`);

        });
    }


    /* ================= NETWORK BACKGROUND ================= */
    const net = document.getElementById("networkCanvas");

    if(net){

        const ctx = net.getContext("2d");

        net.width = window.innerWidth;
        net.height = window.innerHeight;

        let nodes = [];

        for(let i=0;i<40;i++){
            nodes.push({
                x: Math.random()*net.width,
                y: Math.random()*net.height,
                vx:(Math.random()-0.5),
                vy:(Math.random()-0.5)
            });
        }


        /* ================= SATELITE ================= */
        const sat = document.getElementById("satelliteCanvas");
        const sctx = sat.getContext("2d");

        sat.width = window.innerWidth;
        sat.height = window.innerHeight;

        let angle = 0;

        function draw(){

            ctx.clearRect(0,0,net.width,net.height);
            sctx.clearRect(0,0,sat.width,sat.height);


            /* nodos */
            nodes.forEach(n => {

                n.x += n.vx;
                n.y += n.vy;

                ctx.beginPath();
                ctx.arc(n.x,n.y,2,0,Math.PI*2);
                ctx.fillStyle="cyan";
                ctx.fill();

            });


            /* satelite */
            let satX = sat.width/2 + Math.cos(angle)*300;
            let satY = sat.height/2 + Math.sin(angle)*150;

            sctx.beginPath();
            sctx.arc(satX,satY,6,0,Math.PI*2);
            sctx.fillStyle="white";
            sctx.fill();


            /* señal RF */
            nodes.forEach(n => {

                let dx = n.x - satX;
                let dy = n.y - satY;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < 220){

                    sctx.beginPath();
                    sctx.moveTo(satX,satY);
                    sctx.lineTo(n.x,n.y);
                    sctx.strokeStyle="rgba(0,255,255,0.2)";
                    sctx.stroke();

                }
            });

            angle += 0.002;

            requestAnimationFrame(draw);
        }

        draw();
    }

});
