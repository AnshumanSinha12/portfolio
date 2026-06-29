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
async function fetchLeetCodeStats() {
  try {
    const res = await fetch(
      'https://leetcode-stats-api.herokuapp.com/Anshuman_Sinha_'
    );
    const data = await res.json();
    if (data.status === 'success') {
      document.getElementById('lc-total').textContent = data.totalSolved;
      document.getElementById('lc-easy').textContent = data.easySolved;
      document.getElementById('lc-medium').textContent = data.mediumSolved;
      document.getElementById('lc-hard').textContent = data.hardSolved;
      document.getElementById('lc-rank').textContent =
        'Rank: ' + data.ranking.toLocaleString();

      const easyPct  = (data.easySolved / data.totalEasy) * 100;
      const medPct   = (data.mediumSolved / data.totalMedium) * 100;
      const hardPct  = (data.hardSolved / data.totalHard) * 100;

      setTimeout(() => {
        document.getElementById('bar-easy').style.width   = easyPct + '%';
        document.getElementById('bar-medium').style.width = medPct  + '%';
        document.getElementById('bar-hard').style.width   = hardPct + '%';
      }, 500);
    }
  } catch (err) {
    document.getElementById('lc-total').textContent = 'N/A';
    document.getElementById('lc-rank').textContent  = 'Visit profile for stats';
  }
}

fetchLeetCodeStats();
