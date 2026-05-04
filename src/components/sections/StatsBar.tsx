'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Clock, Home, Leaf, Star, MessageSquareHeart, Award } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

interface StatItem {
  key: 'years' | 'hives' | 'varieties' | 'organic' | 'rating' | 'reviews';
  icon: React.ElementType;
  suffix?: string;
}

const statsConfig: StatItem[] = [
  { key: 'years', icon: Clock, suffix: '+' },
  { key: 'hives', icon: Home, suffix: '+' },
  { key: 'varieties', icon: Award },
  { key: 'organic', icon: Leaf, suffix: '%' },
  { key: 'rating', icon: Star, suffix: '★' },
  { key: 'reviews', icon: MessageSquareHeart, suffix: '+' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(Number.isInteger(target) ? Math.round(current) : parseFloat(current.toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-honey-900"
      />
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />
      {/* Top/bottom gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {statsConfig.map((stat, i) => {
            const Icon = stat.icon;
            const targetValue = parseFloat(t.stats[stat.key]);
            const isDecimal = t.stats[stat.key].includes('.');

            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group"
              >
                <div className="relative rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-honey-500/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-honey-500/20 mb-3 group-hover:bg-honey-500/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-honey-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    <AnimatedCounter
                      target={isDecimal ? targetValue : Math.round(targetValue)}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/60 leading-snug font-medium">
                    {t.stats[stat.key + 'Label' as keyof typeof t.stats]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
