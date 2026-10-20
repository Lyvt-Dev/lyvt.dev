import { projects, tools } from './data.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = '<svg class="icon small"><use href="#i-arrow"/></svg>';

function artwork(project) {
  if (project.image) return `<div class="project-art desktop-art"><img src="${escapeHtml(new URL(project.image, document.baseURI).href)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" width="1200" height="750"><span class="art-code">C++20 / QT 6</span></div>`;
  if (project.artwork === 'item') return '<div class="project-art item-art" aria-hidden="true"><div class="voxel"><span class="voxel-top"></span><span class="voxel-front"></span><span class="voxel-side"></span></div><span class="art-title">ItemNPC<span>INTERACTION, REIMAGINED.</span></span><span class="art-code">/npc spawn &lt;idea&gt;</span></div>';
  return '<div class="project-art clan-art" aria-hidden="true"><svg class="clan-shield" viewBox="0 0 100 110"><path d="m50 5 40 16v33c0 24-20 43-40 54C30 97 10 78 10 54V21L50 5Z"/><path d="m32 53 13 13 25-27"/></svg><span class="art-title">ClanPlus<span>BUILD YOUR COMMUNITY.</span></span><span class="art-code">&lt;clan color="purple" /&gt;</span></div>';
}

export function renderProjects() {
  document.querySelector('#project-grid').innerHTML = projects.map(project => `<article class="project-card reveal"><a class="project-image-link" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.name)} on GitHub">${artwork(project)}<span class="project-hover">View source ${arrow}</span></a><div class="project-title"><h3><a href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}</a></h3><span>${escapeHtml(project.categoryLabel)}</span></div><p>${escapeHtml(project.description)}</p><div class="project-tech">${project.technologies.map(tag=>`<span>${escapeHtml(tag)}</span>`).join('')}</div></article>`).join('');
}

export function renderSkills() {
  document.querySelector('#skills-grid').innerHTML = tools.map(tool => `<div class="tool"><img src="${escapeHtml(new URL(`tools/${tool.icon}.svg`,document.baseURI).href)}" alt="" width="52" height="52" loading="lazy"><span>${escapeHtml(tool.name)}</span></div>`).join('');
}
