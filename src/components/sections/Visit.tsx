'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TreePine, UtensilsCrossed, Users, ArrowRight, Phone, Calendar, Clock, Sun, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

function getSeasonInfo(lang: 'sl' | 'en') {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) {
    return {
      season: lang === 'sl' ? 'Pomlad' : 'Spring',
      status: lang === 'sl' ? 'Odprto za obiske' : 'Open for visits',
      icon: Flower2,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      borderColor: 'border-green-200 dark:border-green-800/30',
      textColor: 'text-green-700 dark:text-green-400',
    };
  } else if (month >= 5 && month <= 8) {
    return {
      season: lang === 'sl' ? 'Poletje' : 'Summer',
      status: lang === 'sl' ? 'Odprto za obiske — glavna sezona' : 'Open for visits — peak season',
      icon: Sun,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
      borderColor: 'border-amber-200 dark:border-amber-800/30',
      textColor: 'text-amber-700 dark:text-amber-400',
    };
  } else if (month >= 9 && month <= 10) {
    return {
      season: lang === 'sl' ? 'Jesen' : 'Autumn',
      status: lang === 'sl' ? 'Omejene mogučnosti obiskov' : 'Limited visit availability',
      icon: Flower2,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/10',
      borderColor: 'border-orange-200 dark:border-orange-800/30',
      textColor: 'text-orange-700 dark:text-orange-400',
    };
  }
  return {
    season: lang === 'sl' ? 'Zima' : 'Winter',
    status: lang === 'sl' ? 'Zaprto za obiske' : 'Closed for visits',
    icon: Snow,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    borderColor: 'border-blue-200 dark:border-blue-800/30',
    textColor: 'text-blue-700 dark:text-blue-400',
  };
}

function Snow(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M12 2v20M2 12h20M20 16l-4-4M20 8l-4 4M4 16l4-4M4 8l4 4M12 2l-2 3h4zM12 22l-2-3h4zM2 12l3-2v4zM22 12l-3-2v4z" />
    </svg>
  );
}

function getCurrentDayHours(lang: 'sl' | 'en') {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon...
  const days = lang === 'sl'
    ? ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = lang === 'sl'
    ? ['Zaprto', '8:00–17:00', '8:00–17:00', '8:00–17:00', '8:00–17:00', '8:00–17:00', '9:00–13:00']
    : ['Closed', '8:00–17:00', '8:00–17:00', '8:00–17:00', '8:00–17:00', '8:00–17:00', '9:00–13:00'];
  return days.map((day, i) => ({
    day,
    hours: hours[i],
    isCurrent: i === dayOfWeek,
  }));
}

export default function Visit() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const season = getSeasonInfo(lang);
  const weekDays = getCurrentDayHours(lang);

  const features = [
    {
      icon: TreePine,
      title: t.visit.feature1Title,
      desc: t.visit.feature1Desc,
    },
    {
      icon: UtensilsCrossed,
      title: t.visit.feature2Title,
      desc: t.visit.feature2Desc,
    },
    {
      icon: Users,
      title: t.visit.feature3Title,
      desc: t.visit.feature3Desc,
    },
  ];

  return (
    <section id="visit" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-background to-honey-50/30" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with honeycomb overlay */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-forest/10">
              <img
                src="/images/visit.jpg"
                alt="Čebelarska domačija Veselič v Čurelah — tradicionalna slovenska kmetija z obiskovalci"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
              {/* Honeycomb pattern overlay */}
              <div className="absolute inset-0 honeycomb-overlay pointer-events-none opacity-20" />
            </div>

            {/* Seasonal badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`absolute top-4 right-4 ${season.bgColor} border ${season.borderColor} backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-lg`}
            >
              <div className="flex items-center gap-2">
                <season.icon className={`w-4 h-4 ${season.textColor}`} />
                <div>
                  <div className={`text-xs font-bold ${season.textColor}`}>
                    {lang === 'sl' ? 'Trenutna sezona' : 'Current Season'}: {season.season}
                  </div>
                  <div className={`text-[10px] ${season.textColor} opacity-70`}>
                    {season.status}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening hours card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl w-[200px]"
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-honey-500" />
                <span className="text-xs font-semibold text-foreground">
                  {lang === 'sl' ? 'Odprto' : 'Open Hours'}
                </span>
              </div>
              <div className="space-y-1">
                {weekDays.map((d) => (
                  <div
                    key={d.day}
                    className={`flex items-center justify-between text-[11px] px-1.5 py-0.5 rounded ${
                      d.isCurrent
                        ? 'bg-honey-100 dark:bg-honey-900/20 font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className={d.isCurrent ? 'text-honey-700 dark:text-honey-400' : ''}>{d.day}</span>
                    <span className={d.isCurrent ? 'text-honey-700 dark:text-honey-400' : ''}>{d.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-forest to-forest-light rounded-2xl -z-10 opacity-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
              {t.visit.sectionTag}
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t.visit.title}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.visit.subtitle}
            </p>

            {/* Features with icon animation */}
            <div className="mt-8 space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-honey-200 dark:hover:border-honey-800 transition-colors group"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center group-hover:bg-honey-200 dark:group-hover:bg-honey-900/30 transition-colors"
                  >
                    <feature.icon className="w-5 h-5 text-honey-600 dark:text-honey-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs with calendar icon */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-lg"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {t.visit.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+38641234567">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.visit.ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-honey-500 mt-0.5">ℹ</span>
              {t.visit.note}
            </p>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
