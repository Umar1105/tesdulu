// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===== COUNTER ANIMATION =====
function animateCounter(id, target, prefix = '', suffix = '', duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;

  let start = 0;
  const step = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    
    let display = Math.floor(start);
    if (id === 'bounty') {
      display = '$' + display.toLocaleString();
    } else {
      display = prefix + display + suffix;
    }
    
    el.textContent = display;
  }, 16);
}

// ===== STAT BAR ANIMATION =====
function animateBars() {
  const fills = document.querySelectorAll('.stat-fill');
  fills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => { fill.style.width = width; }, 200);
  });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger counters when stats section is visible
      if (entry.target.id === 'stats') {
        animateCounter('bugs', 15, '', '+');
        animateCounter('bounty', 7500);
        animateCounter('cve', 3);
        animateCounter('companies', 12, '', '+');
        animateBars();
      }
    }
  });
}, { threshold: 0.2 });

// Observe all sections
document.querySelectorAll('section').forEach(s => observer.observe(s));

// ===== CARD HOVER GLOW =====
document.querySelectorAll('.research-card, .bounty-card, .stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TERMINAL TYPING EFFECT =====
const lines = document.querySelectorAll('.terminal-body p');
lines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s';
    line.style.opacity = '1';
  }, i * 150);
});
