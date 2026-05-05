'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ChefHat,
  Clock,
  Gauge,
  X,
  ListChecks,
  FlaskConical,
  Leaf,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function Recipes() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const r = t.recipes;

  const difficultyLabel = (d: string) => {
    if (d === 'Easy') return lang === 'sl' ? 'Enostavno' : 'Easy';
    return lang === 'sl' ? 'Srednje' : 'Medium';
  };

  const difficultyColor = (d: string) =>
    d === 'Easy'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-50/30 to-background dark:via-honey-950/5" />
      <div className="absolute inset-0 dot-pattern opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="px-4 py-1.5 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 hover:bg-honey-100 text-xs font-medium mb-4">
            <ChefHat className="w-3 h-3 mr-1.5" />
            {r.sectionTag}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{r.title}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {r.subtitle}
          </p>
        </motion.div>

        {/* Recipe Cards Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {r.items.map((recipe, i) => {
            const isExpanded = expandedRecipe === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden group hover-lift h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Recipe badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-[10px] font-medium">
                        <ChefHat className="w-3 h-3 mr-1" />
                        {lang === 'sl' ? 'Recept' : 'Recipe'}
                      </Badge>
                    </div>

                    {/* Time badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm text-[10px]">
                        <Clock className="w-3 h-3 mr-1" />
                        {recipe.prepTime} {r.minutes}
                      </Badge>
                    </div>

                    {/* Difficulty badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColor(recipe.difficulty)}`}>
                        {difficultyLabel(recipe.difficulty)}
                      </span>
                    </div>

                    {/* Honey type badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-honey-500/90 text-white backdrop-blur-sm text-[10px]">
                        <Leaf className="w-3 h-3 mr-1" />
                        {recipe.honey}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-honey-600 dark:group-hover:text-honey-400 transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {recipe.description}
                    </p>

                    {/* Expand button */}
                    <Button
                      variant="outline"
                      className="w-full mt-4 text-xs h-9 border-honey-200 dark:border-honey-800 hover:bg-honey-50 dark:hover:bg-honey-900/10"
                      onClick={() => setExpandedRecipe(isExpanded ? null : i)}
                    >
                      {isExpanded ? (
                        <>
                          <X className="w-3 h-3 mr-1.5" />
                          {r.closeRecipe}
                        </>
                      ) : (
                        <>
                          <ListChecks className="w-3 h-3 mr-1.5" />
                          {r.viewRecipe}
                          <ChevronDown className="w-3 h-3 ml-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Recipe Overlay */}
        <AnimatePresence>
          {expandedRecipe !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setExpandedRecipe(null)}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={r.items[expandedRecipe].image}
                    alt={r.items[expandedRecipe].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setExpandedRecipe(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    aria-label={r.closeRecipe}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Badges on image */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className="bg-honey-500 text-white text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {r.items[expandedRecipe].honey}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur-sm text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {r.items[expandedRecipe].prepTime} {r.minutes}
                    </Badge>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColor(r.items[expandedRecipe].difficulty)}`}>
                      {difficultyLabel(r.items[expandedRecipe].difficulty)}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">{r.items[expandedRecipe].name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-6">
                    {r.items[expandedRecipe].description}
                  </p>

                  <Separator className="mb-6" />

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Ingredients */}
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
                        <FlaskConical className="w-4 h-4 text-honey-500" />
                        {lang === 'sl' ? 'Sestavine' : 'Ingredients'}
                      </h4>
                      <ul className="space-y-2">
                        {r.items[expandedRecipe].ingredients.map((ingredient, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-honey-400 mt-1.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{ingredient}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
                        <Gauge className="w-4 h-4 text-honey-500" />
                        {lang === 'sl' ? 'Priprava' : 'Instructions'}
                      </h4>
                      <ol className="space-y-3">
                        {r.items[expandedRecipe].instructions.map((instruction, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 + 0.2 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="w-6 h-6 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-600 dark:text-honey-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            <span className="text-muted-foreground leading-relaxed">{instruction}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Honey recommendation */}
                  <div className="mt-6 p-4 rounded-lg bg-honey-50 dark:bg-honey-900/10 border border-honey-200/60 dark:border-honey-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="w-4 h-4 text-honey-500" />
                      <span className="text-sm font-semibold">
                        {lang === 'sl' ? 'Priporočen med' : 'Recommended Honey'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lang === 'sl'
                        ? `Za ta recept priporočamo ${r.items[expandedRecipe].honey.toLowerCase()} od Čebelarstvo Veselič.`
                        : `We recommend ${r.items[expandedRecipe].honey} from Čebelarstvo Veselič for this recipe.`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
