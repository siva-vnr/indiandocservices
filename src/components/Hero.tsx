import Image from 'next/image'
import { Lang, t } from '../translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const s = t[lang].hero

  return (
    <section className="bg-navy py-12 px-4 border-b-4 border-[#C4863A] overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text content */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <h1
            className={`text-2xl sm:text-4xl font-bold text-white leading-tight mb-6 break-words ${
              lang === 'ta' ? 'font-tamil' : ''
            }`}
          >
            {s.headline}
          </h1>
          <p
            className={`text-sm sm:text-lg text-green-100 leading-relaxed mb-8 break-words ${
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
              className={`inline-block bg-[#C4863A] text-white px-5 py-3 rounded font-semibold hover:bg-[#b07530] transition-colors ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.cta1}
            </a>
            <a
              href={s.email}
              className={`inline-block border-2 border-[#C4863A] text-[#C4863A] px-5 py-3 rounded font-semibold hover:bg-[#C4863A]/10 transition-colors ${
                lang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {s.cta2}
            </a>
          </div>
        </div>

        {/* Lady Justice statue */}
        <div className="flex-shrink-0 w-48 sm:w-56 md:w-72 lg:w-80 opacity-95">
          <Image
            src="/lady-justice.png"
            alt="Lady Justice"
            width={520}
            height={520}
            priority
            className="w-full h-auto drop-shadow-[0_0_40px_rgba(196,134,58,0.45)]"
          />
        </div>
      </div>
    </section>
  )
}
