const video = document.querySelector('#hero-video');
const control = document.querySelector('#video-control');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateControl() {
  control.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="${video.paused ? 'M7 4v16l14-8z' : 'M6 5h4v14H6zm8 0h4v14h-4z'}"/></svg>`;
  control.setAttribute('aria-label', video.paused ? 'Play banner video' : 'Pause banner video');
}
if (reducedMotion.matches) { video.autoplay = false; video.pause(); }
control.addEventListener('click', () => {
  if (video.paused) video.play().catch(updateControl);
  else video.pause();
});
video.addEventListener('play', updateControl);
video.addEventListener('pause', updateControl);
updateControl();
document.querySelector('#year').textContent = new Date().getFullYear();
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) document.querySelectorAll('nav a').forEach(a => {
      if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));
