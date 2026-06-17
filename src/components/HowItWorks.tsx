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
              <p className={`text-xs uppercase tracking-widest text-muted mb-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {step.step}
              </p>
              <h3 className={`font-semibold text-navy mb-2 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {step.title}
              </h3>
              <p className={`text-sm text-muted leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
