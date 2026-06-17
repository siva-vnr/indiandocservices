'use client'

import { Lang } from '../translations'

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xs font-semibold tracking-widest uppercase text-navy">
          <span className="hidden sm:inline">INDIAN DOCUMENTATION SERVICES PTE. LTD. · UEN: 202502835H</span>
          <span className="sm:hidden">IDS Pte. Ltd.</span>
        </div>
        <div className="flex rounded-full border border-navy overflow-hidden text-xs font-semibold">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'en' ? 'bg-navy text-white' : 'text-navy hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ta')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'ta' ? 'bg-navy text-white' : 'text-navy hover:bg-gray-100'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </nav>
  )
}
