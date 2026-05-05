'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Clock, Home, Leaf, Star, MessageSquareHeart, Award, Shield, Sparkles } from 'lucide-react';
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
  const [showSuffix, setShowSuffix] = useState(false);

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
      } else {
        // Bounce in the suffix after counter finishes
        setShowSuffix(true);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={showSuffix ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="inline-block"
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

function SparkleParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size}px`,
      }}
      aria-hidden="true"
    />
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

  // Sparkle particles configuration
  const sparkles = [
    { delay: 0, x: '10%', y: '20%', size: 3 },
    { delay: 0.8, x: '25%', y: '60%', size: 2 },
    { delay: 1.5, x: '50%', y: '30%', size: 4 },
    { delay: 0.4, x: '75%', y: '70%', size: 2 },
    { delay: 2.0, x: '90%', y: '25%', size: 3 },
    { delay: 1.2, x: '60%', y: '80%', size: 2 },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 overflow-hidden">
      {/* Gradient separator at top */}
      <div className="gradient-separator" />
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

      {/* Sparkle particles */}
      {sparkles.map((s, i) => (
        <SparkleParticle key={i} delay={s.delay} x={s.x} y={s.y} size={s.size} />
      ))}

      {/* Top/bottom gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
                <div className="relative rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-honey-500/10 hover:border-honey-400/30"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-honey-500/20 mb-3 group-hover:bg-honey-500/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-honey-400 group-hover:scale-110 transition-transform duration-300" />
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

        {/* See our certificates link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => document.getElementById('quality')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm font-medium transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            {lang === 'sl' ? 'Oglejte si naše potrdila' : 'See our certificates'}
          </button>
        </motion.div>

        {/* Trust badge row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-4 flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-honey-400" />
            <span>
              {lang === 'sl' ? 'Zaupanja vredni za 500+ družin' : 'Trusted by 500+ families'}
            </span>
            {/* Small family icons */}
            <span className="ml-1 flex gap-0.5" aria-hidden="true">
              <span className="inline-flex gap-[1px] text-[10px]">👨‍👩‍👧‍👦</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Gradient separator at bottom */}
      <div className="gradient-separator absolute bottom-0 left-0 right-0" />
    </section>
  );
}
