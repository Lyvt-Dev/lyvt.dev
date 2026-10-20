import { renderProjects, renderSkills } from './projects.js';
import { initVideo } from './video.js';
import { initSkin } from './skin.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
renderProjects();
renderSkills();
initVideo(reducedMotion);
initSkin(reducedMotion);
document.querySelector('#year').textContent = new Date().getFullYear();

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-shell')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => {
  if (reducedMotion.matches) element.classList.add('is-visible');
  else { element.classList.add('will-reveal'); revealObserver.observe(element); }
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
