// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.skill-category, .project-card, .number-card, .about-text, ' +
  '.contact-form-wrap, .contact-info, .contact-item, ' +
  '.lc-card, .lc-profile-card, .lc-topics, .lc-goal'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150)
      current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current)
      a.style.color = 'var(--accent)';
  });
});

// ===== CONTACT FORM =====
function sendMail() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending!');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.open(`mailto:anshumansinha1209@gmail.com?subject=${subject}&body=${body}`);
}

// ===== SMOOTH NAV SCROLL =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== LEETCODE STATS =====
const LC_USERNAME = 'Anshuman_Sinha_';

// Try multiple free APIs in order, since free APIs can go down
const LC_API_URLS = [
  `https://leetcode-stats.tashif.codes/${LC_USERNAME}`,
  `https://leetcode-stats-api.herokuapp.com/${LC_USERNAME}`,
  `https://alfa-leetcode-api.onrender.com/${LC_USERNAME}/solved`
];

function updateLeetCodeUI(data) {
  document.getElementById('lc-total').textContent = data.totalSolved ?? data.solvedProblem ?? 0;
  document.getElementById('lc-easy').textContent = data.easySolved ?? data.easySolved ?? 0;
  document.getElementById('lc-medium').textContent = data.mediumSolved ?? 0;
  document.getElementById('lc-hard').textContent = data.hardSolved ?? 0;

  if (data.ranking) {
    document.getElementById('lc-rank').textContent = 'Rank: ' + data.ranking.toLocaleString();
  } else {
    document.getElementById('lc-rank').textContent = 'Rank: view on profile';
  }

  const totalEasy = data.totalEasy || 1;
  const totalMedium = data.totalMedium || 1;
  const totalHard = data.totalHard || 1;

  const easyPct = ((data.easySolved || 0) / totalEasy) * 100;
  const medPct  = ((data.mediumSolved || 0) / totalMedium) * 100;
  const hardPct = ((data.hardSolved || 0) / totalHard) * 100;

  setTimeout(() => {
    document.getElementById('bar-easy').style.width   = Math.min(easyPct, 100) + '%';
    document.getElementById('bar-medium').style.width = Math.min(medPct, 100) + '%';
    document.getElementById('bar-hard').style.width   = Math.min(hardPct, 100) + '%';
  }, 500);
}

function showLeetCodeFallback() {
  // Free public APIs can go down — show a friendly fallback instead of "N/A"
  document.getElementById('lc-total').textContent = '—';
  document.getElementById('lc-easy').textContent = '—';
  document.getElementById('lc-medium').textContent = '—';
  document.getElementById('lc-hard').textContent = '—';
  document.getElementById('lc-rank').textContent = 'Live stats unavailable — view profile below';
}

async function fetchLeetCodeStats() {
  for (const url of LC_API_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue; // try next API
      const data = await res.json();

      // Different APIs use slightly different success flags/fields
      if (data.status === 'success' || data.totalSolved !== undefined || data.solvedProblem !== undefined) {
        updateLeetCodeUI(data);
        return; // success — stop trying other APIs
      }
    } catch (err) {
      // this API failed or is blocked — silently try the next one
      continue;
    }
  }
  // All APIs failed
  showLeetCodeFallback();
}

fetchLeetCodeStats();