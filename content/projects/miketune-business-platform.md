---
title: "Mobile Service Business Platform"
description: "Full-stack web platform for mobile welding & handyman service. Client portal, payments, project tracking - architected for scale."
date: 2024-12-04
tags: ["web-app", "react", "typescript", "supabase", "stripe", "cloudflare"]
weight: 6
---

# Mobile Service Business Platform 🔧

**Modern web platform for mobile service businesses with client accounts, payment processing, and project management**

## What It Is

A full-featured business web application designed for mobile welding and handyman services. Starts as a professional static site, evolves into a complete platform with client accounts, online payments, project tracking, and automated invoicing.

**Live Demo**: [miketune.dgf-creations.com](https://miketune.dgf-creations.com)

## Phase 1: Static Website (Live)

**Current Features**:
- Professional responsive design (mobile-first)
- Service showcase with portfolio gallery
- Contact/service request forms
- Fast page loads (<2 seconds)
- SEO-optimized structure
- Automated CI/CD deployment

## Phase 2: Full Platform (Architecture Ready)

**Client Portal**:
- Account creation and authentication (passwordless magic links)
- Service request submission with real-time status
- Project tracking with before/after photo galleries
- Invoice viewing and online payment
- Direct messaging with service provider

**Admin Dashboard**:
- Service request management and quote generation
- Project creation and status updates
- Photo upload for customer galleries
- Invoice generation with line items
- Payment tracking and receipts

**Database Design** (Production-Ready):
- 8 tables with complete Row-Level Security (RLS)
- User profiles with role-based access
- Service requests → Quotes → Projects → Invoices workflow
- Payment records linked to Stripe
- Photo storage with metadata

## Technical Architecture

**Stack**:
- **Frontend**: React 19 + TypeScript 5.8 + Vite 6.2
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (Checkout + Invoicing)
- **Email**: Resend API
- **Hosting**: Cloudflare Pages (global CDN)
- **CI/CD**: GitHub Actions (automated deployment)
- **Testing**: Vitest + Playwright

**Security Features**:
- Passwordless authentication (magic link emails)
- Row-Level Security on all database tables
- Encrypted API keys (GitHub Secrets)
- HTTPS everywhere (Cloudflare)
- Input validation (Zod schemas)
- Rate limiting on API endpoints
- Automated daily backups

## Implementation Highlights

**Deployment Automation**:
- Push-to-production workflow via GitHub Actions
- Build caching for faster CI/CD (~2 minutes)
- Concurrency control (cancel in-progress builds)
- Deployment status reporting

**Development Environment**:
- TypeScript path aliases for clean imports
- Code-splitting for optimized bundle sizes
- Testing setup (unit + E2E + coverage)
- Modular folder structure for scalability

**Documentation Package**:
Created comprehensive handoff documentation:
- Business Owner Guide (simple, non-technical)
- AI Agent Implementation Guide (step-by-step)
- Database Schema (complete SQL with RLS)
- Master Implementation Plan (5-phase rollout)
- Quick Start Summary (one-page reference)

## Technical Challenges

**Android Development**: Resolved npm symlink issues on Android/Termux by maintaining dual locations (external for sync, internal for development)

**Cloudflare API**: Implemented dedicated API token with minimal permissions (least privilege principle)

**GitHub Actions**: Debugged deployment permissions by adding explicit `deployments: write` permission to workflow

## Phased Rollout Strategy

**Week 1**: Foundation (Database + Auth)
**Week 2**: Client Portal (Service requests + Project viewing)
**Week 3**: Payments (Stripe + Invoicing)
**Week 4**: Admin Dashboard (Management interface)
**Week 5**: Testing & Launch (QA + Optimization)

**Total Estimate**: 45-70 hours for complete implementation

## Key Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Database | Supabase | Free tier, built-in auth, real-time updates, managed backups |
| Payments | Stripe | Industry standard, PCI Level 1 compliant, excellent docs |
| Email | Resend | Developer-friendly API, reliable delivery |
| Hosting | Cloudflare Pages | Free, global CDN, automatic HTTPS, GitHub integration |
| Testing | Vitest + Playwright | Fast unit tests, comprehensive E2E coverage |

## Cost Analysis

**Development**: ~70 hours (includes Phase 1 + documentation)
**Monthly Operations**: $0-$50/month + transaction fees
- Cloudflare Pages: $0 (free tier)
- Supabase: $0-$25/month (starts free)
- Resend: $0-$20/month (starts free)
- Stripe: 2.9% + $0.30 per successful payment

## Success Metrics

**Technical KPIs**:
- ✅ Deployment automation: 100% success rate
- ✅ Page load time: <2 seconds (Lighthouse >90)
- ✅ Uptime: 99.9% (Cloudflare SLA)
- ✅ Mobile responsiveness: Full feature parity

**Business KPIs** (Phase 2 Targets):
- 📊 Quote response time: <24 hours
- 📊 Payment success rate: >95%
- 📊 Customer satisfaction tracking

## Deliverables

**Phase 1** (Complete):
- ✅ Live website with custom subdomain
- ✅ Private GitHub repository
- ✅ Automated CI/CD pipeline
- ✅ Responsive design (mobile + desktop)

**Documentation** (Complete):
- ✅ Master Implementation Plan
- ✅ Business Owner Setup Guide
- ✅ AI Agent Implementation Guide
- ✅ Complete Database Schema (8 tables, SQL, RLS)
- ✅ Quick Start Summary

**Phase 2** (Architecture Ready):
- 📋 Supabase integration guide
- 📋 Stripe payment implementation
- 📋 Admin dashboard specification
- 📋 Testing strategy
- 📋 Security model documentation

## Future Enhancements

**Near-Term** (Phase 2):
- Functional service requests with notifications
- Client portal with real-time project tracking
- Online invoicing and payment processing
- Admin dashboard for business management

**Long-Term** (Phase 3+):
- Appointment scheduling system
- SMS notifications (Twilio)
- Accounting software integration (QuickBooks)
- Multi-location support
- Mobile app (React Native)

## Technologies Demonstrated

- React 19 with modern hooks and Suspense
- TypeScript 5.8 with advanced types
- Supabase Row-Level Security (RLS)
- Stripe payment integration design
- GitHub Actions CI/CD automation
- Cloudflare Pages deployment
- Comprehensive documentation for dual audiences

## Project Impact

**For the Business**:
- Professional online presence increases credibility
- Automated workflows reduce manual overhead
- Scalable architecture grows with business
- Predictable costs with pay-as-you-grow model

**For Development**:
- Clear implementation roadmap reduces uncertainty
- Production-ready database schema prevents technical debt
- Modular architecture supports incremental features
- Comprehensive testing ensures quality at every phase

## Design Philosophy

1. **Start Simple, Scale Smart**: Static site first, add complexity only when needed
2. **Security-First**: RLS, encryption, validation from day one
3. **Minimal Maintenance**: Automated monitoring, quarterly upkeep only
4. **Cost-Effective**: $0/month start, scales with business growth
5. **Developer Experience**: Type safety, documentation, automated testing

---

*Status: Phase 1 Live ✅ | Phase 2 Architecture Complete ✅ | Ready for Implementation*

**Key Technologies**: React 19 • TypeScript 5.8 • Vite 6.2 • Supabase • Stripe • Cloudflare Pages • GitHub Actions
