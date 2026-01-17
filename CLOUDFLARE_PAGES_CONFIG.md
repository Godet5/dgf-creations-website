# Cloudflare Pages Configuration

**Last Updated**: 2025-12-07
**Deployment Method**: GitHub Actions → Cloudflare Pages API

---

## Project: dgf-creations (Main Site)

### Build Configuration

**Framework**: Hugo
**Build command**: `hugo --minify --noBuildLock`
**Build output directory**: `public`
**Root directory**: `/`
**Node version**: Latest LTS (20.x)

### Environment Variables

```bash
# None required for basic Hugo build
# Add if needed:
# HUGO_VERSION=0.152.2
# NODE_VERSION=20
```

### Custom Domains

**Primary**: dgf-creations.com
**Aliases**: www.dgf-creations.com

**DNS Configuration** (see cloudflare-dns-records.csv):
- A @ → 172.67.138.76 (proxied)
- A @ → 104.21.46.117 (proxied)
- CNAME www → dgf-creations.pages.dev (proxied)

### Branch Deployments

| Branch | URL | Purpose |
|--------|-----|---------|
| master | dgf-creations.com | Production |
| master | dgf-creations.pages.dev | Cloudflare default |
| feature/* | [branch].dgf-creations.pages.dev | Preview deployments |

### Headers & Redirects

**_headers** (create in `/static/_headers`):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;

/public/*
  Cache-Control: public, max-age=31536000, immutable

/static/*
  Cache-Control: public, max-age=31536000, immutable
```

**_redirects** (create in `/static/_redirects`):
```
# Force HTTPS
http://dgf-creations.com/* https://dgf-creations.com/:splat 301!

# www → root
https://www.dgf-creations.com/* https://dgf-creations.com/:splat 301!

# Old URLs (if any migrations needed)
# /old-path /new-path 301
```

---

## Project: miketune (Client Site)

**Recommendation**: Create separate Pages project for clean separation

### Build Configuration

**Framework**: React + Vite
**Build command**: `npm run build`
**Build output directory**: `dist`
**Root directory**: `/`
**Node version**: 20.x

### Custom Domains

**Primary**: miketune.dgf-creations.com
**Fallback**: miketune.pages.dev

**DNS Configuration**:
- CNAME miketune → miketune.pages.dev (proxied)

### Repository

**Current**: Likely in separate repo (verify)
**Recommended structure**:
```
Godet5/
├── dgf-creations-website (Hugo - main portfolio)
└── miketune-platform (React - client site)
```

---

## Subdomain Governance Structure

**Master Record** (enforce this structure):

| Subdomain | Purpose | Pages Project | Repository | Owner |
|-----------|---------|---------------|------------|-------|
| @ (root) | Main portfolio | dgf-creations | dgf-creations-website | DGF |
| www | Redirect to root | dgf-creations | dgf-creations-website | DGF |
| miketune | Client: Mike's Welding | miketune | miketune-platform | Client |
| notary | Client: DeGode Notary | degode-notary-site | degode-notary-site | Client |
| dev | Staging environment | dgf-creations-dev | dgf-creations-website (branch) | DGF |
| api | Future API endpoint | (TBD) | (TBD) | DGF |
| assets | Static CDN | (TBD) | (TBD) | DGF |
| docs | Documentation | (TBD) | (TBD) | DGF |

**Rules**:
1. Client subdomains get their own Pages projects (no shared builds)
2. Dev/staging environments use branch deployments from main project
3. All subdomains proxy through Cloudflare (orange cloud)
4. No naked subdomains without HTTPS
5. Each project has dedicated GitHub repo (no monorepo sprawl)

---

## GitHub Actions Workflow (Current)

**File**: `.github/workflows/deploy.yml`

**Current configuration**:
```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true
      - run: hugo --minify
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: dgf-creations
          directory: public
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

**Status**: ✅ Working (31s avg deploy time)

---

## Deployment Verification Checklist

After DNS configuration:

### Immediate Checks (0-5 minutes)
- [ ] `curl -I https://dgf-creations.com` returns 200
- [ ] `curl -I https://www.dgf-creations.com` redirects to root
- [ ] Browser loads dgf-creations.com without errors
- [ ] HTTPS certificate valid (green padlock)
- [ ] Cloudflare analytics shows traffic on primary domain

### Content Verification (5-10 minutes)
- [ ] Homepage shows "Production-ready platforms" hero
- [ ] Recent Client Work section visible
- [ ] MikeTune case study renders correctly
- [ ] All 6 project pages load
- [ ] Contact form accessible
- [ ] Static assets load (CSS, JS, images)

### Technical Validation (10-30 minutes)
- [ ] DNS propagation complete (use https://dnschecker.org)
- [ ] Sitemap accessible: /sitemap.xml
- [ ] Robots.txt exists: /robots.txt
- [ ] Security headers present (check Network tab)
- [ ] Cache headers correct (check DevTools)
- [ ] No mixed content warnings
- [ ] No console errors

### Build System (Ongoing)
- [ ] GitHub Actions runs successfully on push
- [ ] Build logs show no warnings
- [ ] Deploy completes in <60s
- [ ] Preview deployments work for feature branches
- [ ] Secrets configured: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID

### SEO & Discovery (1-7 days)
- [ ] Submit to Google Search Console
- [ ] Submit sitemap to Google
- [ ] Verify robots.txt allows crawling
- [ ] Check indexed pages: `site:dgf-creations.com`
- [ ] Verify meta descriptions render
- [ ] OpenGraph tags present for social sharing

---

## Zero-Downtime Routing (ZDR) Compliance

**Current Status**: ❌ VIOLATED
- Primary domain unreachable = 100% downtime
- Fallback (.pages.dev) works but unprofessional

**ZDR Requirements**:
1. **Dual routing**: Both root and www resolve
2. **Atomic deploys**: No half-built pages served
3. **Rollback ready**: Can revert to previous build instantly
4. **Health checks**: Automated monitoring (not yet implemented)
5. **Failover**: Multiple A records for redundancy

**After DNS Fix**:
- ✅ Cloudflare Pages provides atomic deploys
- ✅ Multiple A records configured
- ❌ Missing: Uptime monitoring (add UptimeRobot or similar)
- ❌ Missing: Automated rollback on build failure

**Recommended Addition** to GitHub workflow:
```yaml
- name: Smoke test deployment
  run: |
    sleep 30  # Wait for propagation
    curl -f https://dgf-creations.com || exit 1
    curl -f https://dgf-creations.com/projects/hbc-platform || exit 1
```

---

## Troubleshooting Common Issues

### "ERR_TUNNEL_CONNECTION_FAILED"
**Cause**: DNS records missing or incorrect
**Fix**: Verify CNAME/A records in Cloudflare DNS tab
**Test**: `curl -I https://dgf-creations.com`

### "NET::ERR_CERT_AUTHORITY_INVALID"
**Cause**: SSL certificate not provisioned
**Fix**: Wait 10-15 minutes, Cloudflare auto-provisions
**Test**: Check certificate in browser DevTools

### "This site can't be reached"
**Cause**: DNS not propagated or incorrect nameservers
**Fix**: Verify nameservers point to Cloudflare
**Test**: `nslookup dgf-creations.com 8.8.8.8`

### "Mixed content warnings"
**Cause**: HTTP resources loaded on HTTPS page
**Fix**: Update URLs to use HTTPS or protocol-relative (//)
**Test**: Browser console errors

### "Build failed" in GitHub Actions
**Cause**: Hugo module issues or missing dependencies
**Fix**: Check build logs, verify Hugo version
**Test**: Run `hugo --minify --noBuildLock` locally

---

## Future Enhancements

**Short-term** (next 2 weeks):
1. Add uptime monitoring (UptimeRobot, Pingdom, or Cloudflare Health Checks)
2. Configure email routing (@dgf-creations.com addresses)
3. Set up Google Analytics or privacy-focused alternative (Plausible, Fathom)
4. Create sitemap.xml generator in Hugo config
5. Add RSS feed for blog/journal section

**Medium-term** (next month):
6. Implement proper robots.txt with sitemap reference
7. Add structured data (JSON-LD) for rich snippets
8. Configure Cloudflare Web Analytics
9. Set up automated backups (Cloudflare already does this, verify)
10. Create staging environment on dev.dgf-creations.com

**Long-term** (next quarter):
11. Implement A/B testing for homepage CTA
12. Add newsletter signup integration
13. Create automated screenshot testing (Percy, Chromatic)
14. Set up performance budgets in Lighthouse CI
15. Implement progressive image loading

---

## Related Documentation

- **Audit**: DOMAIN_INFRASTRUCTURE_AUDIT_20251207.md
- **DNS Import**: cloudflare-dns-records.csv (this directory)
- **Deployment Workflow**: .github/workflows/deploy.yml
- **Hugo Config**: config.toml or hugo.toml
- **Handoff**: ~/.dgf/handoffs/HANDOFF_DOMAIN_AUDIT_20251207.md

---

**Configuration Version**: v1.0
**Last Verified**: 2025-12-07
**Next Review**: After DNS configuration applied

---

END CONFIGURATION
