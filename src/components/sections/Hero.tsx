'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, ShieldCheck, MapPin, Flower2, MousePointer2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

/* ============================================
   Floating Honeycomb SVG Component
   ============================================ */
function FloatingHoneycomb({
  size,
  style,
  delay,
  duration,
}: {
  size: number;
  style: React.CSSProperties;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
    >
      <motion.div
        animate={{
          y: [-10, -25, -8, -20, -10],
          rotate: [-5, 8, -3, 6, -5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z"
            stroke="rgba(212, 160, 23, 0.15)"
            strokeWidth="2"
            fill="rgba(212, 160, 23, 0.04)"
          />
          <path
            d="M50 20L75 35V65L50 80L25 65V35L50 20Z"
            stroke="rgba(212, 160, 23, 0.1)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ============================================
   Flying Bee SVG Component
   ============================================ */
function FlyingBee() {
  return (
    <div className="absolute top-[25%] left-0 w-full h-20 pointer-events-none overflow-hidden z-[5]">
      <motion.div
        className="fly-bee absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <svg
          width="48"
          height="36"
          viewBox="0 0 48 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <ellipse cx="22" cy="20" rx="12" ry="8" fill="#D4A017" />
          {/* Head */}
          <circle cx="36" cy="17" r="6" fill="#2D1B00" />
          {/* Stripes */}
          <rect x="14" y="16" width="3" height="8" rx="1" fill="#2D1B00" opacity="0.5" />
          <rect x="20" y="15" width="3" height="9" rx="1" fill="#2D1B00" opacity="0.5" />
          <rect x="26" y="16" width="3" height="8" rx="1" fill="#2D1B00" opacity="0.5" />
          {/* Wings */}
          <ellipse cx="18" cy="8" rx="10" ry="5" fill="rgba(255,255,255,0.3)" className="wing-flutter" />
          <ellipse cx="24" cy="6" rx="9" ry="5" fill="rgba(255,255,255,0.25)" className="wing-flutter" />
          {/* Stinger */}
          <polygon points="10,20 5,20 10,22" fill="#2D1B00" />
          {/* Antenna */}
          <path d="M40 13 Q43 8 45 6" stroke="#2D1B00" strokeWidth="1" fill="none" />
          <circle cx="45" cy="6" r="1.5" fill="#2D1B00" />
          <path d="M38 12 Q40 6 38 4" stroke="#2D1B00" strokeWidth="1" fill="none" />
          <circle cx="38" cy="4" r="1.5" fill="#2D1B00" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ============================================
   Trust Badge Component (Pill Style)
   ============================================ */
function TrustBadge({
  icon: Icon,
  children,
  delay,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="glass-card px-4 py-2 flex items-center gap-2 text-white/70 text-xs sm:text-sm cursor-default transition-colors hover:text-white/90 hover:bg-white/12"
    >
      <Icon className="w-4 h-4 text-honey-400 flex-shrink-0" />
      {children}
    </motion.div>
  );
}

/* ============================================
   Golden Sparkle / Star Particle
   ============================================ */
function GoldenSparkle({
  style,
  delay,
  duration,
  size,
}: {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  size: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.8, 0.4, 0.9, 0], scale: [0, 1, 0.6, 1.1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <Sparkles
        className="text-honey-300"
        style={{ width: size, height: size, opacity: 0.6 }}
      />
    </motion.div>
  );
}

/* ============================================
   Mouse Scroll Indicator
   ============================================ */
function MouseScrollIndicator({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-white/50 hover:text-white/70 transition-colors group"
      aria-label={label}
    >
      <span className="text-xs tracking-widest uppercase mb-1">{label}</span>
      {/* Mouse icon */}
      <div className="relative w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors">
        <motion.div
          animate={{ y: [2, 14, 2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 -translate-x-1/2 top-1.5 w-1 h-2.5 rounded-full bg-white/50 group-hover:bg-white/70 transition-colors"
        />
      </div>
      <ChevronDown className="w-4 h-4" />
    </motion.button>
  );
}

/* ============================================
   Hero Component
   ============================================ */
export default function Hero() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => scrollToSection('products');
  const scrollToVisit = () => scrollToSection('visit');

  // Parallax scroll tracking
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroImageScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroContentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -60]);

  // Hero scroll progress (0-100 as user scrolls through hero)
  const [heroProgress, setHeroProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const heroHeight = sectionRef.current.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min((scrolled / heroHeight) * 100, 100);
      setHeroProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Staggered word animation for title
  const titleWords = useMemo(() => t.hero.title.split(' '), [t.hero.title]);
  // Highlight the second-to-last word
  const highlightIndex = titleWords.length - 2;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  } as const;

  // Sparkle positions
  const sparkles = useMemo(
    () => [
      { top: '15%', left: '8%', size: 14, delay: 0.5, duration: 5 },
      { top: '35%', right: '12%', size: 10, delay: 1.2, duration: 6 },
      { top: '60%', left: '18%', size: 12, delay: 0.8, duration: 4.5 },
      { top: '22%', right: '22%', size: 8, delay: 2.0, duration: 5.5 },
      { top: '70%', right: '8%', size: 16, delay: 1.5, duration: 7 },
      { top: '45%', left: '5%', size: 10, delay: 3.0, duration: 6.5 },
      { top: '55%', left: '40%', size: 8, delay: 2.5, duration: 5 },
      { top: '80%', left: '60%', size: 12, delay: 0.3, duration: 4 },
    ],
    []
  );

  // Trusted-by badges
  const trustedBadges = [
    { label: 'Eko Sklad', icon: ShieldCheck, delay: 1.3 },
    { label: 'HACCP', icon: ShieldCheck, delay: 1.4 },
    { label: 'Apis mellifera carnica', icon: Flower2, delay: 1.5 },
    { label: 'EU Organic', icon: ShieldCheck, delay: 1.6 },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: heroImageY,
          scale: heroImageScale,
        }}
      >
        <img
          src="/images/hero.jpg"
          alt="Panji čebelarstva Veselič v Beli krajini ob sončnem zahodu"
          className="w-full h-[120%] object-cover -translate-y-[10%]"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        {/* Warm honey tint */}
        <div className="absolute inset-0 bg-honey-900/10 mix-blend-overlay" />
      </motion.div>

      {/* Hex pattern overlay */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] mix-blend-overlay opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* ============================================
          Floating Honeycomb Decorations
          ============================================ */}
      <FloatingHoneycomb
        size={120}
        style={{ top: '10%', left: '5%' }}
        delay={0.5}
        duration={12}
      />
      <FloatingHoneycomb
        size={80}
        style={{ top: '20%', right: '8%' }}
        delay={1.0}
        duration={10}
      />
      <FloatingHoneycomb
        size={60}
        style={{ bottom: '30%', left: '12%' }}
        delay={1.5}
        duration={14}
      />
      <FloatingHoneycomb
        size={100}
        style={{ top: '55%', right: '5%' }}
        delay={0.8}
        duration={11}
      />
      <FloatingHoneycomb
        size={45}
        style={{ top: '70%', left: '30%' }}
        delay={2.0}
        duration={9}
      />
      <FloatingHoneycomb
        size={70}
        style={{ top: '5%', right: '30%' }}
        delay={1.2}
        duration={13}
      />

      {/* ============================================
          Animated Flying Bee
          ============================================ */}
      <FlyingBee />

      {/* ============================================
          Parallax Golden Sparkles
          ============================================ */}
      {sparkles.map((sparkle, i) => (
        <GoldenSparkle
          key={i}
          style={{ top: sparkle.top, left: 'left' in sparkle ? sparkle.left : undefined, right: 'right' in sparkle ? sparkle.right : undefined }}
          delay={sparkle.delay}
          duration={sparkle.duration}
          size={sparkle.size}
        />
      ))}

      {/* ============================================
          Hero Content with parallax fade
          ============================================ */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: heroContentOpacity,
          y: heroContentY,
        }}
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-white/90 text-xs sm:text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-honey-400 animate-pulse" />
            {t.hero.tagline}
          </span>
        </motion.div>

        {/* Title - staggered word animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight text-shadow-honey"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.3em] ${
                i === highlightIndex ? 'gradient-text-animated' : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA with pulsing glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-honey-400 to-honey-600 rounded-2xl opacity-30 blur-lg pulse-glow" />
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bounce-idle ripple-effect relative group min-w-[200px] bg-gradient-to-r from-honey-400 to-honey-500 hover:from-honey-500 hover:to-honey-600 text-white shadow-xl shadow-honey-900/30 text-base font-semibold px-8 py-6 h-auto rounded-xl transition-all hover:shadow-2xl hover:shadow-honey-900/40 hover:scale-[1.02]"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToVisit}
            className="group min-w-[200px] bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white/25 hover:border-white/60 hover:text-white text-base font-semibold px-8 py-6 h-auto rounded-xl transition-all shadow-lg shadow-black/10 hover:scale-[1.02]"
          >
            {t.hero.ctaSecondary}
          </Button>
        </motion.div>

        {/* Original trust indicators as pill badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <TrustBadge icon={ShieldCheck} delay={1.3}>
            Eko Sklad Certified
          </TrustBadge>
          <TrustBadge icon={Flower2} delay={1.45}>
            Apis mellifera carnica
          </TrustBadge>
          <TrustBadge icon={MapPin} delay={1.6}>
            100% Bela krajina
          </TrustBadge>
        </motion.div>

        {/* ============================================
            Trusted By Row - compact badge strip
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <span className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
            {lang === 'sl' ? 'Preverjeno' : 'Trusted by'}:
          </span>
          {trustedBadges.map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: badge.delay }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] sm:text-xs font-medium"
            >
              <badge.icon className="w-3 h-3 text-honey-400/70" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ============================================
          Scroll hint with mouse icon
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <MouseScrollIndicator onClick={scrollToProducts} label={t.hero.scrollHint} />
      </motion.div>

      {/* ============================================
          Hero scroll progress indicator
          ============================================ */}
      <div className="hero-scroll-progress" style={{ width: `${heroProgress}%` }} />

      {/* ============================================
          CSS Floating Hexagon Particles
          ============================================ */}
      <div className="hex-particle" style={{ top: '18%', left: '12%' }}>
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none"><path d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z" stroke="rgba(245,215,110,0.2)" strokeWidth="2" fill="rgba(245,215,110,0.03)"/></svg>
      </div>
      <div className="hex-particle" style={{ top: '65%', right: '15%' }}>
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none"><path d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z" stroke="rgba(212,160,23,0.18)" strokeWidth="2" fill="rgba(212,160,23,0.03)"/></svg>
      </div>
      <div className="hex-particle" style={{ top: '35%', left: '80%' }}>
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none"><path d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z" stroke="rgba(184,134,11,0.15)" strokeWidth="2" fill="rgba(184,134,11,0.02)"/></svg>
      </div>
      <div className="hex-particle" style={{ bottom: '25%', left: '6%' }}>
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none"><path d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z" stroke="rgba(245,215,110,0.16)" strokeWidth="2" fill="rgba(245,215,110,0.02)"/></svg>
      </div>

      {/* ============================================
          Gradient Wave Divider at bottom (3 layers)
          ============================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-honey-200)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--color-honey-400)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-honey-200)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="hsl(45, 20%, 97%)" />
            </linearGradient>
            <linearGradient id="wave-fill-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="hsl(45, 10%, 16%)" />
            </linearGradient>
          </defs>
          {/* Primary wave */}
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="url(#wave-fill)"
            className="dark:hidden"
          />
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="url(#wave-fill-dark)"
            className="hidden dark:block"
          />
          {/* Decorative thin wave line */}
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60"
            fill="none"
            stroke="url(#wave-gradient-hero)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Secondary thinner wave */}
          <path
            d="M0,75 C240,40 480,100 720,70 C960,40 1200,90 1440,65"
            fill="none"
            stroke="url(#wave-gradient-hero)"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
}
