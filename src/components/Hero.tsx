import Image from 'next/image'
import { Lang, t } from '../translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const s = t[lang].hero

  return (
    <section className="bg-navy py-16 px-4 border-b-4 border-[#C4863A]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4863A] mb-4">
            {t[lang].nav.company} · {t[lang].nav.uen}
          </p>
          <h1
            className={`text-3xl sm:text-4xl font-bold text-white leading-tight mb-6 ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.headline}
          </h1>
          <p
            className={`text-base sm:text-lg text-green-100 leading-relaxed mb-10 ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href={s.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block bg-[#C4863A] text-white px-6 py-3 rounded font-semibold hover:bg-[#b07530] transition-colors ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.cta1}
            </a>
            <a
              href={s.email}
              className={`inline-block border-2 border-[#C4863A] text-[#C4863A] px-6 py-3 rounded font-semibold hover:bg-[#C4863A]/10 transition-colors ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.cta2}
            </a>
          </div>
        </div>

        {/* Lady Justice statue */}
        <div className="flex-shrink-0 w-64 md:w-80 lg:w-96 opacity-95">
          <Image
            src="/lady-justice.png"
            alt="Lady Justice"
            width={520}
            height={520}
            priority
            className="drop-shadow-[0_0_40px_rgba(196,134,58,0.45)]"
          />
        </div>
      </div>
    </section>
  )
}
