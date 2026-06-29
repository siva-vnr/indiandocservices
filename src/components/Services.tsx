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
        <p className={`text-sm text-gray-600 mb-8 ${lang === 'ta' ? 'font-tamil' : ''}`}>
          {s.subtext}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.items.map((item, i) => (
            <div key={i} className="border border-[#C4863A]/40 rounded-lg p-5 bg-white hover:border-[#C4863A] transition-colors">
              <h3 className={`font-semibold text-navy mb-2 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {item.title}
              </h3>
              <p className={`text-sm text-muted leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
