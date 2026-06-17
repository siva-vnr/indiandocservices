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
