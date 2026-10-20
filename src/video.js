export function initVideo(reducedMotion) {
  const video = document.querySelector('#hero-video');
  const button = document.querySelector('#video-toggle');
  const status = document.querySelector('#video-status');
  const media = document.querySelector('.hero-media');
  let requestedByUser = false;
  const update = () => {
    const paused = video.paused;
    button.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    button.innerHTML = `<svg class="icon" viewBox="0 0 24 24">${paused ? '<path d="m9 5 11 7-11 7Z"/>' : '<path d="M9 5v14m6-14v14"/>'}</svg>`;
  };
  function showPoster() { media.classList.add('show-poster'); update(); }
  video.addEventListener('playing', () => { media.classList.remove('show-poster'); update(); });
  video.addEventListener('pause', update);
  video.addEventListener('error', () => { showPoster(); button.hidden = true; status.textContent = 'The video could not load. A still banner is displayed.'; });
  video.muted = true;
  if (reducedMotion.matches) { video.autoplay = false; video.pause(); showPoster(); }
  else video.play().catch(showPoster);
  button.addEventListener('click', () => {
    requestedByUser = true;
    if (video.paused) video.play().catch(() => { showPoster(); status.textContent = 'Playback is unavailable. A still banner is displayed.'; });
    else video.pause();
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { video.pause(); showPoster(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { video.dataset.wasPlaying = String(!video.paused); video.pause(); }
    else if (video.dataset.wasPlaying === 'true' && (!reducedMotion.matches || requestedByUser)) video.play().catch(showPoster);
  });
  update();
}
