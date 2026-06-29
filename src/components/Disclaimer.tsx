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
          className={`text-sm text-amber-900 leading-relaxed break-words ${
            lang === 'ta' ? 'font-tamil' : ''
          }`}
        >
          <span className="font-bold">{s.label}</span> {s.text}
        </p>
      </div>
    </div>
  )
}
