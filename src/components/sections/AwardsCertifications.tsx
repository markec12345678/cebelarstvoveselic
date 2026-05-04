'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Leaf, Shield, Globe, Award, MapPin, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';

const certifications = [
  {
    icon: Leaf,
    titleSl: 'Eko Sklad certifikat',
    titleEn: 'Eko Sklad Certificate',
    descSl: 'Ekološko certificiran med v skladu s predpisi Republike Slovenije za ekološko kmetijstvo. Redna letna preverjanja in nadzor.',
    descFullSl: 'Certifikat Eko Sklad potrjuje, da je ves naš med pridelan v skladu z načeli ekološkega kmetijstva: brez sintetičnih kemikalij, brez antibiotikov pri zdravljenju čebel, brez dodanega sladkorja med cvetenjem in brez segrevanja nad 40 °C. Preverjanja potekajo vsako leto s strani kontrolnih organov.',
    descEn: 'Organic certified honey in accordance with Republic of Slovenia regulations for organic farming. Regular annual inspections and oversight.',
    descFullEn: 'The Eko Sklad certificate confirms that all our honey is produced in accordance with organic farming principles: no synthetic chemicals, no antibiotics for bee treatment, no added sugar during blooming, and no heating above 40 °C. Inspections are conducted annually by control bodies.',
    year: '2024',
    badge: lang => lang === 'sl' ? 'Ekološko' : 'Organic',
    badgeColor: 'bg-emerald-500',
    gradient: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800/40',
  },
  {
    icon: Shield,
    titleSl: 'HACCP standard',
    titleEn: 'HACCP Standard',
    descSl: 'Sistem analize tveganj in kritičnih kontrolnih točk za varnost živil. Zagotavlja najvišje standarde higiene.',
    descFullSl: 'HACCP (Hazard Analysis Critical Control Points) sistem vključuje natančno sledljivost vsake serije medu od panja do kozarca, redno mikrobiološko testiranje, dokumentiranje vseh procesov in usposabljanje osebja. Zagotavljamo, da vsak kozarec medu ustreza najvišjim standardom varnosti živil.',
    descEn: 'Hazard Analysis and Critical Control Points food safety system. Ensures the highest hygiene standards.',
    descFullEn: 'The HACCP system includes precise traceability of each honey batch from hive to jar, regular microbiological testing, documentation of all processes, and staff training. We ensure that every jar of honey meets the highest food safety standards.',
    year: '2020',
    badge: lang => lang === 'sl' ? 'Varnost živil' : 'Food Safety',
    badgeColor: 'bg-blue-500',
    gradient: 'from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
  },
  {
    icon: Globe,
    titleSl: 'EU (EU) 2018/848',
    titleEn: 'EU Regulation (EU) 2018/848',
    descSl: 'Skladnost s predpisi EU o ekološkem kmetijstvu in označevanju ekoloških živil za celoten evropski trg.',
    descFullSl: 'Uredba (EU) 2018/848 ureja pridelavo, nadzor in označevanje ekoloških živil v celotni Evropski uniji. Naš med izpolnjuje vse zahteve te uredbe, kar nam omogoča prodajo in distribucijo v vseh državah EU z uradnim ekološkim logotipom.',
    descEn: 'Compliance with EU organic farming regulations and organic food labeling for the entire European market.',
    descFullEn: 'Regulation (EU) 2018/848 governs the production, control, and labeling of organic foods throughout the European Union. Our honey meets all requirements of this regulation, allowing us to sell and distribute in all EU countries with the official organic logo.',
    year: '2024',
    badge: lang => lang === 'sl' ? 'EU predpisi' : 'EU Compliant',
    badgeColor: 'bg-amber-500',
    gradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800/40',
  },
  {
    icon: Award,
    titleSl: 'Čebela kranjska certifikat',
    titleEn: 'A. m. carnica Breed Certificate',
    descSl: 'Potrdilo o čistosti pasme Apis mellifera carnica — avtohtone slovenske čebele. Zavarovana genetska dediščina.',
    descFullSl: 'Potrdilo potrjuje, da vse čebele na našem čebeljnjaku pripadajo čisti pasmi Apis mellifera carnica (slovenska kranjska čebela). To je edina zakonsko zaščitena avtohtona pasma čebel na svetu. Skrbimo za ohranjanje genetske čistosti z rednim selekcijskim delom in nadzorom matičnih čebel.',
    descEn: 'Certificate confirming the purity of the Apis mellifera carnica breed — the native Slovenian bee. Protected genetic heritage.',
    descFullEn: 'The certificate confirms that all bees in our apiary belong to the pure Apis mellifera carnica (Carniolan honey bee) breed. This is the only legally protected native bee breed in the world. We maintain genetic purity through regular selection work and queen bee monitoring.',
    year: '2018',
    badge: lang => lang === 'sl' ? 'Avtohtona pasma' : 'Native Breed',
    badgeColor: 'bg-red-500',
    gradient: 'from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20',
    borderColor: 'border-red-200 dark:border-red-800/40',
  },
  {
    icon: MapPin,
    titleSl: 'Kakovost Bele krajine',
    titleEn: 'Bela Krajina Quality Label',
    descSl: 'Regionalno priznanje kakovosti za izdelke iz Bele krajine. Dokaz lokalnega porekla in tradicionalne pridelave.',
    descFullSl: 'Znak kakovosti Bele krajine je regionalno priznanje, ki ga prejmejo izdelki z dokazanim poreklom iz Bele krajine. Pridobljen je na podlagi pregleda celotnega postopka pridelave, geografskega porekla in skladnosti s tradicionalnimi praksami. Simbolizuje povezavo med izdelkom in edinstvenim terroirjem Bele krajine.',
    descEn: 'Regional quality recognition for products from Bela Krajina. Proof of local origin and traditional production.',
    descFullEn: 'The Bela Krajina Quality Mark is a regional recognition awarded to products with proven origin from Bela Krajina. It is obtained based on a review of the entire production process, geographical origin, and compliance with traditional practices. It symbolizes the connection between the product and the unique terroir of Bela Krajina.',
    year: '2022',
    badge: lang => lang === 'sl' ? 'Regijska oznaka' : 'Regional Label',
    badgeColor: 'bg-purple-500',
    gradient: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800/40',
  },
  {
    icon: Clock,
    titleSl: '30 let tradicije',
    titleEn: '30 Years of Tradition',
    descSl: 'Od leta 1994 do danes — tri generacije čebelarjev, ki ohranjajo tradicijo in znanje. Dednost, ki se prenaša naprej.',
    descFullSl: 'Čebelarstvo Veselič ima bogato zgodovino, ki se začne leta 1994 s 5 panji v Čurelah. Skozi tri generacije smo zrasli na 100+ panjev, pridobili ekološko certifikacijo, lansirali spletno trgovino in dostavo po celotni EU. Vse skozi smo ohranjali tradicionalen pristop k čebelarstvu — spoštovanje do narave in čebel.',
    descEn: 'From 1994 to today — three generations of beekeepers preserving tradition and knowledge. A heritage carried forward.',
    descFullEn: 'Čebelarstvo Veselič has a rich history starting in 1994 with 5 hives in Čurile. Through three generations, we have grown to 100+ hives, obtained organic certification, launched an online store, and deliver across the entire EU. Throughout, we have maintained a traditional approach to beekeeping — respect for nature and the bees.',
    year: '1990–2024',
    badge: lang => lang === 'sl' ? 'Tradycija' : 'Heritage',
    badgeColor: 'bg-orange-500',
    gradient: 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800/40',
  },
];

interface CertCardProps {
  cert: (typeof certifications)[0];
  index: number;
  lang: 'sl' | 'en';
  verifiedLabel: string;
}

function CertCard({ cert, index, lang, verifiedLabel }: CertCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = cert.icon;
  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl border ${cert.borderColor} ${cert.gradient} p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
    >
      {/* Gold glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-honey-200/20 to-amber-200/20 dark:from-honey-700/10 dark:to-amber-700/10 rounded-2xl pointer-events-none" />

      {/* Year badge top-right */}
      <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
        {cert.year}
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight pr-16">
            {t(cert.titleSl, cert.titleEn)}
          </h3>
          <span className={`inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-white ${cert.badgeColor} px-2 py-0.5 rounded-full`}>
            {cert.badge(lang)}
          </span>
        </div>
      </div>

      {/* Description - changes on hover */}
      <div className="relative min-h-[4rem]">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.p
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {t(cert.descSl, cert.descEn)}
            </motion.p>
          ) : (
            <motion.p
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-foreground/80 leading-relaxed"
            >
              {t(cert.descFullSl, cert.descFullEn)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar: Verified badge + hover hint */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" />
          {verifiedLabel}
        </span>
        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {lang === 'sl' ? 'Za več pojdite nad kartico' : 'Hover for details'}
        </span>
      </div>

      {/* Animated gold border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(212, 160, 23, 0.3), 0 4px 20px rgba(212, 160, 23, 0.08)' }} />
    </motion.div>
  );
}

export default function AwardsCertifications() {
  const { lang } = useLangStore();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  const verifiedLabel = t('Preverjeno', 'Verified');
  const sectionTitle = t('Priznanja in certifikati', 'Awards & Certifications');
  const sectionSubtitle = t(
    'Naša zaveza kakovosti je potrjena s certifikati in priznanji mednarodnih ter nacionalnih institucij.',
    'Our commitment to quality is verified by certificates and recognitions from international and national institutions.'
  );
  const ctaText = t('Zahtevajte certifikat', 'Request Certificate');

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle golden gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/40 via-background to-honey-50/20 dark:from-honey-950/10 dark:via-background dark:to-honey-950/5 pointer-events-none" />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-honey-300/30 dark:border-honey-700/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-honey-300/30 dark:border-honey-700/20 rounded-br-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/30 text-honey-700 dark:text-honey-400 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            {t('Kakovost potrjena', 'Quality Verified')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Certification cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertCard
              key={index}
              cert={cert}
              index={index}
              lang={lang}
              verifiedLabel={verifiedLabel}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-honey-500 to-amber-500 hover:from-honey-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
