import { Lang, t } from '../translations'

interface CredentialsProps {
  lang: Lang
}

export default function Credentials({ lang }: CredentialsProps) {
  const s = t[lang].credentials

  return (
    <section className="bg-navy py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C4863A] mb-8">
          {s.title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {s.items.map((item, i) => (
            <div key={i} className="bg-[#1F4A33] border border-[#C4863A]/40 rounded-lg p-5">
              <p className={`text-xs uppercase tracking-widest text-[#C4863A] mb-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {item.label}
              </p>
              <p className={`font-semibold text-white ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {item.value}
              </p>
              {item.sub && (
                <p className={`text-sm text-green-200 mt-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
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
