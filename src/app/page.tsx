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
