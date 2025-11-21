# DGF-Creations Website

Official website for DGF-Creations - Creative Studio & Showcase

## Tech Stack

- **Generator**: Hugo v0.152.2+
- **Theme**: Custom (`dgf-custom`)
- **Hosting**: Cloudflare Pages
- **Domain**: dgf-creations.com

## Development

```bash
# Local preview (not supported on Android/Termux due to file locking)
hugo server --buildDrafts

# Build for production
hugo --minify
```

## Cloudflare Pages Setup

**Build Configuration**:
- **Build command**: `hugo --minify`
- **Build output directory**: `public`
- **Root directory**: `/`
- **Node version**: Not required (Hugo only)

## Project Structure

```
website/
├── content/          # Markdown content
│   ├── projects/     # Project showcases
│   └── blog/         # Blog posts
├── themes/
│   └── dgf-custom/   # Custom Hugo theme
├── static/           # Static assets
└── hugo.toml         # Site configuration
```

## Featured Projects

1. Keystroke Symphony 🎵
2. ULTRA Voice System 🎙️
3. Brain System 🧠
4. Nelson Solar Plan ☀️
5. Circuit Builder ⚡
6. HBC Platform 🎯

## Design

Theme design by Gemini 2.0+ based on spec:
`/specs/SPEC_20251120_Gemini_Custom_Hugo_Theme_Design.md`

---

**Status**: In Development
**Launch Target**: Week 1 (Iterative Preview)
