# DGF Creations Website - Quick Start

**CRITICAL**: Hugo requires `--noBuildLock` flag on Android/Termux. Use the provided shell aliases or add the flag manually.

---

## Build Commands

```bash
# Build for production
hbuild

# Start dev server (localhost:1313)
hserve

# Clean build artifacts
hclean
```

---

## Manual Commands (if scripts unavailable)

```bash
# Build
cd .
hugo --minify --noBuildLock

# Dev server
cd .
hugo serve --bind 0.0.0.0 --noBuildLock

# Clean
cd .
rm -rf public resources .hugo_build.lock
```

---

## Why --noBuildLock?

Android/Termux filesystems don't support file locking. Without this flag, Hugo fails with:
```
Error: failed to acquire a build lock: Lock .hugo_build.lock: function not implemented
```

---

## Full Documentation

See `CLAUDE.md` in this directory for complete setup, deployment, and customization docs.

---

**Hugo Version**: v0.152.2+extended
**Live Site**: https://dgf-creations.com (when deployed)
