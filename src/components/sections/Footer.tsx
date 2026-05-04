'use client';

import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const { lang, setLang } = useLangStore();
  const t = getTranslations(lang);

  return (
    <footer className="bg-bark text-white/80 relative" role="contentinfo">
      <div className="absolute inset-0 opacity-10 hex-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-honey-300 to-honey-600 flex items-center justify-center shadow-md">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 4.5 3.5 5.5L5 22h2l.5-3.5c.8.2 1.7.3 2.5.5v3h2v-3c.8-.2 1.7-.3 2.5-.5L15 22h2l-.5-6c2-1 3.5-3 3.5-5.5C20 6 15.52 2 12 2z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path
                    d="M12 4c-3.87 0-7 2.69-7 6s3.13 6 7 6 7-2.69 7-6-3.13-6-7-6zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm font-bold text-white leading-none block">Čebelarstvo</span>
                <span className="text-xs text-honey-400 font-semibold tracking-wide leading-none mt-0.5 block">VESELIČ</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {t.footer.brandDesc}
            </p>
            <p className="mt-4 text-xs text-white/40">{t.footer.madeIn}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {['story', 'products', 'process', 'visit', 'faq'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-sm text-white/60 hover:text-honey-400 transition-colors"
                  >
                    {t.nav[key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-honey-400 transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-honey-400 transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-honey-400 transition-colors">
                  {t.footer.cookies}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="whitespace-pre-line">{t.footer.address}</li>
              <li>
                <a href="tel:+38641234567" className="hover:text-honey-400 transition-colors">
                  {t.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cebelarstvo-veselic.si"
                  className="hover:text-honey-400 transition-colors"
                >
                  {t.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Čebelarstvo Veselič. {t.footer.rights}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang('sl')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                lang === 'sl'
                  ? 'bg-honey-500/20 text-honey-400 font-medium'
                  : 'hover:text-white/60'
              }`}
            >
              Slovenščina
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                lang === 'en'
                  ? 'bg-honey-500/20 text-honey-400 font-medium'
                  : 'hover:text-white/60'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
