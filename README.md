# Lyvt portfolio

Personal portfolio based on the Lyvt-Dev GitHub profile and project READMEs. Includes the supplied video banner and a screenshot from ThinkCad.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 3000
```

## Production

```sh
npm run build
npm run preview -- --port 3000
```

Deploy the generated `dist/` folder to a static host. No credentials or backend services are required. Content and project links are in `index.html`; styling is in `src/style.css`; video controls and section navigation are in `src/main.js`. Media files are served from `public/`.

The banner is muted and loops automatically, with a pause/play control. Reduced-motion preferences disable autoplay.
