const container = document.getElementById('course-cards');
const totalEl = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.chip[data-filter]');

const courses = [
  { code: 'WDD 231', title: 'Web Frontend Development I', subject: 'WDD', credits: 2, completed: false },
  { code: 'WDD 131', title: 'Dynamic Web Fundamentals', subject: 'WDD', credits: 2, completed: true },
  { code: 'CSE 210', title: 'Programming with Classes', subject: 'CSE', credits: 2, completed: true },
  { code: 'CSE 110', title: 'Introduction to Programming', subject: 'CSE', credits: 2, completed: true },
  { code: 'WDD 130', title: 'Web Fundamentals', subject: 'WDD', credits: 2, completed: true }
];

let currentFilter = 'all';

function renderCourses(list) {
  if (!container) return;
  container.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('article');
    card.className = `card${c.completed ? ' completed' : ''}`;
    const h3 = document.createElement('h3');
    h3.textContent = `${c.code}`;
    const p = document.createElement('p');
    p.textContent = c.title;
    const meta = document.createElement('p');
    meta.textContent = `${c.subject} • ${c.credits} credits`;
    if (c.completed) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'Completed';
      h3.appendChild(badge);
    }
    card.append(h3, p, meta);
    container.append(card);
  });
}

function updateCredits(list) {
  if (!totalEl) return;
  const total = list.reduce((sum, c) => sum + c.credits, 0);
  totalEl.textContent = String(total);
}

function applyFilter(subject) {
  currentFilter = subject;
  const filtered = subject === 'all' ? courses : courses.filter(c => c.subject === subject);
  renderCourses(filtered);
  updateCredits(filtered);
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyFilter(btn.dataset.filter || 'all');
  });
});

applyFilter('all');
