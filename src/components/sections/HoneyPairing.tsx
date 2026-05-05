'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, ChefHat, ArrowRight, Sparkles } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

interface FoodPairing {
  emoji: string;
  nameSl: string;
  nameEn: string;
  rating: number;
  recipe?: {
    titleSl: string;
    titleEn: string;
    descSl: string;
    descEn: string;
  };
}

interface HoneyType {
  id: string;
  color: string;
  colorBg: string;
  pairings: FoodPairing[];
}

const honeyTypes: HoneyType[] = [
  {
    id: 'acacia',
    color: '#F5E6A3',
    colorBg: 'bg-amber-50 dark:bg-amber-950/30',
    pairings: [
      { emoji: '🍵', nameSl: 'Čaj', nameEn: 'Tea', rating: 5, recipe: { titleSl: 'Akacijev med v zelenem čaju', titleEn: 'Acacia Honey in Green Tea', descSl: 'Začinite zeleni čaj, pustite da se rahlo ohladi, nato dodajte žlico akacijevega medu. Čist, cvetličen okus brez prevlade.', descEn: 'Brew green tea, let it cool slightly, then add a spoonful of acacia honey. Clean, floral taste without overpowering.' } },
      { emoji: '🥛', nameSl: 'Jogurt', nameEn: 'Yogurt', rating: 5 },
      { emoji: '🥞', nameSl: 'Palačinke', nameEn: 'Pancakes', rating: 5, recipe: { titleSl: 'Palačinke z medom in orehi', titleEn: 'Honey & Walnut Pancakes', descSl: 'Naredite palačinke, premažite z akacijevim medom in posujte s sesekljanimi orehi. Preprosta in okusna sladica.', descEn: 'Make pancakes, drizzle with acacia honey and sprinkle with chopped walnuts. Simple and delicious dessert.' } },
      { emoji: '🧀', nameSl: 'Sveži sir', nameEn: 'Fresh cheese', rating: 4 },
      { emoji: '🍓', nameSl: 'Sadna solata', nameEn: 'Fruit salad', rating: 4 },
    ],
  },
  {
    id: 'linden',
    color: '#E8C84A',
    colorBg: 'bg-yellow-50 dark:bg-yellow-950/30',
    pairings: [
      { emoji: '🌿', nameSl: 'Zeliščni čaj', nameEn: 'Herbal tea', rating: 5, recipe: { titleSl: 'Lipov med v kamilicnem čaju', titleEn: 'Linden Honey in Chamomile Tea', descSl: 'Kamilico prelijte z vrelo vodo, dodajte lipov med in kapljico limoninega soka. Idealno za zimske večere.', descEn: 'Pour hot water over chamomile, add linden honey and a drop of lemon juice. Ideal for winter evenings.' } },
      { emoji: '🧁', nameSl: 'Pečene dobrote', nameEn: 'Baked goods', rating: 5 },
      { emoji: '🥛', nameSl: 'Toplo mleko', nameEn: 'Warm milk', rating: 4, recipe: { titleSl: 'Toplo mleko z lipovim medom', titleEn: 'Warm Milk with Linden Honey', descSl: 'Segrejte mleko (ne nad 40 °C), dodajte žlico lipovega medu in pršico cimeta. blažilno pred spanjem.', descEn: 'Heat milk (not above 40°C), add a spoonful of linden honey and a dash of cinnamon. Soothing before sleep.' } },
      { emoji: '🥣', nameSl: 'Kaedha', nameEn: 'Porridge', rating: 4 },
      { emoji: '🍋', nameSl: 'Limona z vodo', nameEn: 'Lemon water', rating: 3 },
    ],
  },
  {
    id: 'chestnut',
    color: '#B8860B',
    colorBg: 'bg-orange-50 dark:bg-orange-950/30',
    pairings: [
      { emoji: '🧀', nameSl: 'Starani sir', nameEn: 'Aged cheese', rating: 5, recipe: { titleSl: 'Sirna krožnik s kostanjevim medom', titleEn: 'Chestnut Honey Cheese Board', descSl: 'Postavite kocke staranega sira, medeno figo in orehe na leseno desko. Prelijte s kostanjevim medom in posujte s peteršiljem.', descEn: 'Arrange aged cheese cubes, honey figs and walnuts on a wooden board. Drizzle with chestnut honey and garnish with parsley.' } },
      { emoji: '🥩', nameSl: 'Pečeno meso', nameEn: 'Grilled meats', rating: 5 },
      { emoji: '🌰', nameSl: 'Orehi', nameEn: 'Walnuts', rating: 4 },
      { emoji: '🍫', nameSl: 'Temna čokolada', nameEn: 'Dark chocolate', rating: 4, recipe: { titleSl: 'Temna čokolada s kostanjevim medom', titleEn: 'Dark Chocolate with Chestnut Honey', descSl: 'Stopite temno čokolado (70%+), dodajte kapljico kostanjevega medu in sesekljane orehe. Premium medena degustacija.', descEn: 'Melt dark chocolate (70%+), add a drop of chestnut honey and chopped walnuts. Premium honey tasting.' } },
      { emoji: '🍚', nameSl: 'Rizota', nameEn: 'Risotto', rating: 3 },
    ],
  },
  {
    id: 'wildflower',
    color: '#DAA520',
    colorBg: 'bg-yellow-50 dark:bg-yellow-950/30',
    pairings: [
      { emoji: '🍞', nameSl: 'Kruh', nameEn: 'Bread', rating: 5, recipe: { titleSl: 'Črni kruh z medenim maslom', titleEn: 'Dark Bread with Honey Butter', descSl: 'Zmešajte mehko maslo s cvetličnim medom, namastite na rezine črnega kruha. Dodajte peteršilj in sol.', descEn: 'Mix soft butter with wildflower honey, spread on slices of dark bread. Add parsley and salt.' } },
      { emoji: '🧀', nameSl: 'Sirna krožnik', nameEn: 'Cheese board', rating: 4 },
      { emoji: '🥣', nameSl: 'Ovsena kaša', nameEn: 'Oatmeal', rating: 5 },
      { emoji: '🥤', nameSl: 'Smoothieji', nameEn: 'Smoothies', rating: 4 },
      { emoji: '🥩', nameSl: 'Marinade', nameEn: 'Marinades', rating: 4 },
    ],
  },
  {
    id: 'forest',
    color: '#4A2C0A',
    colorBg: 'bg-amber-50 dark:bg-amber-950/30',
    pairings: [
      { emoji: '🦌', nameSl: 'Divjačina', nameEn: 'Game meat', rating: 5, recipe: { titleSl: 'Gozdni med v omaki za divjačino', titleEn: 'Forest Honey in Game Meat Sauce', descSl: 'Pripravite temno omako z gozdnim medom, rdečim vinom in timijanom. Podarite bogat okus pečenemu divjačinskemu mesu.', descEn: 'Prepare a dark sauce with forest honey, red wine and thyme. Give roasted game meat a rich flavor.' } },
      { emoji: '🧀', nameSl: 'Moder sir', nameEn: 'Blue cheese', rating: 5 },
      { emoji: '🍄', nameSl: 'Gobe', nameEn: 'Mushrooms', rating: 4 },
      { emoji: '🍷', nameSl: 'Rdeče vino', nameEn: 'Red wine', rating: 4 },
      { emoji: '🧀', nameSl: 'Močan sir', nameEn: 'Strong cheese', rating: 4 },
    ],
  },
  {
    id: 'fir',
    color: '#1A0F00',
    colorBg: 'bg-stone-50 dark:bg-stone-950/30',
    pairings: [
      { emoji: '🥞', nameSl: 'Palačinke', nameEn: 'Pancakes', rating: 5, recipe: { titleSl: 'Palačinke z medom brstov smreke', titleEn: 'Fir Honey Pancakes', descSl: 'Pečene palačinke prelijte z medom brstov smreke in dodajte sveže jagode. Smolnat okus ustvarja unikaten doživetje.', descEn: 'Drizzle baked pancakes with fir honeydew honey and add fresh strawberries. The resinous taste creates a unique experience.' } },
      { emoji: '🍦', nameSl: 'Sladoled', nameEn: 'Ice cream', rating: 5 },
      { emoji: '🧇', nameSl: 'Vafli', nameEn: 'Waffles', rating: 5 },
      { emoji: '🧁', nameSl: 'Slaščice', nameEn: 'Pastries', rating: 4 },
      { emoji: '🍮', nameSl: 'Mlečne sladice', nameEn: 'Milk desserts', rating: 4 },
    ],
  },
];

const honeyNames: Record<string, { sl: string; en: string }> = {
  acacia: { sl: 'Akacijev med', en: 'Acacia Honey' },
  linden: { sl: 'Lipov med', en: 'Linden Honey' },
  chestnut: { sl: 'Kostanjev med', en: 'Chestnut Honey' },
  wildflower: { sl: 'Cvetlični med', en: 'Wildflower Honey' },
  forest: { sl: 'Gozdni med', en: 'Forest Honey' },
  fir: { sl: 'Med brstov smreke', en: 'Fir Honeydew' },
};

const honeyIcons: Record<string, string> = {
  acacia: '🌸',
  linden: '🍃',
  chestnut: '🌰',
  wildflower: '🌼',
  forest: '🌲',
  fir: '🌲',
};

function HeartRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating}/5 hearts`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Heart
          key={i}
          className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} transition-colors duration-200 ${
            i <= rating
              ? 'fill-red-500 text-red-500'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export default function HoneyPairing() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedHoney, setSelectedHoney] = useState<string>('acacia');
  const [showAll, setShowAll] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<FoodPairing['recipe'] | null>(null);

  const current = honeyTypes.find((h) => h.id === selectedHoney)!;
  const topPairings = current.pairings.filter((p) => p.rating === 5);
  const displayPairings = showAll ? current.pairings : topPairings;

  return (
    <section id="pairing" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-honey-50/20 to-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-honey-300 to-transparent" />

      {/* Floating hex decorations */}
      <div className="absolute top-20 left-[5%] opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="60" height="52" viewBox="0 0 60 52" fill="currentColor"><polygon points="30,0 60,15 60,37 30,52 0,37 0,15" fill="var(--color-honey-400)" /></svg>
      </div>
      <div className="absolute bottom-32 right-[8%] opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="40" height="35" viewBox="0 0 60 52" fill="currentColor"><polygon points="30,0 60,15 60,37 30,52 0,37 0,15" fill="var(--color-honey-400)" /></svg>
      </div>

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
            {t.pairing.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.pairing.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.pairing.subtitle}
          </p>
        </motion.div>

        {/* Honey Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {honeyTypes.map((honey, i) => (
            <button
              key={honey.id}
              onClick={() => {
                setSelectedHoney(honey.id);
                setShowAll(false);
                setActiveRecipe(null);
              }}
              className={`relative inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedHoney === honey.id
                  ? 'bg-card text-foreground shadow-lg shadow-honey-500/10 border-2 border-honey-400 scale-105'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border-2 border-transparent'
              }`}
            >
              <span className="text-base">{honeyIcons[honey.id]}</span>
              <span className="hidden sm:inline">{honeyNames[honey.id][lang]}</span>
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 sm:hidden"
                style={{ backgroundColor: honey.color }}
                aria-hidden="true"
              />
              {selectedHoney === honey.id && (
                <motion.div
                  layoutId="honey-indicator"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-honey-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Selected Honey Info */}
        <motion.div
          key={selectedHoney}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full border-2 border-white/80 shadow-md"
              style={{ backgroundColor: current.color }}
            />
            <span className="text-xl font-bold">{honeyNames[selectedHoney][lang]}</span>
          </div>
        </motion.div>

        {/* Pairing Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="wait">
            {displayPairings.map((pairing, i) => (
              <motion.div
                key={`${selectedHoney}-${pairing.nameEn}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="group"
              >
                <div className={`relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl hover:shadow-honey-500/10 hover:border-honey-300/50 hover:-translate-y-1 h-full ${pairing.rating === 5 ? 'ring-1 ring-honey-400/30' : ''}`}>
                  {pairing.rating === 5 && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-honey-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3 h-3 inline mr-0.5 -mt-0.5" />
                      {t.pairing.topPairing}
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <span className="text-3xl sm:text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {pairing.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base">
                        {lang === 'sl' ? pairing.nameSl : pairing.nameEn}
                      </h3>
                      <div className="mt-1.5">
                        <HeartRating rating={pairing.rating} />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground italic">
                        {t.pairing.perfectMatch}: {pairing.rating}/5
                      </p>

                      {pairing.recipe && (
                        <button
                          onClick={() => setActiveRecipe(activeRecipe === pairing.recipe ? null : pairing.recipe)}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 transition-colors"
                        >
                          <ChefHat className="w-3.5 h-3.5" />
                          {t.pairing.recipeSuggestion}
                          <ArrowRight className={`w-3 h-3 transition-transform duration-200 ${activeRecipe === pairing.recipe ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Recipe Expansion */}
                  <AnimatePresence>
                    {activeRecipe === pairing.recipe && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            <ChefHat className="w-4 h-4 text-honey-500" />
                            {lang === 'sl' ? pairing.recipe!.titleSl : pairing.recipe!.titleEn}
                          </h4>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            {lang === 'sl' ? pairing.recipe!.descSl : pairing.recipe!.descEn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => {
              setShowAll(!showAll);
              setActiveRecipe(null);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium hover:bg-honey-200 dark:hover:bg-honey-900/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            {showAll ? t.pairing.allPairings : t.pairing.allPairings}
            <span className="text-xs text-muted-foreground">
              ({showAll ? current.pairings.length : topPairings.length})
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
