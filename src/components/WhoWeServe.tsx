import { Lang, t } from '../translations'

interface WhoWeServeProps {
  lang: Lang
}

export default function WhoWeServe({ lang }: WhoWeServeProps) {
  const s = t[lang].whoWeServe

  return (
    <section id="about" className="bg-surface py-14 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-8 break-words">
          {s.title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.cards.map((card, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 min-w-0">
              <h3 className={`font-semibold text-navy mb-2 break-words ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {card.title}
              </h3>
              <p className={`text-sm text-muted leading-relaxed break-words ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
