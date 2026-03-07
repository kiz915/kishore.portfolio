/* ============================================================
   KISHORE PORTFOLIO — js/script.js
   All interactivity: loader, typing, scroll, counters, dark mode
   ============================================================ */

'use strict';

/* ─── LOADER ─────────────────────────────────────────────── */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('out');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    // Trigger hero animations after loader
    document.querySelectorAll('.animate-in').forEach(el => {
      el.classList.add('loaded');
    });
    // Start counters
    startCounters();
  }, 2000);
});

/* ─── THEME TOGGLE ───────────────────────────────────────── */
const html       = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY   = 'kishore-theme';

// Load saved theme
const saved = localStorage.getItem(THEME_KEY);
if (saved) html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});

/* ─── HEADER SCROLL ──────────────────────────────────────── */
const header = document.getElementById('header');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  // Highlight active nav link
  highlightNavLink();
  // Back to top visibility
  bttBtn.classList.toggle('show', y > 400);
  lastY = y;
}, { passive: true });

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');

function highlightNavLink() {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ─── MOBILE MENU ────────────────────────────────────────── */
const burger       = document.getElementById('burger');
const mobileDrawer = document.getElementById('mobileDrawer');

burger.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.md-link, .md-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── TYPING ANIMATION ───────────────────────────────────── */
const typedEl  = document.getElementById('typedText');
const phrases  = [
  'Tech Enthusiast',
  'Business Developer',
  'Python Learner',
  'Cloud Explorer',
  'Web Builder',
  'Problem Solver',
  'AMV Creator'
];

let pIdx = 0, cIdx = 0, deleting = false;

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(type, 400); return; }
  }
  setTimeout(type, deleting ? 40 : 75);
}
// Start after loader
setTimeout(type, 2400);

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  // Add subtle stagger within sibling groups
  const siblings = el.parentElement?.querySelectorAll('.reveal');
  if (siblings) {
    const idx = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = (idx * 0.08) + 's';
  }
  revealObs.observe(el);
});

/* ─── SKILL BAR ANIMATION ────────────────────────────────── */
const skillBarObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill[data-w]').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.w + '%';
          bar.classList.add('animated');
        }, i * 100);
      });
      skillBarObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bento-card').forEach(c => skillBarObs.observe(c));

/* ─── ACHIEVEMENT BAR ANIMATION ─────────────────────────── */
const achBarObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.ach-fill[data-w]').forEach((bar, i) => {
        const w = bar.dataset.w;
        bar.style.width = w + '%';
        setTimeout(() => bar.classList.add('animated'), i * 150 + 200);
      });
      achBarObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.ach-card').forEach(c => achBarObs.observe(c));

/* ─── COUNTER ANIMATION ──────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1200;
  const step = 16;
  const increments = Math.ceil(duration / step);
  let current = 0;
  const inc = target / increments;
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = Math.round(current);
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '+');
      clearInterval(timer);
    }
  }, step);
}

function startCounters() {
  document.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
}

// Also observe hero stat cards for when page loads slow
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hcard-stat').forEach(c => counterObs.observe(c));

/* ─── BACK TO TOP ────────────────────────────────────────── */
const bttBtn = document.getElementById('bttBtn');
bttBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── CONTACT FORM ───────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const cformMsg    = document.getElementById('cformMsg');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const fname = document.getElementById('cf-fname').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();

  if (!fname || !email || !msg) {
    cformMsg.textContent = '⚠ Please fill in all required fields.';
    cformMsg.className = 'cform-msg err';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    cformMsg.textContent = '⚠ Please enter a valid email address.';
    cformMsg.className = 'cform-msg err';
    return;
  }

  // Simulate send (replace with Firebase / EmailJS for real)
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    cformMsg.textContent = '✓ Message received! Kishore will reply within 24 hours.';
    cformMsg.className = 'cform-msg ok';
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => { cformMsg.textContent = ''; cformMsg.className = 'cform-msg'; }, 6000);
  }, 1200);
});

/* ─── RESUME DOWNLOAD ────────────────────────────────────── */
document.getElementById('dlResume').addEventListener('click', e => {
  e.preventDefault();
  const txt = `KISHORE V — RESUME
═══════════════════════════════════════
NAME         : Kishore V
TITLE        : Aspiring Business Development & Tech Enthusiast
ROLL NO      : 25IT161
DEPARTMENT   : Information Technology
COLLEGE      : SKCET, Coimbatore
BATCH        : 2025–2028
EMAIL        : kishorevk40@gmail.com
PHONE        : +91 63743 72312
LOCATION     : Coimbatore, Tamil Nadu, India
GITHUB       : https://github.com/kiz915
LINKEDIN     : https://linkedin.com/in/kishore-v-a363433a9
INSTAGRAM    : https://instagram.com/kishore_amv

═══════════════════════════════════════
SKILLS
Programming    : Python (65%), C++ (45%)
Web Dev        : HTML/CSS (70%), JavaScript (50%), Firebase (35%)
Tools          : VS Code (75%), Git/GitHub (55%), Figma (30%), Linux (25%)
Cloud          : Cloud Concepts (50%), AWS (40%), Google Cloud (30%)
Creative       : AMV Creation (60%), Video Editing (55%)

═══════════════════════════════════════
CERTIFICATIONS
1. AWS Certified Cloud Practitioner Essentials — 100% (2025)
2. Introduction to Python, Coursera — 100% (2025)
   Credential ID: N31A]T84N2CW
3. Google Cloud Digital Leader — 60% In Progress (2025)

═══════════════════════════════════════
PROJECTS
1. Personal Portfolio Website
   Stack: HTML5, CSS3, JavaScript, Firebase
   Features: Dark/light mode, particle background, typing animation

2. Weather App
   Stack: JavaScript, OpenWeather API, CSS3
   Features: Real-time weather, dynamic backgrounds

═══════════════════════════════════════
Generated by portfolio.
`;
  const blob = new Blob([txt], { type: 'text/plain' });
  const a    = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: 'Kishore_V_Resume.txt'
  });
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ─── SMOOTH SCROLL for anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ─── TICKER DUPLICATE for seamless loop ────────────────── */
// The HTML already has doubled content for seamless animation

/* ─── SKILL BAR INITIAL WIDTH fix ───────────────────────── */
// Ensure bars start at 0 before animation
document.querySelectorAll('.sk-fill').forEach(bar => { bar.style.width = '0%'; });
document.querySelectorAll('.ach-fill').forEach(bar => { bar.style.width = '0%'; });
