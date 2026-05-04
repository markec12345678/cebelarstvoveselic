'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpDown, Palette, DollarSign, Candy } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type SortMode = 'default' | 'taste' | 'price' | 'color';

const honeyColorSwatches: Record<string, string> = {
  'Svetlo zlaten': '#F5E6A3',
  'Zlato rumen': '#E8C84A',
  'Temno jantarni': '#B8860B',
  'Zlato do jantarni': '#DAA520',
  'Temno rjava do črna': '#4A2C0A',
  'Zelo temen, skoraj črn': '#1A0F00',
  'Light golden': '#F5E6A3',
  'Golden yellow': '#E8C84A',
  'Dark amber': '#B8860B',
  'Golden to amber': '#DAA520',
  'Dark brown to black': '#4A2C0A',
  'Very dark, almost black': '#1A0F00',
};

const darknessOrder: Record<string, number> = {
  'Svetlo zlaten': 1,
  'Zlato rumen': 2,
  'Zlato do jantarni': 3,
  'Temno jantarni': 4,
  'Temno rjava do črna': 5,
  'Zelo temen, skoraj črn': 6,
  'Light golden': 1,
  'Golden yellow': 2,
  'Golden to amber': 3,
  'Dark amber': 4,
  'Dark brown to black': 5,
  'Very dark, almost black': 6,
};

const tasteSweetnessOrder: Record<string, number> = {
  'Mehko cvetličen, sladek z milkom vanilije': 1,
  'Žlahten, mentolno-cvetličen okus': 2,
  'Poln cvetličen okus, bogata tekstura': 3,
  'Močan, rahlo grenkast, hlajajoč': 4,
  'Lesna aromo, malce sladkana, gost': 5,
  'Smolnat, karakterističen okus smreke': 6,
  'Delicate floral, sweet with vanilla hint': 1,
  'Noble, slightly minty-floral': 2,
  'Full floral flavour, rich texture': 3,
  'Strong, slightly bitter, cooling': 4,
  'Woody aroma, mildly sweet, dense': 5,
  'Resinous, characteristic spruce flavour': 6,
};

const crystalSpeedMap: Record<string, Record<string, string>> = {
  sl: {
    'Akacijev med': 'slow',
    'Lipov med': 'medium',
    'Kostanjev med': 'fast',
    'Cvetlični med': 'medium',
    'Gozdni med': 'medium',
    'Med brstov smreke': 'slow',
  },
  en: {
    'Acacia Honey': 'slow',
    'Linden Honey': 'medium',
    'Chestnut Honey': 'fast',
    'Wildflower Honey': 'medium',
    'Forest Honey': 'medium',
    'Fir Honeydew Honey': 'slow',
  },
};

const priceToNumber = (price: string): number => {
  const num = parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  return isNaN(num) ? 0 : num;
};

const sortButtons: { mode: SortMode; icon: React.ElementType; labelKey: 'sortByTaste' | 'sortByPrice' | 'sortByColor' | 'resetSort' }[] = [
  { mode: 'taste', icon: Candy, labelKey: 'sortByTaste' },
  { mode: 'price', icon: DollarSign, labelKey: 'sortByPrice' },
  { mode: 'color', icon: Palette, labelKey: 'sortByColor' },
  { mode: 'default', icon: ArrowUpDown, labelKey: 'resetSort' },
];

export default function HoneyComparison() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sortedProducts = useMemo(() => {
    const products = [...t.products.items];
    switch (sortMode) {
      case 'taste':
        return products.sort((a, b) => (tasteSweetnessOrder[a.taste] ?? 3) - (tasteSweetnessOrder[b.taste] ?? 3));
      case 'price':
        return products.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
      case 'color':
        return products.sort((a, b) => (darknessOrder[a.color] ?? 3) - (darknessOrder[b.color] ?? 3));
      default:
        return products;
    }
  }, [t.products.items, sortMode]);

  const getCrystalSpeed = (name: string): string => {
    const map = crystalSpeedMap[lang] || crystalSpeedMap.sl;
    const speed = map[name] || 'medium';
    return t.comparison.crystalSpeed[speed as keyof typeof t.comparison.crystalSpeed];
  };

  return (
    <section id="comparison" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-honey-50/20 to-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-honey-300 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.comparison.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.comparison.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.comparison.subtitle}
          </p>
        </motion.div>

        {/* Sort Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {sortButtons.map(({ mode, icon: Icon, labelKey }) => (
            <button
              key={mode}
              onClick={() => setSortMode(mode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                sortMode === mode
                  ? 'bg-honey-500 text-white shadow-md shadow-honey-500/25'
                  : 'bg-muted/80 text-muted-foreground hover:bg-honey-100 dark:hover:bg-honey-900/30 hover:text-honey-700 dark:hover:text-honey-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.comparison.sortLabels[labelKey]}
            </button>
          ))}
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 hidden lg:block"
        >
          <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.color}</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground min-w-[140px]">{t.products.sectionTag}</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.taste}</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.origin}</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.use}</th>
                  <th className="text-center p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.crystalSpeed}</th>
                  <th className="text-right p-4 text-sm font-semibold text-muted-foreground">{t.comparison.headers.price}</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`border-b border-border/30 transition-all duration-300 cursor-default ${
                      hoveredIndex === i
                        ? 'bg-honey-50/80 dark:bg-honey-950/20 shadow-[inset_0_0_30px_rgba(217,160,47,0.06)]'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <td className="p-4">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white/80 shadow-sm flex-shrink-0"
                        style={{ backgroundColor: honeyColorSwatches[product.color] || '#E8C84A' }}
                        title={product.color}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{product.name}</span>
                        {product.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 border-0">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{product.taste}</td>
                    <td className="p-4 text-sm text-muted-foreground">{product.origin}</td>
                    <td className="p-4 text-sm text-muted-foreground">{product.use}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        getCrystalSpeed(product.name) === t.comparison.crystalSpeed.slow
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : getCrystalSpeed(product.name) === t.comparison.crystalSpeed.medium
                            ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      }`}>
                        {getCrystalSpeed(product.name)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-sm text-foreground">{product.price}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="mt-10 lg:hidden space-y-4">
          {sortedProducts.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className={`overflow-hidden transition-all duration-300 ${
                hoveredIndex === i
                  ? 'shadow-[0_0_20px_rgba(217,160,47,0.15)] border-honey-300 dark:border-honey-700'
                  : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white/80 shadow-sm flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: honeyColorSwatches[product.color] || '#E8C84A' }}
                      title={product.color}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{product.name}</h3>
                        {product.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 border-0">
                            {product.badge}
                          </Badge>
                        )}
                        <span className="ml-auto font-bold text-sm text-honey-700 dark:text-honey-400">{product.price}</span>
                      </div>
                      <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                        <p><span className="font-medium text-foreground/70">{t.comparison.headers.taste}:</span> {product.taste}</p>
                        <p><span className="font-medium text-foreground/70">{t.comparison.headers.origin}:</span> {product.origin}</p>
                        <p><span className="font-medium text-foreground/70">{t.comparison.headers.use}:</span> {product.use}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground/70">{t.comparison.headers.crystalSpeed}:</span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                            getCrystalSpeed(product.name) === t.comparison.crystalSpeed.slow
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : getCrystalSpeed(product.name) === t.comparison.crystalSpeed.medium
                                ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          }`}>
                            {getCrystalSpeed(product.name)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
