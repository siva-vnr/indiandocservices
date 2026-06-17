# Indian Documentation Services — Site Design Spec

**Date:** 2026-06-17
**Domain:** indiandocumentationservices.com
**Repo:** github.com/siva-vnr/indiandocservices

---

## Overview

A bilingual (English / Tamil) static marketing site for Indian Documentation Services Pte. Ltd., a Singapore-based legal documentation firm serving NRIs and the Indian community. Deployed on GitHub Pages via Next.js static export.

---

## Tech Stack

| Tool | Version / Config |
|------|-----------------|
| Next.js | 14+ with `output: 'export'` in `next.config.js` |
| Tailwind CSS | v3 |
| TypeScript | Yes |
| Fonts | Inter (EN), Noto Sans Tamil (TA) via Google Fonts |
| Deployment | GitHub Actions → `gh-pages` branch → GitHub Pages |

---

## Architecture

### Project Structure

```
indiandocservices/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata, viewport
│   │   └── page.tsx            # Single page, language state, all sections
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky nav with language toggle
│   │   ├── Hero.tsx            # Headline, subtext, CTA buttons
│   │   ├── Disclaimer.tsx      # Amber Indian-law-only banner
│   │   ├── WhoWeServe.tsx      # 4-card audience grid
│   │   ├── Services.tsx        # 10-card services grid
│   │   ├── Credentials.tsx     # 4 credential cards
│   │   ├── HowItWorks.tsx      # 3-step process
│   │   └── Footer.tsx          # Links, payment, copyright
│   └── translations.ts         # All EN + TA strings
├── public/
│   └── CNAME                   # indiandocumentationservices.com
├── next.config.js
├── tailwind.config.ts
└── .github/
    └── workflows/
        └── deploy.yml          # Build + deploy to gh-pages
```

### Language Architecture

- `page.tsx` holds `const [lang, setLang] = useState<'en' | 'ta'>('en')`
- All components receive `lang` as a prop
- `translations.ts` exports a single object:
  ```ts
  export const t = {
    en: { hero: { headline: '...' }, ... },
    ta: { hero: { headline: '...' }, ... },
  }
  ```
- Components consume: `t[lang].sectionName.key`
- No external i18n library

---

## Color Palette

| Role | Hex |
|------|-----|
| Primary (navy) | `#1B3A6B` |
| Accent (gold) | `#C9A84C` |
| Background | `#FFFFFF` |
| Surface | `#F8F9FA` |
| Disclaimer bg | `#FEF3C7` |
| Disclaimer border | `#92400E` |
| Body text | `#1A1A1A` |
| Muted text | `#6B7280` |

---

## Page Sections

All sections exist on a single scrollable page. Nav links use smooth-scroll anchors.

### 1. Navbar
- Left: "INDIAN DOCUMENTATION SERVICES PTE. LTD. · UEN: 202502835H" (small caps)
- Right: Language toggle pill — `EN | தமிழ்`, active side highlighted in navy
- Sticky on scroll, white background with bottom border
- Mobile: company name truncated to "IDS Pte. Ltd."

### 2. Hero
- Headline: "Your Indian legal documentation partner in Singapore"
- Subtext: Serving NRIs, Persons of Indian Origin, and the Indian community in Singapore for all India-related legal, notarial, and documentation needs — under Indian law.
- Two CTA buttons (full-width stacked on mobile, inline on desktop):
  - **"Book a consultation ↗"** → `https://wa.me/6500000000` (WhatsApp placeholder)
  - **"What do I need? ↗"** → `mailto:info@indiandocumentationservices.com` (placeholder)
- Primary button: navy fill; Secondary button: navy outline

### 3. Disclaimer Banner
- Amber background (`#FEF3C7`), amber-brown border and text
- Text: "**Important:** Indian Documentation Services Pte. Ltd. provides legal services exclusively under Indian law. We do not advise on Singapore law matters. For Singapore legal matters, please consult a Singapore-qualified advocate and solicitor."

### 4. Who We Serve
- Section label: "WHO WE SERVE"
- 4 cards, grid: 1 col mobile → 2 col tablet → 4 col desktop
  1. **NRIs & PIOs in Singapore** — Indian nationals and persons of Indian origin needing India-side legal support
  2. **Singapore companies** — Businesses with India operations, contracts, or cross-border transactions
  3. **Property owners** — Individuals managing Indian property from Singapore — sale, purchase, inheritance
  4. **Tamil community** — Bilingual service in English and Tamil for Singapore's Tamil-speaking community

### 5. Services — Indian Law Only
- Section label: "SERVICES — INDIAN LAW ONLY"
- Subtext: "All services are rendered exclusively under Indian law and for use in India or with Indian authorities."
- 10 cards, grid: 1 col mobile → 2 col tablet → 3 col desktop
  1. Power of Attorney
  2. Notarisation & Apostille
  3. Legal heirship & succession
  4. India property matters
  5. Statutory declarations
  6. India litigation support
  7. NRI legal advisory
  8. Document legalisation
  9. Name variation affidavits
  10. Tamil Nadu government liaison
- Each card: title + short description

### 6. Credentials
- Section label: "CREDENTIALS"
- 4 cards in 2×2 grid (1 col mobile):
  1. **Advocate** — Bar Council of Tamil Nadu & Puducherry · Roll No. 134/2012
  2. **Court** — Madras High Court practitioner
  3. **Affiliation** — WLAW LLC / South Asia Lex (SAL) Legal Services LLP
  4. **Registered in Singapore** — Registered Foreign Lawyer · UEN: 202502835H

### 7. How It Works
- Section label: "HOW IT WORKS"
- 3 steps, vertical on mobile → horizontal on desktop:
  1. **Contact us** — Reach out by WhatsApp, email, or appointment — in English or Tamil
  2. **Document review** — We review your matter, advise on requirements under Indian law, and provide a fee quote
  3. **Execution & delivery** — Documents are prepared, notarised, Apostilled where required, and delivered or couriered to India

### 8. Languages
- Simple row: `English   தமிழ் (Tamil)`
- Pill badges, understated

### 9. Footer
- Left: Company name, UEN, Singapore · Payment: PayNow / OCBC
- Center: Services · About · Contact (anchor links)
- Right: "WhatsApp enquiries welcome" + wa.me link
- Bottom: © 2025 Indian Documentation Services Pte. Ltd.

---

## Contact Placeholders

| Channel | Placeholder |
|---------|------------|
| WhatsApp | `https://wa.me/6500000000` |
| Email | `mailto:info@indiandocumentationservices.com` |

Replace both in `translations.ts` when real details are confirmed.

---

## Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```
Trigger: push to main
Steps:
  1. Checkout
  2. Setup Node 20
  3. npm ci
  4. npm run build  (next build → out/)
  5. Upload out/ as Pages artifact
  6. Deploy to GitHub Pages
```

Uses the official `actions/deploy-pages` action. The existing `CNAME` file must be copied into `public/` so Next.js includes it in the `out/` export.

---

## Responsive Breakpoints (Tailwind defaults)

| Breakpoint | Min-width | Usage |
|-----------|-----------|-------|
| (default) | 0px | Mobile single-column |
| `sm` | 640px | 2-col grids begin |
| `md` | 768px | Horizontal How It Works |
| `lg` | 1024px | 3-col services grid, 4-col Who We Serve |

---

## Out of Scope

- Backend / contact form (no server)
- Blog or CMS
- Analytics (can be added later via script tag)
- Authentication
