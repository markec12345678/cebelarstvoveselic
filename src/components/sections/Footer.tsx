'use client';

import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { lang, setLang } = useLangStore();
  const t = getTranslations(lang);

  return (
    <footer className="bg-bark text-white/80 relative" role="contentinfo">
      <div className="absolute inset-0 opacity-5 hex-pattern" />
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-honey-400 via-honey-500 to-honey-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-300 to-honey-600 flex items-center justify-center shadow-lg shadow-honey-600/20">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 4.5 3.5 5.5L5 22h2l.5-3.5c.8.2 1.7.3 2.5.5v3h2v-3c.8-.2 1.7-.3 2.5-.5L15 22h2l-.5-6c2-1 3.5-3 3.5-5.5C20 6 15.52 2 12 2z" fill="currentColor" opacity="0.3" />
                  <path d="M12 4c-3.87 0-7 2.69-7 6s3.13 6 7 6 7-2.69 7-6-3.13-6-7-6zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="text-base font-bold text-white leading-none block">Čebelarstvo</span>
                <span className="text-xs text-honey-400 font-semibold tracking-widest leading-none mt-1 block">VESELIČ</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              {t.footer.brandDesc}
            </p>

            {/* Social media */}
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://facebook.com/cebelarstvoveselic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-honey-500/20 flex items-center justify-center text-white/40 hover:text-honey-400 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/cebelarstvo_veselic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-honey-500/20 flex items-center justify-center text-white/40 hover:text-honey-400 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-5 text-xs text-white/30">{t.footer.madeIn}</p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {['story', 'products', 'process', 'visit', 'faq', 'contact'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-sm text-white/50 hover:text-honey-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                    {t.nav[key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-honey-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-honey-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-honey-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                  {t.footer.cookies}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-honey-500/60 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/50">{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-honey-500/60 flex-shrink-0" />
                <a href="tel:+38641234567" className="text-sm text-white/50 hover:text-honey-400 transition-colors">
                  {t.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-honey-500/60 flex-shrink-0" />
                <a href="mailto:info@cebelarstvo-veselic.si" className="text-sm text-white/50 hover:text-honey-400 transition-colors">
                  {t.contact.email}
                </a>
              </li>
            </ul>

            {/* Location badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-lg">🇸🇮</span>
              <div>
                <span className="text-xs font-medium text-white/60 block">Bela krajina, Slovenija</span>
                <span className="text-[11px] text-white/30">45.6424° N, 15.3231° E</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>
            © {new Date().getFullYear()} Čebelarstvo Veselič, Jožef Veselič s.p. · {t.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang('sl')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 ${
                lang === 'sl'
                  ? 'bg-honey-500/15 text-honey-400 font-medium'
                  : 'hover:text-white/50 hover:bg-white/5'
              }`}
              aria-label="Slovenščina"
            >
              SI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-honey-500/15 text-honey-400 font-medium'
                  : 'hover:text-white/50 hover:bg-white/5'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
