'use client'

import { Lang } from '../translations'

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-navy border-b border-[#C4863A]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xs font-semibold tracking-widest uppercase text-[#C4863A]">
          <span className="hidden sm:inline">INDIAN DOCUMENTATION SERVICES PTE. LTD. · UEN: 202502835H</span>
          <span className="sm:hidden">IDS Pte. Ltd.</span>
        </div>
        <div className="flex rounded-full border border-[#C4863A] overflow-hidden text-xs font-semibold">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'en' ? 'bg-[#C4863A] text-white' : 'text-[#C4863A] hover:bg-[#C4863A]/10'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ta')}
            className={`px-3 py-1.5 transition-colors ${
              lang === 'ta' ? 'bg-[#C4863A] text-white' : 'text-[#C4863A] hover:bg-[#C4863A]/10'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </nav>
  )
}
