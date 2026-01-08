# DNS Configuration - Revenue Blocker Removal

**Status**: Infrastructure deployed, domain unreachable
**Blocker**: Missing DNS records in Cloudflare
**Time to fix**: 5 minutes
**Impact**: Enables dgf-creations.com → immediate client access

---

## Current Status

✅ **Working**:
- Pages deployment: https://dgf-creations.pages.dev (200 OK)
- Security headers: CSP, HSTS, Permissions-Policy active
- Client site: miketune.dgf-creations.com (resolves correctly)

❌ **Broken**:
- Primary domain: https://dgf-creations.com (522 error)
- Root cause: No A or CNAME records pointing to Cloudflare Pages

---

## Fix Steps (5 minutes)

### Option 1: Auto-Configure via Custom Domain (RECOMMENDED)

**Fastest method** - Cloudflare auto-creates DNS records

1. Open: https://dash.cloudflare.com
2. Navigate: **Workers & Pages** → **dgf-creations** (project)
3. Click: **Custom domains** tab
4. Look for `dgf-creations.com` in the list

**If NOT listed**:
- Click **"Set up a custom domain"**
- Enter: `dgf-creations.com`
- Click **"Continue"**
- Cloudflare auto-creates DNS records
- Click **"Activate domain"**
- Wait 2-5 minutes for propagation

**If already listed but showing error**:
- Note the error message
- Click domain → "Remove" → Re-add it
- Or proceed to Option 2 (manual DNS)

---

### Option 2: Manual DNS Records (If Option 1 Fails)

**Direct DNS management**

1. Open: https://dash.cloudflare.com
2. Select: **dgf-creations.com** domain
3. Click: **DNS** → **Records**
4. Add these records:

**Record 1 - Root domain**:
```
Type: CNAME
Name: @ (or dgf-creations.com)
Target: dgf-creations.pages.dev
Proxy: ON (orange cloud)
TTL: Auto
```

**Record 2 - WWW subdomain** (recommended):
```
Type: CNAME
Name: www
Target: dgf-creations.pages.dev
Proxy: ON (orange cloud)
TTL: Auto
```

**Note**: Some DNS systems don't allow CNAME on root (@). If you get an error, use A records instead:

**Alternative - A Records**:
```
Type: A
Name: @
IPv4 address: 172.67.138.76
Proxy: ON
TTL: Auto

(Add second A record)
Type: A
Name: @
IPv4 address: 104.21.46.117
Proxy: ON
TTL: Auto
```

---

## Verification (2-5 minutes after setup)

**Test 1 - Browser**:
```bash
# Open in incognito/private mode (avoid cache)
https://dgf-creations.com
```

**Expected**: Site loads with professional positioning, MikeTune case study

**Test 2 - Command line**:
```bash
curl -I https://dgf-creations.com
```

**Expected**: HTTP 200, security headers present

**Test 3 - DNS checker**:
```
https://dnschecker.org
Enter: dgf-creations.com
```

**Expected**: DNS resolves to Cloudflare IPs globally

---

## Troubleshooting

### Issue: "CNAME not allowed on root domain"
**Fix**: Use A records (172.67.138.76, 104.21.46.117) instead

### Issue: SSL certificate error
**Fix**: Wait 10-15 minutes - Cloudflare auto-provisions SSL

### Issue: Still shows 522 error
**Check**:
1. DNS records saved and proxied (orange cloud ON)
2. Custom domain added in Workers & Pages
3. Wait full 5 minutes for propagation

### Issue: www doesn't redirect
**Fix**: Ensure _redirects file is deployed (already committed)

---

## Post-Configuration Checklist

After DNS resolves:

- [ ] dgf-creations.com loads in browser (no 522 error)
- [ ] HTTPS certificate valid (green padlock)
- [ ] www.dgf-creations.com redirects to root
- [ ] Security headers visible (test: securityheaders.com)
- [ ] Homepage shows "Production-ready platforms" text
- [ ] MikeTune case study visible
- [ ] CTA and email present
- [ ] All 6 project pages accessible

---

## What Happens After DNS Works

**Immediate benefits**:
1. Professional domain accessible to clients
2. Email signatures/business cards no longer broken
3. Search engines can index site
4. Revenue blocker removed - can start outreach
5. Cloudflare analytics tracks primary domain traffic

**Next steps** (not urgent):
1. Set up uptime monitoring (UptimeRobot)
2. Configure Cloudflare health checks
3. Submit sitemap to Google Search Console
4. Test all links and forms

---

## Reference

**DNS Records CSV**: `cloudflare-dns-records.csv` (import template)
**Audit Report**: `DOMAIN_INFRASTRUCTURE_AUDIT_20251207.md` (full analysis)
**Cloudflare Account**: c5c69c404b4fd62a72e536bbd0b5ae1c
**Zone ID**: 11689daf9f019d04ff48cf9d4df828fb

---

**Status**: Waiting for DNS configuration
**Next action**: User accesses Cloudflare dashboard and follows Option 1 or 2
**Time estimate**: 5 minutes active work + 5 minutes propagation
