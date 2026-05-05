'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Gift,
  ShoppingCart,
  Star,
  CheckCircle,
  Truck,
  Package,
  Sparkles,
  Award,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { useLangStore } from '@/store/language';

/* ─── Gift set data (bilingual) ─── */
interface GiftSet {
  id: string;
  nameSl: string;
  nameEn: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  descriptionSl: string;
  descriptionEn: string;
  image: string;
  images: string[];
  contentsSl: string[];
  contentsEn: string[];
  packagingSl: string;
  packagingEn: string;
  ribbon?: 'bestseller' | 'limited' | 'popular' | 'sale';
}

const GIFT_SETS: GiftSet[] = [
  {
    id: 'discovery',
    nameSl: 'Odkritje',
    nameEn: 'Discovery Set',
    price: 24.9,
    oldPrice: 27.67,
    rating: 4.8,
    reviews: 34,
    descriptionSl:
      'Popolna izbira za začetnike, ki želite spoznati raznolikost naših medov. Tri mini kozarčki v elegantni škatli.',
    descriptionEn:
      'Perfect for beginners wanting to discover our honey variety. Three mini jars in an elegant box.',
    image: '/images/honey/acacia.jpg',
    images: [
      '/images/honey/acacia.jpg',
      '/images/honey/wildflower.jpg',
      '/images/honey/forest.jpg',
    ],
    contentsSl: [
      '3 × 120g akacijev med',
      '3 × 120g cvetlični med',
      '3 × 120g gozdni med',
      'Elegantna papirnata škatla',
      'Okusna navodila',
    ],
    contentsEn: [
      '3 × 120g Acacia honey',
      '3 × 120g Wildflower honey',
      '3 × 120g Forest honey',
      'Elegant kraft paper box',
      'Tasting guide included',
    ],
    packagingSl: 'Elegantna kraft papirnata škatla s čebeljim vzorcem',
    packagingEn: 'Elegant kraft paper box with honeycomb pattern',
    ribbon: 'sale',
  },
  {
    id: 'family',
    nameSl: 'Družinski',
    nameEn: 'Family Set',
    price: 39.9,
    rating: 5.0,
    reviews: 89,
    descriptionSl:
      'Popolna zbirka vseh šestih sort medu za celo družino. Leseno podarilno pakiranje z možnostjo graviranja.',
    descriptionEn:
      'Complete collection of all six honey varieties for the whole family. Wooden gift box with engraving option.',
    image: '/images/honey/wildflower.jpg',
    images: [
      '/images/honey/acacia.jpg',
      '/images/honey/linden.jpg',
      '/images/honey/chestnut.jpg',
      '/images/honey/wildflower.jpg',
      '/images/honey/forest.jpg',
      '/images/honey/fir.jpg',
    ],
    contentsSl: [
      '6 × 250g akacijev med',
      '6 × 250g lipov med',
      '6 × 250g kostanjev med',
      '6 × 250g cvetlični med',
      '6 × 250g gozdni med',
      '6 × 250g med brstov smreke',
      'Leseno podarilno pakiranje',
      'Kartica z okusnimi opombi',
      'Možnost graviranja',
    ],
    contentsEn: [
      '6 × 250g Acacia honey',
      '6 × 250g Linden honey',
      '6 × 250g Chestnut honey',
      '6 × 250g Wildflower honey',
      '6 × 250g Forest honey',
      '6 × 250g Fir honeydew honey',
      'Wooden gift box',
      'Tasting notes card',
      'Personalized engraving option',
    ],
    packagingSl: 'Leseno podarilno pakiranje z možnostjo osebnega graviranja',
    packagingEn: 'Wooden gift box with personalized engraving option',
    ribbon: 'bestseller',
  },
  {
    id: 'chocolate',
    nameSl: 'Medena čokolada',
    nameEn: 'Honey & Chocolate',
    price: 29.9,
    rating: 4.9,
    reviews: 52,
    descriptionSl:
      'Izjemna kombinacija naših specialty medov s slovenskimi rokodelskimi čokoladami. Premium podarilno pakiranje.',
    descriptionEn:
      'Exceptional pairing of our specialty honeys with Slovenian artisan chocolates. Premium gift packaging.',
    image: '/images/honey/chestnut.jpg',
    images: [
      '/images/honey/chestnut.jpg',
      '/images/honey/forest.jpg',
      '/images/honey/fir.jpg',
    ],
    contentsSl: [
      '1 × 250g kostanjev med',
      '1 × 250g gozdni med',
      '1 × 250g med brstov smreke',
      '3 × slovenske rokodelske čokolade',
      'Premium podarilna škatla s trakom',
      'Paringski vodnik',
    ],
    contentsEn: [
      '1 × 250g Chestnut honey',
      '1 × 250g Forest honey',
      '1 × 250g Fir honeydew honey',
      '3 × Slovenian artisan chocolates',
      'Premium gift box with ribbon',
      'Pairing guide',
    ],
    packagingSl: 'Premium podarilna škatla z satenastim trakom',
    packagingEn: 'Premium gift box with satin ribbon',
    ribbon: 'popular',
  },
  {
    id: 'heritage',
    nameSl: 'Bela krajina',
    nameEn: 'Bela Krajina Heritage',
    price: 54.9,
    rating: 5.0,
    reviews: 18,
    descriptionSl:
      'Omejena izdaja — popolna premium zbirka v dekorativni keramični garnituri. Vse kar ponujamo v enem nadvse posebnem setu.',
    descriptionEn:
      'Limited edition — complete premium collection in decorative ceramic jar set. Everything we offer in one extraordinary set.',
    image: '/images/honey/fir.jpg',
    images: [
      '/images/honey/acacia.jpg',
      '/images/honey/linden.jpg',
      '/images/honey/chestnut.jpg',
      '/images/honey/wildflower.jpg',
      '/images/honey/forest.jpg',
      '/images/honey/fir.jpg',
    ],
    contentsSl: [
      '6 × 500g vseh sort medu',
      '1 × 250g kremni med',
      'Keramična dekorativna garnitura',
      'Čebeljarski koledar 2025',
      'Medeni nabiralnik iz lesa',
      'Zgodba o čebelarstvu Veselič',
      'Darilni certifikat pristnosti',
    ],
    contentsEn: [
      '6 × 500g all honey varieties',
      '1 × 250g cream honey',
      'Decorative ceramic jar set',
      'Beekeeping calendar 2025',
      'Wooden honey dipper',
      'Story of Veselič Beekeeping',
      'Authenticity gift certificate',
    ],
    packagingSl: 'Dekorativna keramična garnitura s kompletom dodatkov',
    packagingEn: 'Decorative ceramic jar set with full accessory kit',
    ribbon: 'limited',
  },
];

/* ─── Helpers ─── */
function formatPrice(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

function StarRating({ rating, reviews, size = 'sm' }: { rating: number; reviews: number; size?: 'sm' | 'lg' }) {
  const iconSize = size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
      <span className={`font-semibold text-foreground ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
        {rating.toFixed(1)}
      </span>
      <span className={`text-muted-foreground ${size === 'lg' ? 'text-xs' : 'text-[10px]'}`}>
        ({reviews})
      </span>
    </div>
  );
}

/* ─── Ribbon Component ─── */
function GiftRibbon({
  type,
  lang,
}: {
  type: 'bestseller' | 'limited' | 'popular' | 'sale';
  lang: 'sl' | 'en';
}) {
  if (type === 'sale') {
    const label = lang === 'sl' ? '-10 %' : '-10%';
    return (
      <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 border-0 shadow-sm">
        {label}
      </Badge>
    );
  }

  if (type === 'bestseller') {
    const label = lang === 'sl' ? 'Najbolj prodajan' : 'Best Seller';
    return (
      <motion.div
        className="absolute top-3 right-[-32px] w-[128px] text-center z-10"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="bg-gradient-to-r from-honey-500 to-honey-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 rotate-45 shadow-lg">
          {label}
        </div>
      </motion.div>
    );
  }

  if (type === 'limited') {
    const label = lang === 'sl' ? 'Omejena izdaja' : 'Limited Edition';
    return (
      <div className="absolute top-0 left-0 right-0 z-10 overflow-hidden rounded-t-xl">
        <div
          className="text-center py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 via-honey-500 to-amber-600"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
            paddingBottom: '12px',
          }}
        >
          <Sparkles className="w-3 h-3 inline-block mr-1 -mt-0.5" />
          {label}
        </div>
      </div>
    );
  }

  if (type === 'popular') {
    const label = lang === 'sl' ? 'Priljubljen' : 'Most Popular';
    return (
      <Badge className="absolute top-3 left-3 z-10 bg-honey-500 text-white text-[10px] font-semibold px-2 py-0.5 border-0 shadow-sm">
        <Heart className="w-3 h-3 mr-1 fill-current" />
        {label}
      </Badge>
    );
  }

  return null;
}

/* ─── Main Component ─── */
export default function HoneyGiftSets() {
  const { lang } = useLangStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gift-sets" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-50/30 to-background dark:via-honey-950/10" />
      <div className="absolute inset-0 hex-pattern opacity-15" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <Gift className="w-3.5 h-3.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {lang === 'sl' ? 'Darilni seti' : 'Gift Sets'}
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'sl'
              ? 'Popolno darilo za vsako priložnost'
              : 'The Perfect Gift for Every Occasion'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {lang === 'sl'
              ? 'Izberite med skrbno sestavljenimi podarilnimi seti — od majhnega odkritja do premium zbirke beokranjske dediščine. Vsak set je že lepo zapakiran.'
              : 'Choose from our carefully curated gift sets — from a small discovery to the premium Bela Krajina heritage collection. Each set comes beautifully wrapped.'}
          </p>
        </motion.div>

        {/* ── Gift Set Cards Grid ── */}
        <div className="mt-14 grid sm:grid-cols-2 gap-6 lg:gap-8">
          {GIFT_SETS.map((set, i) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
                delay: 0.12 + i * 0.1,
              }}
            >
              <Card className="group relative overflow-hidden card-shine card-border-glow border-border/50 hover:border-honey-300 dark:hover:border-honey-700 h-full transition-all duration-500 hover:-translate-y-1">
                {/* ── Card Image Area ── */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  {/* Multi-image collage */}
                  <div className="absolute inset-0 flex">
                    <div className="relative flex-1">
                      <img
                        src={set.images[0]}
                        alt={lang === 'sl' ? set.nameSl : set.nameEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {set.images[1] && (
                      <div className="relative w-1/3 hidden sm:block">
                        <img
                          src={set.images[1]}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 border-l border-white/30" />
                      </div>
                    )}
                    {set.images[2] && (
                      <div className="relative w-1/4 hidden sm:block">
                        <img
                          src={set.images[2]}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 border-l border-white/30" />
                      </div>
                    )}
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Honey accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-honey-300 via-honey-500 to-honey-700" />

                  {/* Ribbon / Badge */}
                  <GiftRibbon type={set.ribbon!} lang={lang} />

                  {/* Item count overlay */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                      <Package className="w-3 h-3 text-white/90" />
                      <span className="text-[11px] font-medium text-white/90">
                        {set.contentsSl.length}{' '}
                        {lang === 'sl' ? 'izdelkov' : 'items'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Card Content ── */}
                <CardContent className="p-5 sm:p-6 flex flex-col">
                  {/* Title + Rating Row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-honey-700 dark:group-hover:text-honey-400 transition-colors">
                        {lang === 'sl' ? set.nameSl : set.nameEn}
                      </h3>
                      <div className="mt-1">
                        <StarRating rating={set.rating} reviews={set.reviews} />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {lang === 'sl' ? set.descriptionSl : set.descriptionEn}
                  </p>

                  {/* Contents List */}
                  <div className="mt-4 space-y-1.5">
                    {(lang === 'sl' ? set.contentsSl : set.contentsEn)
                      .slice(0, 5)
                      .map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + i * 0.1 + idx * 0.04 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-honey-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-snug">{item}</span>
                        </motion.div>
                      ))}
                    {(lang === 'sl' ? set.contentsSl : set.contentsEn).length > 5 && (
                      <span className="text-[10px] text-honey-600 dark:text-honey-400 font-medium pl-5.5">
                        +{(lang === 'sl' ? set.contentsSl : set.contentsEn).length - 5}{' '}
                        {lang === 'sl' ? 'več ...' : 'more ...'}
                      </span>
                    )}
                  </div>

                  {/* Packaging note */}
                  <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-honey-50/60 dark:bg-honey-900/10 border border-honey-200/40 dark:border-honey-800/20">
                    <Gift className="w-3.5 h-3.5 text-honey-600 dark:text-honey-400 flex-shrink-0" />
                    <span className="text-[11px] text-honey-700 dark:text-honey-300">
                      {lang === 'sl' ? set.packagingSl : set.packagingEn}
                    </span>
                  </div>

                  {/* Price + CTA Row */}
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-end justify-between">
                    {/* Price display */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          className="text-2xl font-bold honey-text-gradient"
                          initial={{ scale: 0.9 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ type: 'spring', delay: 0.4 + i * 0.1 }}
                        >
                          {formatPrice(set.price)}
                        </motion.span>
                        {set.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(set.oldPrice)}
                          </span>
                        )}
                      </div>
                      {set.oldPrice && (
                        <span className="text-[10px] font-semibold text-red-500 dark:text-red-400">
                          {lang === 'sl'
                            ? `Prihranite ${formatPrice(set.oldPrice - set.price)}`
                            : `Save ${formatPrice(set.oldPrice - set.price)}`}
                        </span>
                      )}
                    </div>

                    {/* Add to cart button */}
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={scrollToOrder}
                        className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all honey-shine-btn"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1.5" />
                        {lang === 'sl' ? 'V košarico' : 'Add to Cart'}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={scrollToOrder}
            variant="outline"
            className="border-honey-300 dark:border-honey-700 text-honey-700 dark:text-honey-400 hover:bg-honey-50 dark:hover:bg-honey-900/20 hover:text-honey-800 dark:hover:text-honey-300 transition-all"
          >
            {lang === 'sl' ? 'Vsi darilni seti' : 'View All Gift Sets'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* ── Trust Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 shadow-sm">
            <Truck className="w-4 h-4 text-honey-600 dark:text-honey-400" />
            <span className="text-xs font-medium text-muted-foreground">
              {lang === 'sl'
                ? 'Brezplačna dostava nad €50'
                : 'Free shipping over €50'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 shadow-sm">
            <Gift className="w-4 h-4 text-honey-600 dark:text-honey-400" />
            <span className="text-xs font-medium text-muted-foreground">
              {lang === 'sl'
                ? 'Darilno pakiranje brez doplačila'
                : 'Gift wrapping included'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 shadow-sm">
            <Award className="w-4 h-4 text-honey-600 dark:text-honey-400" />
            <span className="text-xs font-medium text-muted-foreground">
              {lang === 'sl'
                ? '100 % zadovoljstvo garancija'
                : '100% satisfaction guarantee'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
