'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MapPin, Palette, ChefHat, Star, Droplets, Plus, Minus, Eye, ShoppingBag } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

const honeyColors = [
  'from-yellow-200 to-yellow-300',
  'from-yellow-300 to-amber-300',
  'from-amber-400 to-amber-600',
  'from-amber-300 to-yellow-400',
  'from-amber-700 to-amber-900',
  'from-amber-950 to-stone-900',
];

// Color intensity categories: 'light', 'medium', 'dark'
const colorCategories = ['light', 'light', 'medium', 'medium', 'dark', 'dark'] as const;

const honeyImages = [
  '/images/honey/acacia.jpg',
  '/images/honey/linden.jpg',
  '/images/honey/chestnut.jpg',
  '/images/honey/wildflower.jpg',
  '/images/honey/forest.jpg',
  '/images/honey/fir.jpg',
];

const filterTabs = ['All', 'Light', 'Medium', 'Dark'] as const;

// Fake review data
const reviewData = [
  { rating: 4.9, reviews: 128 },
  { rating: 4.8, reviews: 95 },
  { rating: 5.0, reviews: 67 },
  { rating: 4.9, reviews: 142 },
  { rating: 4.8, reviews: 89 },
  { rating: 4.9, reviews: 53 },
];

export default function Products() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dialogTab, setDialogTab] = useState<'desc' | 'origin' | 'usage'>('desc');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Card-level quantity state
  const [cardQuantities, setCardQuantities] = useState<Record<number, number>>({});

  const selected = selectedProduct !== null ? t.products.items[selectedProduct] : null;

  const updateCardQty = (index: number, delta: number) => {
    setCardQuantities((prev) => {
      const current = prev[index] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      if (next === 0) {
        const { [index]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [index]: next };
    });
  };

  // Filter products by color intensity
  const filteredIndices = activeFilter === 'All'
    ? t.products.items.map((_, i) => i)
    : t.products.items.map((_, i) => i).filter((i) => colorCategories[i] === activeFilter.toLowerCase());

  const parsePrice = (priceStr: string) => {
    const cleaned = priceStr.replace(/[^0-9,]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const formatTotal = () => {
    if (!selected) return '';
    const unit = parsePrice(selected.price);
    const total = unit * quantity;
    return total.toFixed(2).replace('.', ',') + ' €';
  };

  const handleQuickAdd = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setQuantity(1);
    setDialogTab('desc');
    setSelectedProduct(index);
  };

  const handleAddToCart = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCardQuantities((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  return (
    <section id="products" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.products.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.products.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.products.subtitle}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 flex-wrap"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-medium text-muted-foreground ${
                activeFilter === tab ? 'filter-pill-active' : 'bg-card'
              }`}
            >
              {tab === 'All' ? (lang === 'sl' ? 'Vse' : 'All') :
               tab === 'Light' ? (lang === 'sl' ? 'Svetlo' : 'Light') :
               tab === 'Medium' ? (lang === 'sl' ? 'Srednje' : 'Medium') :
               (lang === 'sl' ? 'Temno' : 'Dark')}
            </button>
          ))}
        </motion.div>

        {/* Seasonal notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {t.seasonal.badge}
              </span>
              <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-0.5">
                {t.seasonal.message}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Product grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredIndices.map((i) => {
            const product = t.products.items[i];
            const qty = cardQuantities[i] || 0;
            const review = reviewData[i];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.15 + i * 0.08,
                }}
              >
                <Card
                  className="product-card card-shine group cursor-pointer border-border/50 hover:border-honey-300 dark:hover:border-honey-700 overflow-hidden h-full relative hover:shadow-[0_0_24px_rgba(212,160,23,0.2)] transition-all duration-300"
                  onClick={() => { setSelectedProduct(i); setQuantity(1); setDialogTab('desc'); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedProduct(i); setQuantity(1); setDialogTab('desc'); } }}
                  aria-label={`${product.name} — ${product.price}`}
                >
                  {/* Product image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={honeyImages[i]}
                      alt={`${product.name} — Čebelarstvo Veselič`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    {/* Honey color bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${honeyColors[i]}`} />
                    {/* Badge overlay */}
                    {product.badge && (
                      <Badge
                        className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-xs font-semibold border-0 shadow-sm"
                      >
                        {product.badge}
                      </Badge>
                    )}
                    {/* "On Sale" flash badge on product 2 (Chestnut) */}
                    {i === 2 && (
                      <motion.div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md sale-badge z-10"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span>-10%</span>
                      </motion.div>
                    )}
                    {/* "New Arrival" tag on product 4 (Forest) */}
                    {i === 4 && (
                      <motion.div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {lang === 'sl' ? 'Novo!' : 'New!'}
                      </motion.div>
                    )}
                    {/* "Most Popular" ribbon with floating animation */}
                    {i === 0 && (
                      <motion.div
                        className="absolute top-3 right-[-32px] w-[120px] text-center overflow-hidden"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="bg-gradient-to-r from-honey-500 to-honey-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 rotate-45 shadow-md">
                          {lang === 'sl' ? '⭐ Najbolj priljubljen' : '⭐ Most Popular'}
                        </div>
                      </motion.div>
                    )}
                    {/* Quick View eye button */}
                    <motion.button
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:scale-110"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(i); setQuantity(1); setDialogTab('desc'); }}
                      aria-label={lang === 'sl' ? 'Hitri pogled' : 'Quick view'}
                    >
                      <Eye className="w-4 h-4 text-honey-700 dark:text-honey-400" />
                    </motion.button>
                    {/* Add to Cart mini button */}
                    <motion.button
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:scale-110"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAddToCart(e, i)}
                      aria-label={lang === 'sl' ? 'V košarico' : 'Add to cart'}
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Name + Price row */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold tracking-tight group-hover:text-honey-700 dark:group-hover:text-honey-400 transition-colors">
                        {product.name}
                      </h3>
                      <motion.span
                        className="text-base font-bold honey-text-gradient flex-shrink-0"
                        animate={isInView ? {
                          scale: [1, 1.12, 1],
                          transition: { duration: 0.5, delay: 0.3 + i * 0.08 },
                        } : {}}
                      >
                        {product.price}
                      </motion.span>
                    </div>

                    {/* Color indicator */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${honeyColors[i]} shadow-sm`} />
                      <span className="text-xs text-muted-foreground">{product.color}</span>
                    </div>

                    {/* Star rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= Math.floor(review.rating)
                                ? 'text-honey-400 fill-honey-400'
                                : s - 0.5 <= review.rating
                                  ? 'text-honey-400 fill-honey-200'
                                  : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {review.rating}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        ({review.reviews})
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {product.description}
                    </p>

                    {/* Quantity selector */}
                    <div className="flex items-center gap-2 mt-3">
                      <div
                        className="flex items-center border border-border rounded-lg bg-background"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => updateCardQty(i, -1)}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-l-lg transition-colors text-sm"
                          aria-label={lang === 'sl' ? 'Zmanjšaj količino' : 'Decrease'}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">{qty}</span>
                        <button
                          onClick={() => updateCardQty(i, 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-r-lg transition-colors text-sm"
                          aria-label={lang === 'sl' ? 'Povečaj količino' : 'Increase'}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {qty > 0 && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs font-medium text-honey-600 dark:text-honey-400"
                        >
                          = {(parsePrice(product.price) * qty).toFixed(2).replace('.', ',')} €
                        </motion.span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {product.origin}
                      </div>
                      <motion.span
                        className="text-lg font-bold honey-text-gradient"
                        animate={isInView ? {
                          scale: [1, 1.1, 1],
                          transition: { duration: 0.5, delay: 0.4 + i * 0.08 },
                        } : {}}
                      >
                        {product.price}
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bundle offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-honey-50 to-amber-50 dark:from-honey-900/10 dark:to-amber-900/10 border border-honey-200 dark:border-honey-800/30">
            <div className="text-center sm:text-left">
              <span className="text-sm font-semibold text-honey-800 dark:text-honey-300">
                {lang === 'sl' ? '🎁 Družinski set — 6 sort' : '🎁 Family Set — 6 Varieties'}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === 'sl'
                  ? 'Vse šest sort medu v elegantnem podarilnem pakiranju. Prihranite 15 %.'
                  : 'All six honey varieties in an elegant gift package. Save 15%.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground line-through">68,40 €</span>
              <span className="text-2xl font-bold honey-text-gradient">58,14 €</span>
              <Button
                size="sm"
                className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t.products.addToCart}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${honeyColors[selectedProduct!]} shadow-md`} />
                  <div>
                    <DialogTitle className="text-xl">{selected.name}</DialogTitle>
                    <DialogDescription>{selected.origin}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Product image in dialog */}
                <div className="relative rounded-xl overflow-hidden h-44">
                  <img
                    src={honeyImages[selectedProduct!]}
                    alt={`${selected.name} — Čebelarstvo Veselič`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${honeyColors[selectedProduct!]}`} />
                </div>

                {selected.badge && (
                  <Badge className="bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 border-honey-200 dark:border-honey-800/30">
                    {selected.badge}
                  </Badge>
                )}

                {/* Content Tabs */}
                <div className="flex gap-1 p-1 rounded-lg bg-muted/50">
                  {([
                    { key: 'desc' as const, label: lang === 'sl' ? 'Opis' : 'Description', icon: Star },
                    { key: 'origin' as const, label: lang === 'sl' ? 'Izvor' : 'Origin', icon: MapPin },
                    { key: 'usage' as const, label: lang === 'sl' ? 'Uporaba' : 'Usage', icon: ChefHat },
                  ]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setDialogTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                        dialogTab === tab.key
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[80px]">
                  {dialogTab === 'desc' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selected.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${honeyColors[selectedProduct!]} shadow-sm`} />
                        <span className="text-xs text-muted-foreground">{selected.color}</span>
                      </div>
                    </motion.div>
                  )}
                  {dialogTab === 'origin' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <MapPin className="w-4 h-4 text-honey-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">{selected.origin}</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lang === 'sl'
                              ? 'Natančna lokacija čebelnjaka v Beli krajini, kjer čebele nabirajo nektar iz naravnih cvetnih pašnikov.'
                              : 'Precise apiary location in Bela Krajina, where bees forage nectar from natural floral pastures.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <Palette className="w-4 h-4 text-honey-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">{selected.taste}</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lang === 'sl'
                              ? 'Edinstven okusni profil, značilen za to sorto medu.'
                              : 'A unique taste profile characteristic of this honey variety.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {dialogTab === 'usage' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <ChefHat className="w-4 h-4 text-honey-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">{selected.use}</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lang === 'sl'
                              ? 'Priporočeni načini uporabe za optimalen užitek in zdravilstvene učinke.'
                              : 'Recommended ways to use for optimal enjoyment and health benefits.'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded-lg bg-muted/50 text-center">
                          <span className="text-lg" role="img">🥞</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">{lang === 'sl' ? 'Zajtrk' : 'Breakfast'}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50 text-center">
                          <span className="text-lg" role="img">🍵</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">{lang === 'sl' ? 'Čaj' : 'Tea'}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50 text-center">
                          <span className="text-lg" role="img">🥗</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">{lang === 'sl' ? 'Kuhinja' : 'Cooking'}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quantity mini-selector */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {lang === 'sl' ? 'Količina' : 'Quantity'}:
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="w-8 h-8 rounded-full border border-honey-300 dark:border-honey-700 flex items-center justify-center text-honey-700 dark:text-honey-400 hover:bg-honey-100 dark:hover:bg-honey-900/20 transition-colors text-lg font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </motion.button>
                    <span className="w-8 text-center text-lg font-bold tabular-nums">{quantity}</span>
                    <motion.button
                      className="w-8 h-8 rounded-full border border-honey-300 dark:border-honey-700 flex items-center justify-center text-honey-700 dark:text-honey-400 hover:bg-honey-100 dark:hover:bg-honey-900/20 transition-colors text-lg font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </motion.button>
                    <span className="ml-3 text-xl font-bold honey-text-gradient tabular-nums min-w-[60px] text-right">
                      {formatTotal()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {t.products.perJar}
                    </span>
                    <span className="text-2xl font-bold honey-text-gradient ml-2">
                      {selected.price}
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md"
                    onClick={() => {
                      setSelectedProduct(null);
                      document
                        .getElementById('contact')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t.products.addToCart}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
