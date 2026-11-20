# Samer Odeh — Portfolio

A minimal personal website with an animated fox, light and dark themes, a project gallery, and an embedded resume. Built with plain HTML, CSS, JavaScript, and SVG.

**Live site:** https://samerodeh-dev.vercel.app/

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173/. No dependency installation or build step is required.

## Structure

- `dist/index.html` — biography and professional links.
- `dist/projects/` — project gallery and LocalGo detail page.
- `dist/blog/` — blog placeholder.
- `dist/resume/` — embedded PDF viewer and download links.
- `dist/assets/` — shared CSS, JavaScript, portrait, illustrations, and real project captures.
- `vercel.json` — static hosting configuration.

Repo Investigator uses captured output from a real agent run. Goer AI shows its actual browser chat. LocalGo uses app screenshots. The Jarvis thumbnail remains an illustration pending a hardware photo.

## Deployment

Vercel project: `samerodeh-dev`. Production branch: `main`. Output directory: `dist`. No build command is needed. Once the GitHub repository is connected, pushes to `main` deploy automatically.
