'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

type FAQCategory = 'all' | 'order' | 'quality' | 'visit' | 'general';

function getFaqCategories(items: Array<{ question: string; answer: string }>, lang: 'sl' | 'en') {
  const orderKeywords = lang === 'sl'
    ? ['dostava', 'naročilo', 'vračanje', 'cena', 'plast', 'e-pošti']
    : ['delivery', 'order', 'return', 'price', 'email', 'shipment'];
  const qualityKeywords = lang === 'sl'
    ? ['ekološki', 'kakovost', 'kristalizir', 'shranjuj', 'otrok', 'hrani']
    : ['organic', 'quality', 'crystall', 'store', 'children', 'safe'];
  const visitKeywords = lang === 'sl'
    ? ['obisk', 'skupin', 'čebeljnjak', 'čebeljaka', 'panjev']
    : ['visit', 'group', 'apiary', 'hive', 'tour'];

  return items.map((item, index) => {
    const text = (item.question + ' ' + item.answer).toLowerCase();
    if (orderKeywords.some(k => text.includes(k))) return { ...item, index, category: 'order' as const };
    if (qualityKeywords.some(k => text.includes(k))) return { ...item, index, category: 'quality' as const };
    if (visitKeywords.some(k => text.includes(k))) return { ...item, index, category: 'visit' as const };
    return { ...item, index, category: 'general' as const };
  });
}

const categoryLabels = {
  all: { sl: 'Vsa vprašanja', en: 'All Questions' },
  order: { sl: 'Naročilo & Dostava', en: 'Order & Delivery' },
  quality: { sl: 'Kakovost & Shranjevanje', en: 'Quality & Storage' },
  visit: { sl: 'Obisk', en: 'Visit' },
  general: { sl: 'Splošno', en: 'General' },
};

export default function FAQ() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categorized = useMemo(() => getFaqCategories(t.faq.items, lang), [t.faq.items, lang]);

  const filtered = useMemo(() => {
    return categorized.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categorized, activeCategory, searchQuery]);

  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const categories: Array<{ key: FAQCategory; label: string }> = [
    { key: 'all', label: categoryLabels.all[lang] },
    { key: 'order', label: categoryLabels.order[lang] },
    { key: 'quality', label: categoryLabels.quality[lang] },
    { key: 'visit', label: categoryLabels.visit[lang] },
    { key: 'general', label: categoryLabels.general[lang] },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-50/30 to-background" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-honey-300 to-transparent" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.faq.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 space-y-4"
        >
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'sl' ? 'Iščite vprašanja ...' : 'Search questions ...'}
              className="pl-10 h-11 bg-card border-border/50 focus:border-honey-400 focus:ring-honey-400/20"
            />
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-honey-500 text-white shadow-sm'
                    : 'bg-honey-50 dark:bg-honey-900/10 border border-honey-100 dark:border-honey-800/30 text-honey-700 dark:text-honey-400 hover:bg-honey-100 dark:hover:bg-honey-900/20'
                }`}
              >
                {cat.key !== 'all' && <Tag className="w-3 h-3" />}
                {cat.label}
                {cat.key !== 'all' && (
                  <span className={`ml-0.5 text-[10px] ${
                    activeCategory === cat.key ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    ({categorized.filter(i => i.category === cat.key).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* FAQ count */}
          <p className="text-xs text-muted-foreground">
            {lang === 'sl'
              ? `Prikazanih ${filtered.length} od ${t.faq.items.length} vprašanj`
              : `Showing ${filtered.length} of ${t.faq.items.length} questions`}
            {searchQuery && (
              <span className="ml-1">
                {lang === 'sl'
                  ? `za "${searchQuery}"`
                  : `for "${searchQuery}"`}
              </span>
            )}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const value = `faq-${item.index}`;
              const isOpen = openItems.has(value);

              return (
                <motion.div
                  key={item.index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-xl bg-card shadow-sm overflow-hidden transition-all ${
                    isOpen
                      ? 'border-l-[3px] border-l-honey-500 border-t-border border-r-border border-b-border'
                      : 'border-border/50'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(value)}
                    className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-muted/30 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold pr-4 hover:text-honey-700 dark:hover:text-honey-400 transition-colors">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-honey-50 dark:bg-honey-900/20 flex items-center justify-center text-honey-600 dark:text-honey-400 text-lg font-light"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-sm">
                {lang === 'sl'
                  ? 'Ni vprašanj, ki bi ustrezala vašemu iskanju.'
                  : 'No questions match your search.'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
