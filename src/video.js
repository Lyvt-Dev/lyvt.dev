const speaker = sound => `<svg class="icon" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/>${sound ? '<path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>' : '<path d="m16 9 5 6m0-6-5 6"/>'}</svg>`;

export function initVideo(reducedMotion) {
  const video = document.querySelector('#hero-video');
  const playButton = document.querySelector('#video-toggle');
  const soundButton = document.querySelector('#sound-toggle');
  const status = document.querySelector('#video-status');
  const media = document.querySelector('.hero-media');
  let userStarted = false;
  let resumeWhenVisible = false;

  function update() {
    const sound = !video.muted && video.volume > 0;
    playButton.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');
    playButton.innerHTML = `<svg class="icon" viewBox="0 0 24 24">${video.paused ? '<path d="m9 5 11 7-11 7Z"/>' : '<path d="M9 5v14m6-14v14"/>'}</svg>`;
    soundButton.setAttribute('aria-label', sound ? 'Mute banner sound' : 'Enable banner sound');
    soundButton.setAttribute('aria-pressed', String(sound));
    soundButton.innerHTML = `${speaker(sound)}<span>${sound ? 'Sound on' : 'Sound off'}</span>`;
  }
  function showPoster() { media.classList.add('show-poster'); update(); }
  video.addEventListener('playing', () => { media.classList.remove('show-poster'); update(); });
  video.addEventListener('pause', update);
  video.addEventListener('volumechange', update);
  video.addEventListener('error', () => {
    showPoster(); playButton.hidden = true; soundButton.hidden = true;
    status.textContent = 'Video playback is unavailable. A still banner is displayed.';
  });
  video.volume = .45;
  video.muted = false;

  // Try audible playback. Fall back to muted playback when the browser requires a gesture.
  if (reducedMotion.matches) { video.muted = true; video.pause(); showPoster(); }
  else {
    video.play().catch(() => {
      video.muted = true;
      status.textContent = 'Use Enable banner sound to hear the original audio.';
      return video.play().catch(showPoster);
    });
  }
  soundButton.addEventListener('click', async () => {
    userStarted = true;
    video.muted = !video.muted;
    if (!video.muted) {
      try { await video.play(); status.textContent = 'Banner sound enabled.'; }
      catch { video.muted = true; showPoster(); status.textContent = 'Playback could not start. Please try again.'; }
    } else status.textContent = 'Banner sound muted.';
    update();
  });
  playButton.addEventListener('click', () => {
    userStarted = true;
    if (video.paused) video.play().catch(() => { showPoster(); status.textContent = 'Playback could not start. Please try again.'; });
    else video.pause();
  });
  reducedMotion.addEventListener('change', event => { if (event.matches) { video.pause(); showPoster(); } });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { resumeWhenVisible = !video.paused; video.pause(); }
    else if (resumeWhenVisible && (!reducedMotion.matches || userStarted)) video.play().catch(showPoster);
  });
  update();
}
