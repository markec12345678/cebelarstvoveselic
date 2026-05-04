'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

function TestimonialCard({ item, isMobile = false }: { item: { quote: string; name: string; location: string; type: string; rating: number }; isMobile?: boolean }) {
  return (
    <Card className="h-full border-border/50 hover:border-honey-200 dark:hover:border-honey-800 transition-all duration-300 hover:shadow-lg hover:shadow-honey-900/5 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-honey-300 dark:text-honey-700 mb-4" />

        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: item.rating }).map((_, si) => (
            <Star
              key={si}
              className="w-4 h-4 fill-honey-400 text-honey-400"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[15px] sm:text-base text-muted-foreground leading-[1.75] italic">
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar with gradient ring */}
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-honey-300 via-honey-500 to-amber-600 opacity-70" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-honey-300 to-honey-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-background">
                {item.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {item.location}
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-xs border-honey-200 dark:border-honey-800 text-honey-700 dark:text-honey-400"
          >
            {item.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const items = t.testimonials.items;
  const maxIndex = items.length - 1;

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  }, [maxIndex]);

  // Auto-play every 5 seconds on desktop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      navigate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, navigate]);

  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/40 via-background to-background" />

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
            {t.testimonials.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="mt-12 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <TestimonialCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Desktop navigation dots */}
        <div className="mt-8 hidden md:flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-honey-500 w-6'
                  : 'bg-honey-300/50 hover:bg-honey-300'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-12 md:hidden">
          <div className="relative overflow-hidden">
            {/* Swipe hint animation */}
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 text-xs text-honey-500 bg-honey-50 dark:bg-honey-900/20 px-3 py-1.5 rounded-full border border-honey-200 dark:border-honey-800/30"
                >
                  <motion.div
                    animate={{ x: [-4, 4, -4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Hand className="w-3.5 h-3.5" />
                  </motion.div>
                  {lang === 'sl' ? 'Podrsajte za več' : 'Swipe for more'}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard item={items[current]} isMobile />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={() => navigate(-1)}
                aria-label="Prejšnja"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current
                        ? 'bg-honey-500 w-6'
                        : 'bg-honey-300/50 hover:bg-honey-300'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={() => navigate(1)}
                aria-label="Naslednja"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
