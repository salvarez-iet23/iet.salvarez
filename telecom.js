// telecom.js - Animaciones y funcionalidad

(function() {
  // LOADER
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.classList.add('hidden'); }, 1800);

  // ACORDEON (exclusivo)
  window.toggleAccordion = function(header) {
    const card = header.closest('.accordion-card');
    const body = card.querySelector('.accordion-body');
    const isActive = body.classList.contains('active');
    
    const container = card.closest('.accordion-container');
    if (container) {
      container.querySelectorAll('.accordion-body').forEach(b => {
        b.classList.remove('active');
      });
    }
    if (!isActive) {
      body.classList.add('active');
    }
  };

  // CURSOR PERSONALIZADO
  const cursor = document.getElementById('wifiCursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // ANIMACIONES DE FONDO
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  const satCanvas = document.getElementById('satelliteCanvas');
  const satCtx = satCanvas.getContext('2d');
  const specCanvas = document.getElementById('spectrumCanvas');
  const specCtx = specCanvas.getContext('2d');

  let width, height;
  function resizeCanvases() {
    width = window.innerWidth;
    height = window.innerHeight;
    [canvas, satCanvas, specCanvas].forEach(c => { 
      c.width = width; 
      c.height = height; 
    });
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  // Partículas (red de estrellas)
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.8 + 1
    });
  }

  function drawNetwork() {
    ctx.clearRect(0, 0, width, height);
    
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 170, 255, 0.7)';
      ctx.fill();
    }
    
    // Líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(90, 160, 255, ${0.15 * (1 - dist/150)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawNetwork);
  }
  drawNetwork();

  // Órbita de satélite
  let angle = 0;
  function drawSatellite() {
    satCtx.clearRect(0, 0, width, height);
    const centerX = width / 2, centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    satCtx.beginPath();
    satCtx.ellipse(centerX, centerY, radius, radius*0.4, 0, 0, Math.PI*2);
    satCtx.strokeStyle = 'rgba(40, 140, 255, 0.25)';
    satCtx.lineWidth = 2;
    satCtx.stroke();

    const satX = centerX + radius * Math.cos(angle);
    const satY = centerY + radius * 0.4 * Math.sin(angle);
    
    satCtx.fillStyle = '#2f6eb0';
    satCtx.shadowColor = '#4a90e2';
    satCtx.shadowBlur = 15;
    satCtx.beginPath();
    satCtx.arc(satX, satY, 6, 0, 2*Math.PI);
    satCtx.fill();
    satCtx.shadowBlur = 0;
    
    angle += 0.005;
    requestAnimationFrame(drawSatellite);
  }
  drawSatellite();

  // Onda de espectro
  let phase = 0;
  function drawSpectrum() {
    specCtx.clearRect(0, 0, width, height);
    specCtx.beginPath();
    specCtx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
    specCtx.lineWidth = 2;
    
    for (let x = 0; x < width; x+=8) {
      const y = height/2 + Math.sin(x * 0.02 + phase) * 25 + Math.cos(x * 0.01 + phase*2) * 8;
      if (x === 0) specCtx.moveTo(x, y);
      else specCtx.lineTo(x, y);
    }
    specCtx.stroke();
    phase += 0.03;
    requestAnimationFrame(drawSpectrum);
  }
  drawSpectrum();

  // Mover partículas
  function moveParticles() {
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
    requestAnimationFrame(moveParticles);
  }
  moveParticles();

  // FORMULARIO (simulación de envío)
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensaje enviado (modo demostración)');
    this.reset();
  });
})();
