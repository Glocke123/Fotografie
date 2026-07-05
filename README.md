# Isabel photography portfolio

A free static photography site designed for GitHub Pages or Cloudflare Pages.

## What this version does

- `index.html` shows visible album cover images, not just text.
- Each album has a small caption underneath: title and date/range.
- Hovering over a cover image shows the album title.
- Clicking a cover image opens a full-screen carousel on the same page.
- Arrow keys move forward/back.
- Escape closes the carousel.
- Albums are edited in `site-data.js`.

`album.html` is still included as an old fallback page, but this version is designed around the homepage carousel.

## Adding your own images

1. Create a folder such as `images/berlin-2026/`.
2. Add compressed JPG/WebP images named simply, for example `01.jpg`, `02.jpg`, `03.jpg`.
3. Edit `site-data.js`:

```js
{
  slug: "berlin-2026",
  title: "Berlin",
  meta: "2026",
  description: "",
  cover: "images/berlin-2026/01.jpg",
  images: [
    "images/berlin-2026/01.jpg",
    "images/berlin-2026/02.jpg",
    "images/berlin-2026/03.jpg"
  ]
}
```

## Image sizing

Export images before upload. A good starting point is:

- Long edge: 1800–2500 px
- JPG quality: 75–85%
- File size: ideally under 1 MB each, or 1–2 MB for important images

## Deploying on Cloudflare Pages

- Put the `isabel_photo_site` folder contents in a GitHub repository.
- In Cloudflare, go to Workers & Pages → Create → Pages → Connect to Git.
- Select the repository.
- Build command: leave blank.
- Output directory: `/`.
- Deploy.

## Before publishing

- Replace `your@email.com` in the HTML files.
- Replace `YOURHANDLE` with Isabel's Instagram handle.
- Replace placeholder SVGs with real images.
- Compress images before upload.
