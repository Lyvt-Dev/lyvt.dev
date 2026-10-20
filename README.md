# Luca “Lyvt” portfolio

A single-page English portfolio with a full-width video hero, a freely floating 3D Minecraft skin, a compact project gallery, and a black and purple theme.

## Develop

Use Node.js 22.12+ or Node.js 24.

```sh
npm ci
npm run dev -- --port 3000
```

In the cloud workspace, use `npm ci --cache /workspace/.npm-cache` if the default npm cache is unavailable.

## Build and preview

```sh
npm run build
npm run preview -- --port 3000
```

Relative asset URLs support both the `/lyvt.dev/` GitHub Pages path and a custom domain. Upload the contents of `dist/`, not the source checkout.

## GitHub Pages

Select **Settings > Pages > Build and deployment > Source > GitHub Actions**. The workflow in `.github/workflows/pages.yml` installs dependencies, downloads Lyvt’s official Minecraft skin, builds the site, and deploys `dist/` on pushes to `main`.

The build retrieves the skin from Mojang and the Minecraft texture server using `scripts/fetch-skin.mjs`. It validates the profile, texture hostname, and PNG signature. A failed skin download stops deployment so the last successful site remains available. The generated skin file is ignored by Git and is included in the deployed output.

To reproduce that production build locally with Internet access:

```sh
npm run fetch-skin
VITE_MINECRAFT_SKIN_URL=./skin.png npm run build
```

Development uses the public Minotar skin endpoint for `Lyvt`. If that endpoint is blocked or unavailable, the site shows a neutral silhouette, retry button, and Minecraft profile link. It never substitutes another player’s skin. The 3D viewer code loads only after a skin is retrieved. Reduced-motion preferences pause both the video and skin animation. The skin has a seated floating pose with subtle motion and manual rotation controls.

## Edit content

- `src/data.js`: selected projects, technologies, and Minecraft skin source.
- `index.html`: biography, hero, navigation, and contact links.
- `src/style.css`: responsive layout, colors, typography, and animation.
- `src/projects.js`: project gallery and tool icon rendering.
- `src/video.js`: original banner audio, sound toggle, playback, poster fallback, and reduced motion.
- `src/skin.js`: lazy 3D skin rendering, rotation controls, retry, and motion settings.
- `public/`: optimized images, self-hosted font, supplied MP4, and a compact WebM version with an Opus audio track.

## Content and assets

Project descriptions and skills are based on the public Lyvt-Dev profile and the ThinkCad, ItemNPC, and ClanPlus READMEs. Project data is local, so no GitHub API token is required. The ThinkCad screenshot comes from its repository. The banner video was provided by Luca. Both MP4 and WebM include its original audio. The page attempts audible playback, falls back to muted playback when the browser blocks it, and provides an explicit sound toggle. Manrope is licensed under the SIL Open Font License, included in `public/fonts/OFL.txt`.

The layout follows the supplied reference: large name and floating skin, a compact project gallery, a short biography, tool icons, and a minimal footer. No image from the reference site is reused.

Tool icons are from Devicon. Its MIT license is included in `public/tools/LICENSE.txt`.
