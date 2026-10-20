import { minecraft } from './data.js';

export async function initSkin(reducedMotion) {
  const canvas = document.querySelector('#skin-canvas');
  const fallback = document.querySelector('#skin-fallback');
  const status = document.querySelector('#skin-status');
  const retry = document.querySelector('#skin-retry');
  const controls = document.querySelector('#skin-controls');
  const stage = document.querySelector('#skin-stage');
  let viewer;
  let animation;
  let loading = false;
  let visible = false;
  let animate = !reducedMotion.matches;

  const syncMotion = () => {
    if (!viewer) return;
    animation.paused = !animate;
    viewer.autoRotate = false;
    viewer.renderPaused = !visible || document.hidden;
    const button = document.querySelector('#skin-motion');
    button.setAttribute('aria-label', animate ? 'Pause skin animation' : 'Play skin animation');
    button.innerHTML = `<svg class="icon" viewBox="0 0 24 24">${animate ? '<path d="M9 5v14m6-14v14"/>' : '<path d="m9 5 11 7-11 7Z"/>'}</svg>`;
  };

  async function load() {
    if (loading) return;
    loading = true;
    retry.hidden = true;
    status.textContent = `Loading ${minecraft.username}’s skin…`;
    try {
      const response = await fetch(minecraft.skinUrl, { signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error('Skin service unavailable');
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) throw new Error('Invalid skin image');
      const imageUrl = URL.createObjectURL(blob);
      try {
        const { SkinViewer, FunctionAnimation } = await import('skinview3d');
        viewer?.dispose();
        canvas.hidden = false;
        viewer = new SkinViewer({ canvas, width: stage.clientWidth, height: stage.clientHeight, fov: 45 });
        await viewer.loadSkin(imageUrl);
        viewer.camera.position.set(10, 7, 53);
        viewer.controls.enablePan = false;
        viewer.controls.enableZoom = false;
        viewer.autoRotateSpeed = .35;
        viewer.globalLight.intensity = 1.2;
        animation = new FunctionAnimation((player, time) => {
          player.position.y = 1.5 + Math.sin(time * 1.1) * .65;
          player.rotation.z = -.08 + Math.sin(time * .7) * .025;
          player.rotation.y = -.16 + Math.sin(time * .55) * .12;
          player.skin.head.rotation.set(.12, -.08, .12);
          player.skin.leftLeg.rotation.set(-1.2, .06, -.22);
          player.skin.rightLeg.rotation.set(-1.15, -.06, .22);
          player.skin.leftArm.rotation.set(-.65, 0, -.2);
          player.skin.rightArm.rotation.set(-.65, 0, .2);
        });
        viewer.animation = animation;
        animation.update(viewer.playerObject, 0);
        fallback.hidden = true;
        controls.hidden = false;
        syncMotion();
      } finally { URL.revokeObjectURL(imageUrl); }
    } catch {
      viewer?.dispose();
      viewer = null;
      canvas.hidden = true;
      fallback.hidden = false;
      controls.hidden = true;
      status.textContent = 'Skin preview is unavailable right now.';
      retry.hidden = false;
    } finally { loading = false; }
  }

  new ResizeObserver(() => {
    if (viewer) viewer.setSize(stage.clientWidth, stage.clientHeight);
  }).observe(stage);
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible && !viewer && !loading && retry.hidden) load();
    syncMotion();
  }, { rootMargin: '100px' });
  observer.observe(stage);
  retry.addEventListener('click', load);
  document.querySelector('#skin-left').addEventListener('click', () => { if (viewer) viewer.playerWrapper.rotation.y -= Math.PI / 4; });
  document.querySelector('#skin-right').addEventListener('click', () => { if (viewer) viewer.playerWrapper.rotation.y += Math.PI / 4; });
  document.querySelector('#skin-motion').addEventListener('click', () => { animate = !animate; syncMotion(); });
  reducedMotion.addEventListener('change', event => { animate = !event.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
}
