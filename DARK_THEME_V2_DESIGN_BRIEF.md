# Dark Theme v2 - Design Brief

**Branch**: `feature/dark-theme-v2`
**Baseline**: Phase 5 (commit 9e7f93b)
**Status**: Design phase - NOT approved for implementation
**Date**: 2025-12-06

---

## Purpose

Create a dark theme for dgf-creations.com that surpasses Phase 5 visual quality while maintaining hierarchy, readability, and the DGF aesthetic (intelligent, calm, professional).

**Success Criteria**: New theme must be CLEARLY BETTER than Phase 5, or it does not ship.

---

## Goals

1. **Preserve Hierarchy**: Flagship (HBC) > platforms > consulting distinction must remain clear
2. **Improve Readability**: Long-form reading must be comfortable, not straining
3. **Align with DGF Aesthetic**: Intelligent, calm, not "glowing terminal cave"
4. **Meet Standards**: WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI)
5. **Systematic Tokens**: Use design tokens, not scattered hex codes

---

## Constraints

### Technical
- Must build on Android/Termux (hbuild with --noBuildLock)
- Must not break existing Phase 5 features (nav icons, platform filtering, carousel)
- Must work across all 61 pages without page-specific fixes
- Must maintain Hugo template compatibility

### Design
- Must work for long-form reading (project pages, blog posts)
- Must meet WCAG AA contrast standards
- Must use tokens defined below (no random hex codes in CSS)
- Cannot change typography scale or spacing system from Phase 5

### Process
- Must get user approval on design tokens BEFORE implementation
- Must implement in controlled passes (base → components → special)
- Must not merge unless clearly superior to Phase 5

---

## Design Tokens

### Color System

**Background Layers**:
```css
--color-bg-primary:    /* Main background (body) */
--color-bg-secondary:  /* Elevated surfaces (cards, nav) */
--color-bg-tertiary:   /* Highest elevation (modals, overlays) */
```

**Text Hierarchy**:
```css
--color-text-primary:   /* Headings, primary content */
--color-text-secondary: /* Body text, standard content */
--color-text-muted:     /* Metadata, labels, subtle info */
--color-text-inverse:   /* Text on dark surfaces (if needed) */
```

**Accent & Interaction**:
```css
--color-accent-primary:   /* Primary actions, flagship badge */
--color-accent-secondary: /* Hover states, focus rings */
--color-accent-tertiary:  /* Subtle accents, decorative */
```

**Borders & Dividers**:
```css
--color-border-primary:   /* Standard borders */
--color-border-secondary: /* Subtle dividers */
--color-border-accent:    /* Platform-specific borders */
```

**Platform Identity** (from Phase 5 - may adjust lightness):
```css
--platform-hbc-primary:      /* Flagship teal */
--platform-ultra-primary:    /* ULTRA pink */
--platform-keystroke-primary: /* Keystroke purple */
--platform-circuit-primary:   /* Circuit amber */
--platform-consulting-primary: /* Consulting gray */
```

### Spacing System (Inherited from Phase 5)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 1rem;     /* 16px */
--space-4: 1.5rem;   /* 24px */
--space-5: 2rem;     /* 32px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
```

### Border Radius (Inherited from Phase 5)
```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-xl: 1rem;     /* 16px */
```

### Shadows (Dark Theme Specific)
```css
--shadow-sm:  /* Subtle lift */
--shadow-md:  /* Card elevation */
--shadow-lg:  /* Modal/overlay depth */
--shadow-glow: /* Optional: soft glow for accents */
```

### Typography (Inherited from Phase 5 - DO NOT CHANGE)
```css
/* Typography scale and line heights already defined in Phase 5 */
/* h1: 2.25rem / 2.5rem line-height */
/* h2: 1.875rem / 2.25rem */
/* h3: 1.5rem / 2rem */
/* h4: 1.25rem / 1.75rem */
/* body: 1rem / 1.6 */
```

---

## Phase 5 Baseline Reference

**Current Phase 5 values** (for comparison/reference):
```css
/* From themes/dgf-custom/assets/css/main.css */
--color-obsidian: #111111;  /* Near-black background */
--color-surface: #1a1a1a;   /* Card/elevated surfaces */
--color-primary: #e5e5e5;   /* Primary text */
--color-secondary: #475569; /* Muted text/metadata */
```

**Platform colors** (Phase 5):
```css
--platform-hbc: #14b8a6;      /* Teal */
--platform-ultra: #ec4899;    /* Pink */
--platform-keystroke: #8b5cf6; /* Purple */
--platform-circuit: #f59e0b;   /* Amber */
--platform-consulting: #9ca3af; /* Gray */
```

---

## Implementation Plan

### Pass 1: Base Styling (Token System)
**Files to modify**:
- `themes/dgf-custom/assets/css/main.css` (create `:root` token declarations)
- Replace hardcoded colors with `var(--token-name)`

**Changes**:
1. Define all tokens in `:root` block
2. Update `body` background and text to use tokens
3. Update heading colors to use tokens
4. Test on homepage only

**Exit criteria**: Tokens defined, homepage renders correctly

---

### Pass 2: Core Components
**Files to modify**:
- Navigation (header.html + CSS)
- Buttons and links
- Cards (project-card.html + CSS)
- Code blocks (syntax highlighting)

**Changes**:
1. Update nav background, text, hover states
2. Update button styles (primary, secondary, ghost)
3. Update card backgrounds, borders, shadows
4. Verify code syntax highlighting contrast

**Exit criteria**: Core components render clearly, maintain hierarchy

---

### Pass 3: Special Components
**Files to modify**:
- Hero sections (platform-specific)
- Platform badges
- Footer
- Any carousels or interactive elements

**Changes**:
1. Update hero backgrounds and overlays
2. Verify platform badge contrast (especially flagship)
3. Update footer styling
4. Test carousel if present

**Exit criteria**: All components work, platform identity preserved

---

### Pass 4: Content Pages
**Files to verify**:
- Project single pages
- About page
- Any blog/content pages

**Testing**:
1. Long-form reading comfort
2. Heading hierarchy clarity
3. Link visibility and states
4. Image/media integration

**Exit criteria**: All pages readable, no contrast failures

---

### Pass 5: Refinement
**Activities**:
1. User review and feedback
2. Contrast audits (use browser DevTools)
3. Cross-page consistency check
4. Performance check (no CSS bloat)

**Exit criteria**: User approval, WCAG AA compliance, no regressions

---

## Testing Checklist

Before merging to master:

- [ ] All 61 pages build without errors
- [ ] Homepage hierarchy clear (HBC > platforms > consulting)
- [ ] Long-form reading comfortable (project pages)
- [ ] Navigation usable and clear
- [ ] Platform colors distinct and visible
- [ ] Flagship badge prominent on desktop AND mobile
- [ ] All text meets WCAG AA contrast (4.5:1)
- [ ] All UI elements meet WCAG AA contrast (3:1)
- [ ] No scattered hex codes (all use tokens)
- [ ] CSS diff is reviewable and logical
- [ ] User says "this is better than Phase 5"

---

## Non-Goals (Scope Firewall)

DO NOT attempt these (defer to future phases):

- Typography rewrite (scale, fonts)
- Color palette expansion beyond defined tokens
- New components not in Phase 5
- Layout restructuring
- Content changes
- Image optimization
- Performance refactoring
- Animation/transition system
- Dark mode toggle (this IS dark mode)

---

## Approval Process

### Step 1: Token Definition (THIS DOCUMENT)
- [ ] User reviews proposed token structure
- [ ] User approves or suggests changes
- [ ] Tokens finalized in this document

### Step 2: Token Values (NEXT STEP)
- [ ] Propose specific hex values for each token
- [ ] Show color swatches (visual, not just hex codes)
- [ ] Show contrast ratios against backgrounds
- [ ] User approves specific values

### Step 3: Implementation (AFTER APPROVAL)
- [ ] Implement in passes (Pass 1 → Pass 2 → Pass 3 → Pass 4 → Pass 5)
- [ ] User reviews after each pass
- [ ] Iterate or proceed based on feedback

### Step 4: Merge Decision
- [ ] User compares to Phase 5
- [ ] User decides: merge or abandon
- [ ] If abandon: delete branch, return to master

---

## Rollback Plan

If dark theme v2 fails:

```bash
# Return to master (Phase 5 baseline)
cd /storage/emulated/0/DGF-Creations/website
git checkout master
git branch -D feature/dark-theme-v2

# Verify baseline
hbuild
```

No harm done. Phase 5 remains stable.

---

## Current Status

**Phase**: Design - awaiting token approval
**Branch**: `feature/dark-theme-v2`
**Baseline**: Phase 5 verified (61 pages, 253ms, clean build)
**Next**: Define specific token values and get user approval

---

## References

- Phase 5 Checklist: `website/PHASE5_BUILD_CHECKLIST.md` (if on master branch)
- Phase 5 Governance: `~/.dgf/handoffs/HANDOFF_website_phase5_governance_20251205_103106.md`
- Hugo Commands: `~/CLAUDE.md` (Hugo section)
- WCAG Contrast Tool: https://webaim.org/resources/contrastchecker/

---

**Document Version**: v1.0
**Last Updated**: 2025-12-06
**Status**: AWAITING USER APPROVAL ON TOKEN STRUCTURE
