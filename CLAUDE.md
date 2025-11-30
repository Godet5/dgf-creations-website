# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

DGF-Creations official website - a Hugo static site showcasing creative projects and experimental studio work. Hosted on Cloudflare Pages with custom theme designed by Gemini 2.0+.

**Strategic Priority**: G1 - Website Launch (Revenue Dependency)
**Launch Target**: Week 1 (Iterative Preview)
**Domain**: dgf-creations.com

---

## Build & Development Commands

### Production Build

```bash
# Build site for production deployment
hugo --minify

# Output directory: ./public/
```

### Local Development (Not Supported on Android/Termux)

Hugo's `hugo server` requires file watching which conflicts with Android/Termux file systems. For local development:

```bash
# Build only (no live reload)
hugo

# View in browser: open ./public/index.html
```

### Deployment

**Automated (via GitHub Actions)**:
```bash
git push origin main
# Triggers .github/workflows/deploy.yml
# Deploys to Cloudflare Pages automatically
```

**Manual (via Wrangler CLI)**:
```bash
npx wrangler pages deploy ./public --project-name=dgf-creations
```

See `/storage/emulated/0/DGF-Creations/001-System/WEBSITE/DEPLOYMENT_AUTOMATION_GUIDE.md` for complete deployment setup.

---

## Architecture

### Hugo Site Structure

```
website/
├── content/                    # Markdown content files
│   ├── _index.md              # Homepage content
│   ├── projects/              # Project showcases (6 featured)
│   └── blog/                  # Blog posts
├── themes/dgf-custom/         # Custom Hugo theme (Gemini-designed)
│   ├── layouts/
│   │   ├── baseof.html        # Base template
│   │   ├── index.html         # Homepage layout
│   │   ├── projects/          # Project-specific layouts
│   │   └── _partials/         # Reusable components
│   ├── assets/
│   │   ├── css/               # Stylesheets
│   │   └── js/                # JavaScript (minimal)
│   └── static/                # Static files (images, fonts)
├── static/                    # Root-level static assets
├── hugo.toml                  # Site configuration
└── public/                    # Build output (gitignored)
```

### Theme Design Philosophy

Custom theme designed by Gemini 2.0+ with these principles:
- **Experimental studio meets research notebook** aesthetic
- Human-speed creativity with AI collaboration
- Empowering, authentic, professional but not corporate
- Mobile-first responsive design
- Minimal JavaScript, fast load times

### Hugo Configuration

Key settings in `hugo.toml`:
- **Base URL**: `https://dgf-creations.com/`
- **Theme**: `dgf-custom`
- **Outputs**: HTML, RSS, JSON
- **Markup**: Goldmark with unsafe HTML enabled (for custom components)

### Interactive Project Demos

Several projects include **web-based interactive demos** that will be embedded in the Hugo site:

**Keystroke Symphony Web Demo**:
- **Location**: `/storage/emulated/0/DGF-Creations/Creations/Keystroke-Symphony/keystroke-symphony/`
- **Tech Stack**:
  - **Backend**: Pyodide (Python in browser via WebAssembly)
  - **Audio**: Web Audio API (oscillators, gain nodes, audio context)
  - **Input**: JavaScript keyboard event listeners
  - **UI**: HTML/CSS/Canvas for waveform visualization
  - **Platform adapter**: `platforms/web.py` provides Web Audio engine
- **Integration**: Embed as iframe or inline JavaScript in Hugo shortcode
- **Files**:
  - `app/index.html` - PWA launcher (mobile-first)
  - `platforms/web.py` - WebAudioEngine, WebInputHandler classes
  - `requirements_web.txt` - Pyodide dependencies (numpy)

**Web Demo Architecture**:
```
HTML/CSS Frontend → JavaScript Keyboard Events → Pyodide (Python) →
Web Audio API Synthesis → Canvas Visualization
```

**Embedding in Hugo**:
Create shortcode in `themes/dgf-custom/layouts/shortcodes/keystroke-demo.html`:
```html
<div class="project-demo" id="keystroke-symphony">
  <iframe src="/demos/keystroke-symphony/index.html"
          width="100%" height="600px"
          frameborder="0"></iframe>
</div>
```

**Static Asset Management**:
- Copy interactive demos to `static/demos/` during build
- Serve via Cloudflare Pages as static assets
- Pyodide loaded from CDN: `https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js`

**Note**: For production, consider React version for better component architecture and state management (future enhancement).

---

## Featured Projects (Homepage Showcase)

The site showcases 6 diverse projects:

1. **Keystroke Symphony** 🎵 - Session map-up at human speed (30 sec) - agent responses become music
2. **ULTRA Voice System** 🎙️ - Voice interaction with Claude
3. **Brain System** 🧠 - Knowledge graph-based persistent memory
4. **Nelson Solar Plan** ☀️ - Custom solar system design
5. **Circuit Builder** ⚡ - Educational electronics platform
6. **HBC Platform** 🎯 - Habit Builder Challenge app

Project content lives in `content/projects/` with individual markdown files.

---

## Content Management

### Creating New Content

**New Project**:
```bash
hugo new content/projects/project-name.md
```

**New Blog Post**:
```bash
hugo new content/blog/post-title.md
```

### Front Matter Format

All content files use YAML front matter:

```yaml
---
title: "Project Title"
description: "Short description"
date: 2025-11-25
draft: false
---
```

### Content Guidelines

- Focus on "big picture" - show experimental process, human-AI collaboration
- Avoid generic marketing copy - be authentic and specific
- Include technical details in "Deep Dive" sections for credibility
- Use emojis sparingly and only where they enhance meaning

---

## Cloudflare Pages Deployment

### Build Configuration

When setting up Cloudflare Pages project:
- **Framework preset**: Hugo
- **Build command**: `hugo --minify`
- **Build output directory**: `public`
- **Root directory**: `/`
- **Node.js version**: Not required (Hugo only)

### Environment Variables

None required for basic Hugo build. Add these if implementing dynamic features:

- `HUGO_VERSION` - Pin specific Hugo version (optional)
- `CLOUDFLARE_ACCOUNT_ID` - For API deployments
- `CLOUDFLARE_API_TOKEN` - For API deployments

### Custom Domain Setup

1. Add custom domain in Cloudflare Pages dashboard
2. Update `baseURL` in `hugo.toml` to match domain
3. DNS is automatically configured via Cloudflare

---

## Development Workflow

### Making Changes

1. Edit content in `content/` or theme files in `themes/dgf-custom/`
2. Build with `hugo --minify`
3. Review output in `public/`
4. Commit changes to git
5. Push to trigger deployment

### Adding Interactive Demos

**Process for embedding project demos**:

1. **Prepare demo files**:
   ```bash
   # Copy demo to static directory
   cp -r /path/to/project/app/* static/demos/project-name/
   ```

2. **Create Hugo shortcode** (in `themes/dgf-custom/layouts/shortcodes/`):
   ```html
   {{/* shortcodes/demo.html */}}
   <div class="interactive-demo">
     <iframe src="/demos/{{ .Get 0 }}/index.html"
             width="100%"
             height="{{ .Get 1 | default "600" }}px"
             sandbox="allow-scripts allow-same-origin">
     </iframe>
   </div>
   ```

3. **Use in content**:
   ```markdown
   {{< demo "keystroke-symphony" "800" >}}
   ```

4. **Build and verify**:
   ```bash
   hugo --minify
   # Check demo files copied to public/demos/
   ```

### JavaScript Integration

**For custom interactive features**:

- **Location**: `themes/dgf-custom/assets/js/`
- **Technologies**:
  - Vanilla JavaScript (preferred for performance)
  - Web Audio API (for Keystroke Symphony demo)
  - Canvas API (for visualizations)
  - Optional: Alpine.js for reactive components (lightweight alternative to React)

**Adding JavaScript to theme**:
```html
<!-- In themes/dgf-custom/layouts/partials/footer.html -->
<script src="/js/main.js"></script>
```

**Web Audio API Example** (for project demos):
```javascript
// Simple Web Audio synthesis
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillator.type = 'sine';
oscillator.frequency.value = 440; // A4 note
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

oscillator.start();
oscillator.stop(audioContext.currentTime + 0.5);
```

### Testing Before Deploy

Since live server isn't available on Termux:

```bash
# Build site
hugo --minify

# Check build output
ls -la public/

# Verify critical pages exist
ls public/index.html
ls public/projects/index.html

# Verify demos copied correctly
ls -la public/demos/
```

### Common Issues

**Build fails with "failed to extract shortcode"**:
- Check for unclosed shortcodes in markdown files
- Ensure custom shortcodes exist in `themes/dgf-custom/layouts/shortcodes/`

**Assets not loading**:
- Static files go in `static/` (copied as-is to public/)
- Theme assets go in `themes/dgf-custom/static/`
- Use `{{ .Site.BaseURL }}` for absolute URLs in templates

**Theme changes not appearing**:
- Clear Hugo cache: `rm -rf resources/_gen/`
- Rebuild: `hugo --minify`

---

## Theme Customization

### Layout Hierarchy

Hugo uses template lookup order. To override theme layouts:

1. Create file in root `layouts/` directory
2. Use same path as theme file
3. Root layouts take precedence over theme layouts

**Example**: Override homepage
- Theme file: `themes/dgf-custom/layouts/index.html`
- Override: `layouts/index.html` (in root)

### CSS Architecture

Theme uses minimal CSS approach:
- `themes/dgf-custom/assets/css/main.css` - Core styles
- Mobile-first responsive breakpoints: 640px, 1024px
- Consistent spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px

### Partials

Reusable components in `themes/dgf-custom/layouts/_partials/`:
- `header.html` - Site navigation
- `footer.html` - Footer content
- `project-card.html` - Project showcase cards
- Use with: `{{ partial "header.html" . }}`

---

## Integration with DGF System

### Parent Repository

Website is part of larger DGF-Creations ecosystem:
- **System docs**: `/storage/emulated/0/DGF-Creations/001-System/WEBSITE/`
- **Planning docs**: `/storage/emulated/0/DGF-Creations/_recent_files/Website-Planning/`
- **Launch plan**: See `PHASE_1_LAUNCH_PLAN.md` in system docs

### Multi-Agent Coordination

- **Claude (Code)**: Hugo implementation, deployment, API integration
- **Gemini**: Theme design, security audit, compliance review
- **ChatGPT**: Content creation, copywriting, UX review

### Session Continuity

Website work follows DGF session continuity protocol:
- Handoffs created in `/storage/emulated/0/DGF-Creations/_recent_files/agent-handoffs/`
- Check recent files before recreating work
- Log significant changes in session tracking

---

## Future Enhancements (Post-Launch)

Phase 1 focuses on static site. Future additions:

**Dynamic Features**:
- Supabase integration for user accounts
- Stripe integration for subscriptions
- Cloudflare Functions for serverless APIs
- htmx + Alpine.js for interactivity

**Content Additions**:
- Blog with syntax highlighting
- Downloads section
- Project demos/playgrounds
- Newsletter signup

**React/JavaScript Framework Considerations**:

While current architecture uses vanilla JavaScript + Hugo for simplicity, **React components** may be added for:

1. **Interactive Project Showcases**:
   - Keystroke Symphony web demo (currently Pyodide + Web Audio API)
   - ULTRA Voice visualization
   - Circuit Builder interactive playground

2. **User Dashboard** (Post-Subscription Launch):
   - Account management
   - Subscription status
   - Download history
   - Personalized content

3. **Potential Architecture**:
   ```
   Hugo Static Site (Marketing/Content)
        ↓
   React Components (Interactive Features)
        ↓
   Cloudflare Functions (Backend API)
        ↓
   Supabase (Database + Auth)
   ```

4. **Implementation Path**:
   - **Phase 1**: Pure Hugo + vanilla JS + embedded HTML demos
   - **Phase 1.5**: Alpine.js for reactive components (lightweight, Hugo-friendly)
   - **Phase 2**: React components for complex interactions (if needed)
   - **Phase 3**: Full React SPA for user dashboard (separate subdomain)

5. **Web Components as Alternative**:
   - Custom Elements API (framework-agnostic)
   - Shadow DOM for style isolation
   - Can be embedded in Hugo without build step complexity

**Current Demo Tech Stack**:
- **Keystroke Symphony**: HTML + Pyodide (Python→WASM) + Web Audio API + Canvas
- **Future Demos**: May use React for better state management and component reusability

**Decision Criteria for React**:
- ✅ Use React if: Complex state management, frequent updates, large component tree
- ❌ Avoid React if: Simple interactions, performance-critical, minimal JS footprint

See `PHASE_1_LAUNCH_PLAN.md` for complete roadmap details.

---

## Related Documentation

**External**:
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Hugo Theme Components](https://gohugo.io/hugo-modules/theme-components/)

**Internal**:
- `/storage/emulated/0/DGF-Creations/001-System/WEBSITE/DEPLOYMENT_AUTOMATION_GUIDE.md` - Complete deployment setup
- `/storage/emulated/0/DGF-Creations/001-System/WEBSITE/PHASE_1_LAUNCH_PLAN.md` - Launch roadmap
- `/storage/emulated/0/DGF-Creations/001-System/DGF_MASTER_TELOS.md` - Strategic goals

---

**Last Updated**: 2025-11-25
**Hugo Version**: v0.152.2+
**Theme**: dgf-custom (Gemini-designed)
**Status**: In Development - Pre-Launch
