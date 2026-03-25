document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') enableLightMode();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.documentElement.getAttribute('data-theme') === 'light') {
        disableLightMode();
      } else {
        enableLightMode();
      }
    });
  }

  function enableLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }

  function disableLightMode() {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  // RTL Toggle Logic
  const rtlToggle = document.getElementById('rtlToggle');
  const html = document.documentElement;

  // Initialize from LocalStorage
  if (localStorage.getItem('dir') === 'rtl') {
    enableRTL();
  } else {
    disableRTL();
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      if (html.getAttribute('dir') === 'rtl') {
        disableRTL();
      } else {
        enableRTL();
      }
    });
  }

  function enableRTL() {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    localStorage.setItem('dir', 'rtl');
    if (rtlToggle) rtlToggle.innerText = 'LTR';
    
    // Inject or update RTL CSS
    if (!document.getElementById('rtl-css')) {
      const link = document.createElement('link');
      link.id = 'rtl-css';
      link.rel = 'stylesheet';
      link.href = 'assets/css/rtl.css';
      document.head.appendChild(link);
    }
    
    updateOffcanvas(true);
  }

  function disableRTL() {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    localStorage.setItem('dir', 'ltr');
    if (rtlToggle) rtlToggle.innerText = 'RTL';
    
    // Remove RTL CSS
    const link = document.getElementById('rtl-css');
    if (link) link.remove();
    
    updateOffcanvas(false);
  }

  // Navbar Scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Offcanvas Positioning Fix for RTL
  function updateOffcanvas(isRTL) {
    const offcanvas = document.querySelector('.offcanvas');
    if (offcanvas) {
      if (isRTL) {
        offcanvas.classList.remove('offcanvas-end');
        offcanvas.classList.add('offcanvas-start');
      } else {
        offcanvas.classList.remove('offcanvas-start');
        offcanvas.classList.add('offcanvas-end');
      }
    }
  }

  // Dashboard Sidebar Toggle (for mobile)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('show');
      }
    });
  }
  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Hero Spy Radar System (Canvas Based Intelligence Signals) ---
  const heroV3 = document.querySelector('.hero-v3');
  const canvas = document.getElementById('hero-canvas');
  
  if (heroV3 && canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let radarAngle = 0;
    const maxParticles = 60;

    function resize() {
      width = canvas.width = heroV3.offsetWidth;
      height = canvas.height = heroV3.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Theme-Aware Colors Proxy
    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        accent: styles.getPropertyValue('--accent-color').trim(),
        radar: styles.getPropertyValue('--radar-color').trim(),
        ring: styles.getPropertyValue('--radar-ring').trim()
      };
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.life = 1.0;
        this.size = Math.random() * 2 + 1;
        this.glow = 0; 
        this.depth = Math.random() * 0.7 + 0.3;
      }

      update() {
        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;
        this.life -= 0.007;
        if (this.glow > 0) this.glow *= 0.95;
      }

      draw(colors) {
        const alpha = Math.min(this.life, 0.5) + (this.glow * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = alpha;
        
        if (this.glow > 0.1) {
          ctx.shadowBlur = 15 * this.glow;
          ctx.shadowColor = colors.accent;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    let lastSpawn = 0;
    heroV3.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSpawn > 50) {
        const rect = heroV3.getBoundingClientRect();
        particles.push(new Particle(e.clientX - rect.left, e.clientY - rect.top));
        if (particles.length > maxParticles) particles.shift();
        lastSpawn = now;
      }
    });

    function drawRadar(colors) {
      const cX = width * 0.6; // Slightly off-center for depth
      const cY = height * 0.45;
      const radius = Math.max(width, height) * 0.7;

      // Sonar Rings
      ctx.strokeStyle = colors.ring;
      ctx.lineWidth = 1;
      for(let i=1; i<=4; i++) {
        ctx.beginPath();
        ctx.arc(cX, cY, (radius * 0.2) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sweep
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(radarAngle);
      
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      grad.addColorStop(0, colors.radar);
      grad.addColorStop(1, 'transparent');
      
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.2, 0);
      ctx.fill();
      
      ctx.strokeStyle = colors.radar;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      
      ctx.restore();
      ctx.globalAlpha = 1.0;

      // Pulse detection logic
      const normRadarAngle = ((radarAngle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
      particles.forEach(p => {
        const pAngle = ((Math.atan2(p.y - cY, p.x - cX) % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
        const diff = Math.abs(pAngle - normRadarAngle);
        if (diff < 0.1 || diff > (Math.PI * 2 - 0.1)) p.glow = 1.2;
      });

      radarAngle += 0.006; // Rotation speed
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();
      
      drawRadar(colors);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(colors);
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Back to Top Smooth Scroll
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Advanced Intelligence Tracking System (Home 2 Hero) ---
  const heroH2 = document.querySelector('.hero-intelligence');
  const canvasH2 = document.querySelector('#hero-tracking-canvas');
  
  if (heroH2 && canvasH2) {
    const ctxH2 = canvasH2.getContext('2d');
    let h2W, h2H;
    let trackNodes = [];
    const maxNodes = 15;
    let mouseH2 = { x: -1000, y: -1000, active: false };

    const getH2Colors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return isLight ? {
        node: 'rgba(155, 123, 75, 0.4)',
        line: 'rgba(74, 85, 104, 0.08)',
        lock: 'rgba(155, 123, 75, 0.15)'
      } : {
        node: 'rgba(201, 169, 110, 0.4)',
        line: 'rgba(61, 249, 198, 0.08)',
        lock: 'rgba(201, 169, 110, 0.15)'
      };
    };

    class TrackNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * h2W;
        this.y = Math.random() * h2H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.depth = Math.random() * 0.6 + 0.4;
        this.size = Math.random() * 2 + 1.5;
        this.lockTimer = 0;
        this.lockMax = 120 + Math.random() * 200;
      }
      update() {
        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;
        if (this.x < 0 || this.x > h2W) this.vx *= -1;
        if (this.y < 0 || this.y > h2H) this.vy *= -1;

        if (this.lockTimer > 0) {
          this.lockTimer--;
        } else if (Math.random() < 0.001) {
          this.lockTimer = this.lockMax;
        }
      }
      draw(colors) {
        ctxH2.beginPath();
        ctxH2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxH2.fillStyle = colors.node;
        ctxH2.fill();

        if (this.lockTimer > 0) {
          const progress = 1 - (this.lockTimer / this.lockMax);
          ctxH2.beginPath();
          ctxH2.arc(this.x, this.y, this.size + (progress * 30), 0, Math.PI * 2);
          ctxH2.strokeStyle = colors.lock;
          ctxH2.lineWidth = 1;
          ctxH2.stroke();
        }
      }
    }

    function h2Resize() {
      h2W = canvasH2.width = heroH2.offsetWidth;
      h2H = canvasH2.height = heroH2.offsetHeight;
      if (trackNodes.length === 0) {
        for (let i = 0; i < maxNodes; i++) trackNodes.push(new TrackNode());
      }
    }

    window.addEventListener('resize', h2Resize);
    heroH2.addEventListener('mousemove', (e) => {
      const rect = heroH2.getBoundingClientRect();
      mouseH2.x = e.clientX - rect.left;
      mouseH2.y = e.clientY - rect.top;
      mouseH2.active = true;
    });
    heroH2.addEventListener('mouseleave', () => { mouseH2.active = false; });

    function h2Animate() {
      ctxH2.clearRect(0, 0, h2W, h2H);
      const colors = getH2Colors();

      // Connections first
      for (let i = 0; i < trackNodes.length; i++) {
        for (let j = i + 1; j < trackNodes.length; j++) {
          const dx = trackNodes[i].x - trackNodes[j].x;
          const dy = trackNodes[i].y - trackNodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 220) {
            ctxH2.beginPath();
            ctxH2.moveTo(trackNodes[i].x, trackNodes[i].y);
            ctxH2.lineTo(trackNodes[j].x, trackNodes[j].y);
            ctxH2.strokeStyle = colors.line;
            ctxH2.lineWidth = 1;
            ctxH2.globalAlpha = (1 - d / 220) * 0.4;
            ctxH2.stroke();
            ctxH2.globalAlpha = 1.0;
          }
        }

        if (mouseH2.active) {
          const mDx = trackNodes[i].x - mouseH2.x;
          const mDy = trackNodes[i].y - mouseH2.y;
          const mD = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mD < 180) {
            ctxH2.beginPath();
            ctxH2.moveTo(trackNodes[i].x, trackNodes[i].y);
            ctxH2.lineTo(mouseH2.x, mouseH2.y);
            ctxH2.strokeStyle = colors.line;
            ctxH2.globalAlpha = (1 - mD / 180) * 0.3;
            ctxH2.stroke();
            ctxH2.globalAlpha = 1.0;
          }
        }
      }

      trackNodes.forEach(node => {
        node.update();
        node.draw(colors);
      });

      requestAnimationFrame(h2Animate);
    }

    h2Resize();
    h2Animate();
  }
});

