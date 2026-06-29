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
            <p className={`font-semibold text-navy text-sm mb-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
              {s.company}
            </p>
            <p className="text-xs text-muted">{s.uen}</p>
            <p className={`text-xs text-muted mt-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
              {s.address}
            </p>
            <p className={`text-xs text-muted mt-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
              {s.payment}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {s.nav.map((label, i) => (
              <a
                key={i}
                href={s.navAnchors[i]}
                className={`text-sm text-navy hover:underline ${lang === 'ta' ? 'font-tamil' : ''}`}
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
              className={`text-sm text-navy hover:underline ${lang === 'ta' ? 'font-tamil' : ''}`}
            >
              {s.whatsapp}
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex flex-col items-center gap-3">
          <a
            href={s.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted hover:text-navy transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <p className={`text-xs text-muted text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
            {s.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
