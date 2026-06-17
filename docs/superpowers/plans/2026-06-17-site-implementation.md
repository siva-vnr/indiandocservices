# Indian Documentation Services — Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/Tamil) static marketing site for Indian Documentation Services Pte. Ltd., deployed to GitHub Pages via Next.js 14 static export.

**Architecture:** Single-page Next.js 14 app with `output: 'export'`. Language state (`'en' | 'ta'`) lives in `page.tsx` and flows down as a `lang` prop to all 8 section components. All strings live in `translations.ts` — no i18n library. GitHub Actions builds on push to `main` and deploys the `out/` folder via `actions/deploy-pages`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Google Fonts (Inter + Noto Sans Tamil), GitHub Actions

---

## File Map

| File | Role |
|------|------|
| `next.config.js` | `output: 'export'`, disable image optimization |
| `tailwind.config.ts` | Custom colors (navy, gold), font families |
| `src/app/globals.css` | Tailwind directives, smooth scroll |
| `src/app/layout.tsx` | Root layout, Google Fonts, viewport meta |
| `src/translations.ts` | All EN + TA strings, `Lang` type export |
| `src/app/page.tsx` | `useState` language state, assembles all sections |
| `src/components/Navbar.tsx` | Sticky nav, EN/தமிழ் toggle pill |
| `src/components/Hero.tsx` | Headline, subtext, WhatsApp + email CTAs |
| `src/components/Disclaimer.tsx` | Amber Indian-law-only banner |
| `src/components/WhoWeServe.tsx` | 4-card audience grid |
| `src/components/Services.tsx` | 10-card services grid |
| `src/components/Credentials.tsx` | 4 credential cards |
| `src/components/HowItWorks.tsx` | 3-step numbered process |
| `src/components/Footer.tsx` | Links, payment info, copyright |
| `public/CNAME` | Domain name for GitHub Pages |
| `.github/workflows/deploy.yml` | Build → deploy to gh-pages |

---

## Task 1: Scaffold Next.js 14 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Delete: `index.html` (replaced by Next.js)

- [ ] **Step 1: Scaffold the project**

Run from `/home/siva/siva/indiandocservices`:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

When prompted:
- "Would you like to use Turbopack?" → **No**
- Any other prompts → accept defaults

Expected: `node_modules/` installed, `package.json` created, `src/app/` structure created.

- [ ] **Step 2: Delete the old placeholder index.html**

```bash
rm index.html
```

- [ ] **Step 3: Move CNAME from root to public/**

```bash
mv CNAME public/CNAME
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: `ready - started server on http://localhost:3000`. Open browser and see the default Next.js page. Stop the server with Ctrl+C.

- [ ] **Step 5: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 with Tailwind"
```

---

## Task 2: Configure Next.js static export + Tailwind

**Files:**
- Modify: `next.config.js`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Configure next.config.js for static export**

Replace the entire contents of `next.config.js` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 2: Configure Tailwind with custom colors and fonts**

Replace the entire contents of `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B3A6B',
        gold: '#C9A84C',
        surface: '#F8F9FA',
        disclaimer: '#FEF3C7',
        'disclaimer-border': '#92400E',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        tamil: ['var(--font-noto-tamil)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Update globals.css**

Replace the entire contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-[#1A1A1A];
}
```

- [ ] **Step 4: Verify build succeeds**

```bash
npm run build
```

Expected: `out/` directory created, no errors. An `out/index.html` file should exist.

- [ ] **Step 5: Commit**

```bash
git add next.config.js tailwind.config.ts src/app/globals.css
git commit -m "feat: configure static export and Tailwind custom theme"
```

---

## Task 3: Write translations.ts

**Files:**
- Create: `src/translations.ts`

- [ ] **Step 1: Create the translations file**

Create `src/translations.ts` with this exact content:

```ts
export type Lang = 'en' | 'ta'

export const t = {
  en: {
    nav: {
      company: 'INDIAN DOCUMENTATION SERVICES PTE. LTD.',
      uen: 'UEN: 202502835H',
      companyShort: 'IDS Pte. Ltd.',
    },
    hero: {
      headline: 'Your Indian legal documentation partner in Singapore',
      subtext:
        'Serving NRIs, Persons of Indian Origin, and the Indian community in Singapore for all India-related legal, notarial, and documentation needs — under Indian law.',
      cta1: 'Book a consultation ↗',
      cta2: 'What do I need? ↗',
      whatsapp: 'https://wa.me/6500000000',
      email: 'mailto:info@indiandocumentationservices.com',
    },
    disclaimer: {
      label: 'Important:',
      text: 'Indian Documentation Services Pte. Ltd. provides legal services exclusively under Indian law. We do not advise on Singapore law matters. For Singapore legal matters, please consult a Singapore-qualified advocate and solicitor.',
    },
    whoWeServe: {
      title: 'WHO WE SERVE',
      cards: [
        {
          title: 'NRIs & PIOs in Singapore',
          desc: 'Indian nationals and persons of Indian origin needing India-side legal support',
        },
        {
          title: 'Singapore companies',
          desc: 'Businesses with India operations, contracts, or cross-border transactions',
        },
        {
          title: 'Property owners',
          desc: 'Individuals managing Indian property from Singapore — sale, purchase, inheritance',
        },
        {
          title: 'Tamil community',
          desc: "Bilingual service in English and Tamil for Singapore's Tamil-speaking community",
        },
      ],
    },
    services: {
      title: 'SERVICES — INDIAN LAW ONLY',
      subtext:
        'All services are rendered exclusively under Indian law and for use in India or with Indian authorities.',
      items: [
        {
          title: 'Power of Attorney',
          desc: 'Special and General POA for India property, banking, and family matters — notarised in Singapore',
        },
        {
          title: 'Notarisation & Apostille',
          desc: 'Singapore-executed documents notarised and Apostilled for submission in India',
        },
        {
          title: 'Legal heirship & succession',
          desc: 'Heirship certificates, succession affidavits, and estate documentation under Indian law',
        },
        {
          title: 'India property matters',
          desc: 'Due diligence, title verification, sale and purchase documentation for Indian properties',
        },
        {
          title: 'Statutory declarations',
          desc: 'For Indian consulate, Indian government submissions, and India-bound official use',
        },
        {
          title: 'India litigation support',
          desc: 'Cross-border support for Madras High Court, district courts, and India filings',
        },
        {
          title: 'NRI legal advisory',
          desc: 'Indian law guidance for Singapore-based NRIs on property, inheritance, and civil matters',
        },
        {
          title: 'Document legalisation',
          desc: 'Indian documents legalised for use in Singapore, UAE, Germany, and other countries',
        },
        {
          title: 'Name variation affidavits',
          desc: 'Statutory declarations resolving name discrepancies for Indian government and consular use',
        },
        {
          title: 'Tamil Nadu government liaison',
          desc: 'NRTWB, succession, property, and official matters with Tamil Nadu authorities',
        },
      ],
    },
    credentials: {
      title: 'CREDENTIALS',
      items: [
        {
          label: 'Advocate',
          value: 'Bar Council of Tamil Nadu & Puducherry',
          sub: 'Roll No. 134/2012',
        },
        { label: 'Court', value: 'Madras High Court practitioner', sub: '' },
        {
          label: 'Affiliation',
          value: 'WLAW LLC / South Asia Lex (SAL) Legal Services LLP',
          sub: '',
        },
        {
          label: 'Registered in Singapore',
          value: 'Registered Foreign Lawyer',
          sub: 'UEN: 202502835H',
        },
      ],
    },
    howItWorks: {
      title: 'HOW IT WORKS',
      steps: [
        {
          step: 'Step 1',
          title: 'Contact us',
          desc: 'Reach out by WhatsApp, email, or appointment — in English or Tamil',
        },
        {
          step: 'Step 2',
          title: 'Document review',
          desc: 'We review your matter, advise on requirements under Indian law, and provide a fee quote',
        },
        {
          step: 'Step 3',
          title: 'Execution & delivery',
          desc: 'Documents are prepared, notarised, Apostilled where required, and delivered or couriered to India',
        },
      ],
    },
    languages: {
      title: 'LANGUAGES',
      items: ['English', 'தமிழ் (Tamil)'],
    },
    footer: {
      company: 'Indian Documentation Services Pte. Ltd.',
      uen: 'UEN: 202502835H · Singapore',
      payment: 'Payment: PayNow / OCBC',
      nav: ['Services', 'About', 'Contact'],
      navAnchors: ['#services', '#about', '#contact'],
      whatsapp: 'WhatsApp enquiries welcome',
      copyright: '© 2025 Indian Documentation Services Pte. Ltd.',
    },
  },
  ta: {
    nav: {
      company: 'இந்திய ஆவண சேவைகள் பிரைவேட் லிமிடெட்',
      uen: 'UEN: 202502835H',
      companyShort: 'IDS Pte. Ltd.',
    },
    hero: {
      headline: 'சிங்கப்பூரில் உங்கள் இந்திய சட்ட ஆவண பங்காளி',
      subtext:
        'சிங்கப்பூரில் உள்ள NRI கள், இந்திய வம்சாவளியினர் மற்றும் இந்திய சமூகத்தினருக்கு அனைத்து இந்தியா தொடர்பான சட்ட, நோட்டரி மற்றும் ஆவண தேவைகளுக்காக — இந்திய சட்டத்தின் கீழ்.',
      cta1: 'ஆலோசனை பதிவு செய்யுங்கள் ↗',
      cta2: 'எனக்கு என்ன தேவை? ↗',
      whatsapp: 'https://wa.me/6500000000',
      email: 'mailto:info@indiandocumentationservices.com',
    },
    disclaimer: {
      label: 'முக்கியம்:',
      text: 'இந்திய ஆவண சேவைகள் பிரைவேட் லிமிடெட் இந்திய சட்டத்தின் கீழ் மட்டுமே சட்ட சேவைகளை வழங்குகிறது. சிங்கப்பூர் சட்ட விஷயங்களில் நாங்கள் ஆலோசனை வழங்குவதில்லை. சிங்கப்பூர் சட்ட விஷயங்களுக்கு, சிங்கப்பூர் தகுதிவாய்ந்த வழக்கறிஞரை அணுகவும்.',
    },
    whoWeServe: {
      title: 'நாங்கள் யாருக்கு சேவை செய்கிறோம்',
      cards: [
        {
          title: 'சிங்கப்பூரில் NRI மற்றும் PIO',
          desc: 'இந்திய வம்சாவளி நபர்கள் மற்றும் இந்திய தேசிகர்களுக்கு இந்தியா தொடர்பான சட்ட ஆதரவு',
        },
        {
          title: 'சிங்கப்பூர் நிறுவனங்கள்',
          desc: 'இந்தியாவில் செயல்பாடுகள், ஒப்பந்தங்கள் அல்லது கடல் கடந்த பரிவர்த்தனைகள் கொண்ட வணிகங்கள்',
        },
        {
          title: 'சொத்து உரிமையாளர்கள்',
          desc: 'சிங்கப்பூரிலிருந்து இந்திய சொத்துக்களை நிர்வகிக்கும் நபர்கள் — விற்பனை, கொள்முதல், மரபுரிமை',
        },
        {
          title: 'தமிழ் சமூகம்',
          desc: 'சிங்கப்பூரின் தமிழ் பேசும் சமூகத்திற்கு ஆங்கிலம் மற்றும் தமிழில் இருமொழி சேவை',
        },
      ],
    },
    services: {
      title: 'சேவைகள் — இந்திய சட்டம் மட்டும்',
      subtext:
        'அனைத்து சேவைகளும் இந்திய சட்டத்தின் கீழ் மட்டுமே மற்றும் இந்தியாவில் அல்லது இந்திய அதிகாரிகளுடன் பயன்பாட்டிற்கு வழங்கப்படுகின்றன.',
      items: [
        {
          title: 'பவர் ஆஃப் அட்டர்னி',
          desc: 'இந்தியாவில் சொத்து, வங்கி மற்றும் குடும்ப விஷயங்களுக்கான சிறப்பு மற்றும் பொது POA — சிங்கப்பூரில் நோட்டரி செய்யப்பட்டது',
        },
        {
          title: 'நோட்டரிசேஷன் & அப்போஸ்டில்',
          desc: 'சிங்கப்பூரில் செயல்படுத்தப்பட்ட ஆவணங்கள் இந்தியாவில் சமர்ப்பிக்க நோட்டரி மற்றும் அப்போஸ்டில் செய்யப்பட்டவை',
        },
        {
          title: 'சட்ட வாரிசு & வாரிசுரிமை',
          desc: 'இந்திய சட்டத்தின் கீழ் வாரிசு சான்றிதழ்கள், வாரிசு உறுதிமொழிகள் மற்றும் எஸ்டேட் ஆவணங்கள்',
        },
        {
          title: 'இந்தியா சொத்து விஷயங்கள்',
          desc: 'இந்திய சொத்துக்களுக்கான சரிபார்ப்பு, தலைப்பு சரிபார்ப்பு, விற்பனை மற்றும் கொள்முதல் ஆவணங்கள்',
        },
        {
          title: 'சட்டரீதியான அறிவிப்புகள்',
          desc: 'இந்திய தூதரகம், இந்திய அரசு சமர்ப்பணங்கள் மற்றும் இந்தியா-நோக்கிய அதிகாரப்பூர்வ பயன்பாட்டிற்காக',
        },
        {
          title: 'இந்தியா வழக்கு ஆதரவு',
          desc: 'மதராஸ் உயர் நீதிமன்றம், மாவட்ட நீதிமன்றங்கள் மற்றும் இந்திய தாக்கல்களுக்கான கடல் கடந்த ஆதரவு',
        },
        {
          title: 'NRI சட்ட ஆலோசனை',
          desc: 'சிங்கப்பூர் NRI களுக்கு சொத்து, மரபுரிமை மற்றும் சிவில் விஷயங்களில் இந்திய சட்ட வழிகாட்டுதல்',
        },
        {
          title: 'ஆவண சட்டப்பூர்வமாக்கல்',
          desc: 'சிங்கப்பூர், UAE, ஜெர்மனி மற்றும் பிற நாடுகளில் பயன்பாட்டிற்கு இந்திய ஆவணங்கள் சட்டப்பூர்வமாக்கல்',
        },
        {
          title: 'பெயர் மாறுபாடு உறுதிமொழிகள்',
          desc: 'இந்திய அரசு மற்றும் தூதரக பயன்பாட்டிற்கான பெயர் வேறுபாடுகளை தீர்க்கும் சட்டரீதியான அறிவிப்புகள்',
        },
        {
          title: 'தமிழ்நாடு அரசு தொடர்பு',
          desc: 'NRTWB, வாரிசுரிமை, சொத்து மற்றும் தமிழ்நாடு அதிகாரிகளுடன் அதிகாரப்பூர்வ விஷயங்கள்',
        },
      ],
    },
    credentials: {
      title: 'தகுதிகள்',
      items: [
        {
          label: 'வழக்கறிஞர்',
          value: 'தமிழ்நாடு மற்றும் புதுச்சேரி வழக்கறிஞர் கவுன்சில்',
          sub: 'ரோல் எண். 134/2012',
        },
        { label: 'நீதிமன்றம்', value: 'மதராஸ் உயர் நீதிமன்ற வழக்கறிஞர்', sub: '' },
        {
          label: 'இணைப்பு',
          value: 'WLAW LLC / South Asia Lex (SAL) Legal Services LLP',
          sub: '',
        },
        {
          label: 'சிங்கப்பூரில் பதிவு',
          value: 'பதிவு செய்யப்பட்ட வெளிநாட்டு வழக்கறிஞர்',
          sub: 'UEN: 202502835H',
        },
      ],
    },
    howItWorks: {
      title: 'செயல்முறை',
      steps: [
        {
          step: 'படி 1',
          title: 'தொடர்பு கொள்ளுங்கள்',
          desc: 'WhatsApp, மின்னஞ்சல் அல்லது நேரில் சந்திப்பு மூலம் தொடர்பு கொள்ளுங்கள் — ஆங்கிலம் அல்லது தமிழில்',
        },
        {
          step: 'படி 2',
          title: 'ஆவண ஆய்வு',
          desc: 'உங்கள் விஷயத்தை ஆய்வு செய்து, இந்திய சட்டத்தின் கீழ் தேவைகளை அறிவுறுத்தி, கட்டண மதிப்பீடு வழங்குவோம்',
        },
        {
          step: 'படி 3',
          title: 'செயல்படுத்தல் & வழங்கல்',
          desc: 'ஆவணங்கள் தயாரிக்கப்பட்டு, நோட்டரி செய்யப்பட்டு, தேவைப்பட்டால் அப்போஸ்டில் செய்யப்பட்டு, இந்தியாவிற்கு அனுப்பப்படும்',
        },
      ],
    },
    languages: {
      title: 'மொழிகள்',
      items: ['English', 'தமிழ் (Tamil)'],
    },
    footer: {
      company: 'இந்திய ஆவண சேவைகள் பிரைவேட் லிமிடெட்',
      uen: 'UEN: 202502835H · சிங்கப்பூர்',
      payment: 'கட்டணம்: PayNow / OCBC',
      nav: ['சேவைகள்', 'பற்றி', 'தொடர்பு'],
      navAnchors: ['#services', '#about', '#contact'],
      whatsapp: 'WhatsApp விசாரணைகள் வரவேற்கப்படுகின்றன',
      copyright: '© 2025 இந்திய ஆவண சேவைகள் பிரைவேட் லிமிடெட்',
    },
  },
} as const
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/translations.ts
git commit -m "feat: add EN and Tamil translations"
```

---

## Task 4: Root layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

Replace the entire contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Tamil } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Indian Documentation Services Pte. Ltd.',
  description:
    'Your Indian legal documentation partner in Singapore. Serving NRIs, PIOs, and the Indian community for India-related legal, notarial, and documentation needs under Indian law.',
  keywords: [
    'Indian documentation Singapore',
    'NRI legal services Singapore',
    'Power of Attorney Singapore',
    'Apostille Singapore',
    'Indian law Singapore',
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSansTamil.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: `out/index.html` generated, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure root layout with Google Fonts and metadata"
```

---

## Task 5: Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

Create `src/components/Navbar.tsx`:

```tsx
'use client'

import { Lang } from '../translations'

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xs font-semibold tracking-widest uppercase text-navy">
          <span className="hidden sm:inline">INDIAN DOCUMENTATION SERVICES PTE. LTD. · UEN: 202502835H</span>
          <span className="sm:hidden">IDS Pte. Ltd.</span>
        </div>

        <div className="flex rounded-full border border-navy overflow-hidden text-xs font-semibold">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'en' ? 'bg-navy text-white' : 'text-navy hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ta')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'ta' ? 'bg-navy text-white' : 'text-navy hover:bg-gray-100'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with language toggle"
```

---

## Task 6: Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

Create `src/components/Hero.tsx`:

```tsx
import { Lang, t } from '../translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const s = t[lang].hero

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
          {t[lang].nav.company} · {t[lang].nav.uen}
        </p>

        <h1
          className={`text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6 ${
            lang === 'ta' ? 'font-tamil' : ''
          }`}
        >
          {s.headline}
        </h1>

        <p
          className={`text-base sm:text-lg text-gray-600 leading-relaxed mb-10 ${
            lang === 'ta' ? 'font-tamil' : ''
          }`}
        >
          {s.subtext}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={s.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-navy text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-colors ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.cta1}
          </a>
          <a
            href={s.email}
            className={`inline-block border-2 border-navy text-navy px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-colors ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.cta2}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with WhatsApp and email CTAs"
```

---

## Task 7: Disclaimer component

**Files:**
- Create: `src/components/Disclaimer.tsx`

- [ ] **Step 1: Create Disclaimer.tsx**

Create `src/components/Disclaimer.tsx`:

```tsx
import { Lang, t } from '../translations'

interface DisclaimerProps {
  lang: Lang
}

export default function Disclaimer({ lang }: DisclaimerProps) {
  const s = t[lang].disclaimer

  return (
    <div className="bg-disclaimer border border-disclaimer-border px-4 py-4">
      <div className="max-w-5xl mx-auto">
        <p
          className={`text-sm text-amber-900 leading-relaxed ${
            lang === 'ta' ? 'font-tamil' : ''
          }`}
        >
          <span className="font-bold">{s.label}</span> {s.text}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Disclaimer.tsx
git commit -m "feat: add Disclaimer banner"
```

---

## Task 8: WhoWeServe component

**Files:**
- Create: `src/components/WhoWeServe.tsx`

- [ ] **Step 1: Create WhoWeServe.tsx**

Create `src/components/WhoWeServe.tsx`:

```tsx
import { Lang, t } from '../translations'

interface WhoWeServeProps {
  lang: Lang
}

export default function WhoWeServe({ lang }: WhoWeServeProps) {
  const s = t[lang].whoWeServe

  return (
    <section id="about" className="bg-surface py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-8">
          {s.title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.cards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <h3
                className={`font-semibold text-navy mb-2 ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-sm text-muted leading-relaxed ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WhoWeServe.tsx
git commit -m "feat: add Who We Serve section"
```

---

## Task 9: Services component

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create Services.tsx**

Create `src/components/Services.tsx`:

```tsx
import { Lang, t } from '../translations'

interface ServicesProps {
  lang: Lang
}

export default function Services({ lang }: ServicesProps) {
  const s = t[lang].services

  return (
    <section id="services" className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">
          {s.title}
        </p>
        <p
          className={`text-sm text-gray-600 mb-8 ${
            lang === 'ta' ? 'font-tamil' : ''
          }`}
        >
          {s.subtext}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-5"
            >
              <h3
                className={`font-semibold text-navy mb-2 ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm text-muted leading-relaxed ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: add Services section"
```

---

## Task 10: Credentials component

**Files:**
- Create: `src/components/Credentials.tsx`

- [ ] **Step 1: Create Credentials.tsx**

Create `src/components/Credentials.tsx`:

```tsx
import { Lang, t } from '../translations'

interface CredentialsProps {
  lang: Lang
}

export default function Credentials({ lang }: CredentialsProps) {
  const s = t[lang].credentials

  return (
    <section className="bg-surface py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-8">
          {s.title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {s.items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <p
                className={`text-xs uppercase tracking-widest text-muted mb-1 ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {item.label}
              </p>
              <p
                className={`font-semibold text-navy ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {item.value}
              </p>
              {item.sub && (
                <p
                  className={`text-sm text-muted mt-1 ${
                    lang === 'ta' ? 'font-tamil' : ''
                  }`}
                >
                  {item.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Credentials.tsx
git commit -m "feat: add Credentials section"
```

---

## Task 11: HowItWorks component

**Files:**
- Create: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks.tsx**

Create `src/components/HowItWorks.tsx`:

```tsx
import { Lang, t } from '../translations'

interface HowItWorksProps {
  lang: Lang
}

export default function HowItWorks({ lang }: HowItWorksProps) {
  const s = t[lang].howItWorks

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-8">
          {s.title}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.steps.map((step, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold mb-3 flex-shrink-0">
                {i + 1}
              </div>
              <p
                className={`text-xs uppercase tracking-widest text-muted mb-1 ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {step.step}
              </p>
              <h3
                className={`font-semibold text-navy mb-2 ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm text-muted leading-relaxed ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "feat: add How It Works section"
```

---

## Task 12: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

Create `src/components/Footer.tsx`:

```tsx
import { Lang, t } from '../translations'

interface FooterProps {
  lang: Lang
}

export default function Footer({ lang }: FooterProps) {
  const s = t[lang].footer
  const hero = t[lang].hero

  return (
    <footer id="contact" className="bg-surface border-t border-gray-200 pt-10 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <p
              className={`font-semibold text-navy text-sm mb-1 ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.company}
            </p>
            <p className="text-xs text-muted">{s.uen}</p>
            <p
              className={`text-xs text-muted mt-1 ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.payment}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            {s.nav.map((label, i) => (
              <a
                key={i}
                href={s.navAnchors[i]}
                className={`text-sm text-navy hover:underline ${
                  lang === 'ta' ? 'font-tamil' : ''
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div>
            <a
              href={hero.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm text-navy hover:underline ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.whatsapp}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p
            className={`text-xs text-muted text-center ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with WhatsApp and nav links"
```

---

## Task 13: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with assembled page**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
'use client'

import { useState } from 'react'
import { Lang, t } from '../translations'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Disclaimer from '../components/Disclaimer'
import WhoWeServe from '../components/WhoWeServe'
import Services from '../components/Services'
import Credentials from '../components/Credentials'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const s = t[lang].languages

  return (
    <main>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Disclaimer lang={lang} />
      <WhoWeServe lang={lang} />
      <Services lang={lang} />
      <Credentials lang={lang} />
      <HowItWorks lang={lang} />

      <section className="bg-surface py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
            {s.title}
          </p>
          <div className="flex gap-3">
            {s.items.map((item, i) => (
              <span
                key={i}
                className="border border-gray-300 rounded-full px-4 py-1.5 text-sm text-navy font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- All 9 sections render
- Language toggle switches all text to Tamil and back
- "Book a consultation" link starts with `https://wa.me/`
- "What do I need?" link starts with `mailto:`
- Site is mobile-friendly (resize browser window)

Stop server with Ctrl+C.

- [ ] **Step 4: Production build check**

```bash
npm run build
```

Expected: `out/` folder generated, no build errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full single-page site with language toggle"
```

---

## Task 14: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow directory and file**

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the CNAME is in public/**

```bash
cat public/CNAME
```

Expected output: `indiandocumentationservices.com`

If missing, run:
```bash
echo "indiandocumentationservices.com" > public/CNAME
```

- [ ] **Step 3: Commit and push**

```bash
git add .github/workflows/deploy.yml public/CNAME
git commit -m "feat: add GitHub Actions deploy workflow for GitHub Pages"
git push origin main
```

- [ ] **Step 4: Verify GitHub Actions runs**

Go to `https://github.com/siva-vnr/indiandocservices/actions`. The "Deploy to GitHub Pages" workflow should appear and run. Wait for both `build` and `deploy` jobs to show green checkmarks.

If the deploy job fails with "Pages not configured", go to:
**Settings → Pages → Source** and set it to **"GitHub Actions"** (not "Deploy from a branch").

---

## Task 15: Final verification

- [ ] **Step 1: Confirm GitHub Pages URL works**

After the Actions workflow succeeds, open `https://indiandocumentationservices.com` (once DNS propagates) or `https://siva-vnr.github.io/indiandocservices` immediately.

Verify:
- [ ] Page loads with all 9 sections
- [ ] Language toggle works (EN ↔ தமிழ்)
- [ ] "Book a consultation" opens WhatsApp on mobile
- [ ] "What do I need?" opens email client
- [ ] Footer WhatsApp link works
- [ ] No layout breaks on mobile (375px wide)
- [ ] CNAME file is present in the deployed site (open DevTools → Network, check for 404s)

- [ ] **Step 2: Update contact placeholders when ready**

When real WhatsApp and email are available, update these two lines in `src/translations.ts`:

```ts
// In both en.hero and ta.hero — same values for both languages:
whatsapp: 'https://wa.me/YOUR_SINGAPORE_NUMBER',  // e.g. https://wa.me/6591234567
email: 'mailto:your@email.com',
```

Then run `git add src/translations.ts && git commit -m "chore: update contact details" && git push origin main` — GitHub Actions will redeploy automatically.
