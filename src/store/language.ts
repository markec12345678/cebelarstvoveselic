import { create } from 'zustand';
import { type Lang } from '@/lib/i18n';

interface LanguageStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LanguageStore>((set) => ({
  lang: 'sl',
  setLang: (lang) => set({ lang }),
  toggleLang: () =>
    set((state) => ({ lang: state.lang === 'sl' ? 'en' : 'sl' })),
}));
