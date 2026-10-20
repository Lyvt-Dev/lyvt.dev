import { projects, skillGroups } from './data.js';

const arrow = '<svg class="icon"><use href="#i-arrow"/></svg>';
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function artwork(project) {
  if (project.image) return `<div class="project-visual thinkcad-visual"><div class="app-window"><div class="app-window-bar"><span><i></i><i></i><i></i></span><span>ThinkCad / workspace</span><svg class="icon small"><use href="#i-chip"/></svg></div><img src="${escapeHtml(new URL(project.image, document.baseURI).href)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" width="1200" height="750"></div><span class="visual-caption">AN IDEA. A CIRCUIT. A POSSIBILITY.</span></div>`;
  if (project.artwork === 'item') return '<div class="project-visual plugin-visual item-visual" aria-hidden="true"><div class="item-orbit orbit-one"></div><div class="item-orbit orbit-two"></div><div class="voxel-cube"><span class="cube-front"></span><span class="cube-top"></span><span class="cube-side"></span></div><span class="visual-caption">SMALL DETAILS. BETTER WORLDS.</span><span class="art-corner">&lt; / &gt;</span></div>';
  return '<div class="project-visual plugin-visual clan-visual" aria-hidden="true"><div class="clan-ring"></div><div class="clan-emblem"><svg viewBox="0 0 120 130"><path class="shield" d="M60 8 105 26v37c0 27-22 47-45 59C37 110 15 90 15 63V26L60 8Z"/><path class="shield-detail" d="m39 62 15 15 29-32"/></svg></div><span class="visual-caption">YOUR PEOPLE. YOUR IDENTITY.</span><span class="art-corner">&lt; / &gt;</span></div>';
}

export function renderProjects() {
  const grid = document.querySelector('#project-grid');
  grid.innerHTML = projects.map(project => `<article class="project-card reveal ${project.featured ? 'featured-project' : ''}" data-category="${escapeHtml(project.category)}">${artwork(project)}<div class="project-body"><div class="project-meta"><span class="tiny-label">${escapeHtml(project.categoryLabel)}</span><span class="project-number">${project.number}</span></div><h3><a href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}${arrow}</a></h3><p>${escapeHtml(project.description)}</p><div class="project-tags">${project.technologies.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><a class="project-source" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer"><svg class="icon small"><use href="#i-github"/></svg>View on GitHub${arrow}<span class="sr-only">: ${escapeHtml(project.name)}</span></a></div></article>`).join('');
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      grid.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show) { count++; card.classList.add('is-visible'); }
      });
      document.querySelector('#project-count').textContent = `${count} PROJECT${count === 1 ? '' : 'S'}`;
      grid.classList.toggle('filtered-grid', filter === 'minecraft');
    });
  });
}

export function renderSkills() {
  document.querySelector('#skills-grid').innerHTML = skillGroups.map(group => `<article class="skill-card reveal"><div class="skill-card-top"><span class="skill-number">${group.number}</span><svg class="icon"><use href="#${group.number === '01' ? 'i-code' : group.number === '02' ? 'i-chip' : 'i-cube'}"/></svg></div><h3>${escapeHtml(group.title)}</h3><p>${escapeHtml(group.description)}</p><ul>${group.skills.map(skill => `<li${skill === 'Java' ? ' class="primary-skill"' : ''}>${escapeHtml(skill)}</li>`).join('')}</ul></article>`).join('');
}
