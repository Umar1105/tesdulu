// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// COUNTER ANIMATION
function animateCounter(id, target, prefix = '', suffix = '', duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    if (id === 'bounty') {
      el.textContent = '$$$$$';
    } else {
      el.textContent = prefix + Math.floor(start) + suffix;
    }
  }, 16);
}

// STAT BARS
function animateBars() {
  document.querySelectorAll('.stat-fill').forEach(fill => {
    const w = fill.getAttribute('data-w') + '%';
    fill.style.width = '0';
    setTimeout(() => { fill.style.width = w; }, 300);
  });
}

// INTERSECTION OBSERVER
let statsAnimated = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id === 'stats' && !statsAnimated) {
      statsAnimated = true;
      animateCounter('bugs', 15, '', '+');
      document.getElementById('bounty').textContent = '$$$$$';

      animateCounter('cve', 0);
      animateCounter('programs', 3, '', '+');

      animateBars();
    }
  });
}, { threshold: 0.2 });

const statsSection = document.getElementById('stats');
if (statsSection) observer.observe(statsSection);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// TERMINAL TYPING
document.querySelectorAll('.terminal-body p').forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s';
    line.style.opacity = '1';
  }, i * 120);
});