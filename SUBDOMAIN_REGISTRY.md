# Subdomain Registry

**Owner**: Sierra / DGF Creations
**Last Updated**: 2026-02-20
**Source of Truth**: This file. Update it every time a subdomain is added, changed, or retired.

---

## Registry

| Subdomain | Purpose | Repo | Deployment Method | Secrets Required | Owner | Status | Deletable |
|---|---|---|---|---|---|---|---|
| dgf-creations.com | Main portfolio site | dgf-creations-website | Cloudflare Pages (GitHub Actions) | CF API Token | Sierra | Production | No |
| www.dgf-creations.com | Redirect → root | dgf-creations-website | Cloudflare Pages (alias) | None | Sierra | Production | No |
| trd.dgf-creations.com | Time Recovery Demo (sales asset) | time-recovery-demo | Cloudflare Pages (Git OAuth) | None | Sierra | Production | No |
| miketune.dgf-creations.com | Client site — Mike's Welding | miketune-website | Cloudflare Pages | Verify in repo | Client | Production | No |
| notary.dgf-creations.com | Client site — DeGode Notary | degode-notary-site | Cloudflare Pages | Verify in repo | Client | Production | No |
| dev.dgf-creations.com | Staging environment | dgf-creations-website (branch) | Cloudflare Pages (branch deploy) | Same as main | Sierra | Staging | Yes |
| api.dgf-creations.com | Future API endpoint | TBD | TBD | TBD | Sierra | Reserved | Yes |
| assets.dgf-creations.com | Static CDN | TBD | TBD | TBD | Sierra | Reserved | Yes |
| docs.dgf-creations.com | Documentation | TBD | TBD | TBD | Sierra | Reserved | Yes |

---

## Rules

1. Every subdomain gets a row before it goes live — no exceptions.
2. Client subdomains get their own Pages projects. No shared builds.
3. All subdomains proxy through Cloudflare (orange cloud).
4. No subdomain goes live without HTTPS confirmed.
5. Secrets stay in GitHub repo settings or Cloudflare dashboard — never in this file.
6. "Deletable: No" means production traffic depends on it. Confirm cutover before removal.

---

## Verification Checklist (per subdomain)

- [ ] DNS CNAME confirmed in Cloudflare dashboard
- [ ] HTTPS certificate active (no browser warning)
- [ ] Cloudflare Pages deployment status: Active
- [ ] Custom domain added in Pages project settings
- [ ] Row added to this registry

---

## Related Files

- `CLOUDFLARE_PAGES_CONFIG.md` — build config, headers, redirects, ZDR compliance
- `cloudflare-dns-records.csv` — raw DNS export
- `.github/workflows/deploy.yml` — GitHub Actions deploy config (per repo)

---

**Next review**: When the next subdomain is added.
