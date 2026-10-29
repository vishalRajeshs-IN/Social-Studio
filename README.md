# AI Social Media Marketing Studio

A typed React + Vite campaign studio. Upload a product image, enter product details, preview a poster, a Remotion-powered vertical reel, a five-slide carousel, captions, and a 7-day suggested schedule. Poster and carousel frames export as PNG.

## Requirements
- Node.js 20.19+ (or a current supported LTS)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL Vite prints (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Notes
- This is a functional front-end prototype with deterministic, template-based campaign copy. It does not call a hosted AI model or backend. Connect your preferred AI API through a secure server endpoint for generated content; never place secret API keys in client-side code.
- The Remotion Player provides live 9:16 playback in the browser. This project previews the reel; rendering a downloadable MP4 requires a server/CLI render workflow using Remotion.
- Uploaded product images are held in local React state for the current session only.
- PNG exports are generated in-browser with `html-to-image`.
