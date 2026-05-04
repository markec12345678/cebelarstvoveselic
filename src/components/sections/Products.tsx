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
import { MapPin, Palette, ChefHat, Star, Droplets } from 'lucide-react';
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

export default function Products() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const selected = selectedProduct !== null ? t.products.items[selectedProduct] : null;

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

        {/* Seasonal notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
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
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.products.items.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <Card
                className="product-card group cursor-pointer border-border/50 hover:border-honey-300 dark:hover:border-honey-700 overflow-hidden h-full"
                onClick={() => setSelectedProduct(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(i)}
                aria-label={`${product.name} — ${product.price}`}
              >
                {/* Honey color bar */}
                <div className={`h-2 bg-gradient-to-r ${honeyColors[i]}`} />

                <CardContent className="p-6 flex flex-col h-full">
                  {/* Badge */}
                  {product.badge && (
                    <div className="flex justify-between items-start mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-xs font-medium border-honey-200 dark:border-honey-800/30"
                      >
                        {product.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium">
                        {t.products.fromPrice} {product.price}
                      </span>
                    </div>
                  )}

                  {/* Product name */}
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-honey-700 dark:group-hover:text-honey-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Color indicator */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${honeyColors[i]} shadow-sm`} />
                    <span className="text-xs text-muted-foreground">{product.color}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {product.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {product.origin}
                    </div>
                    <span className="text-lg font-bold honey-text-gradient">
                      {product.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                {selected.badge && (
                  <Badge className="bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 border-honey-200 dark:border-honey-800/30">
                    {selected.badge}
                  </Badge>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.description}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <Palette className="w-4 h-4 mx-auto mb-1 text-honey-600" />
                    <span className="text-xs text-muted-foreground block">{selected.color}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <Star className="w-4 h-4 mx-auto mb-1 text-honey-600" />
                    <span className="text-xs text-muted-foreground block line-clamp-2">
                      {selected.taste}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <ChefHat className="w-4 h-4 mx-auto mb-1 text-honey-600" />
                    <span className="text-xs text-muted-foreground block line-clamp-2">
                      {selected.use}
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
