'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, ChevronRight } from 'lucide-react';
import { useLangStore } from '@/store/language';

const videos = [
  {
    id: 1,
    slug: 'obisk-cebeljaka',
    image: '/images/visit.jpg',
    duration: '3:24',
    titleSl: 'Obisk čebeljaka v Beli krajini',
    titleEn: 'Apiary Visit in Bela Krajina',
    descSl: 'Pridružite se Jožefu na ogledu čebeljaka v Čurelah. Videli boste panje, čebele pri delu in degustacijo vseh šestih sort medu.',
    descEn: 'Join Jožef on a tour of the apiary in Čurile. See the hives, bees at work, and taste all six honey varieties.',
  },
  {
    id: 2,
    slug: 'od-cveta-do-kozarca',
    image: '/images/process.jpg',
    duration: '5:12',
    titleSl: 'Od cveta do kozarca: pot medu',
    titleEn: 'From Flower to Jar: The Journey of Honey',
    descSl: 'Dokumentarec o celotnem postopku pridobivanja medu — od postavitve panjev na pašnike do stekleničenja.',
    descEn: 'A documentary about the entire honey production process — from placing hives on pastures to jarring.',
  },
  {
    id: 3,
    slug: 'prepoznavanje-pristnega-meda',
    image: '/images/about.jpg',
    duration: '4:05',
    titleSl: 'Kako prepoznamo pristen med',
    titleEn: 'How to Identify Authentic Honey',
    descSl: 'Naučite se razlikovati pristen med od ponarejenega. Tips za preverjanje kakovosti doma.',
    descEn: 'Learn to distinguish authentic honey from counterfeit. Tips for checking quality at home.',
  },
];

export default function VideoTestimonials() {
  const { lang } = useLangStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [featuredId, setFeaturedId] = useState(1);

  const featured = videos.find((v) => v.id === featuredId) || videos[0];
  const playlist = videos.filter((v) => v.id !== featuredId);

  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 bg-background relative overflow-hidden"
      id="videos"
    >
      <div className="absolute inset-0 dot-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 rounded-full text-sm font-medium mb-4">
            <Play className="w-3 h-3" />
            {t('Video', 'Videos')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('Poglejte našo zgodbo v živo', 'Watch Our Story Come Alive')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t(
              'Spoznajte čebelarstvo Veselič skozi kratke filme — od obiska čebeljaka do poti medu.',
              'Discover Čebelarstvo Veselič through short films — from apiary visits to the journey of honey.'
            )}
          </p>
        </motion.div>

        {/* Video Layout: Featured + Playlist */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <button
              onClick={() => setSelectedVideo(featured.id)}
              className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer block"
              aria-label={t('Predvajaj video', 'Play video')}
            >
              <Image
                src={featured.image}
                alt={lang === 'sl' ? featured.titleSl : featured.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {featured.duration}
              </div>

              {/* Featured label */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-honey-500/90 backdrop-blur-sm rounded-lg text-white text-xs font-semibold">
                {t('Predstavljen', 'Featured')}
              </div>
            </button>

            {/* Featured title */}
            <h3 className="mt-4 text-xl sm:text-2xl font-bold text-foreground group-hover:text-honey-600 dark:group-hover:text-honey-400 transition-colors">
              {lang === 'sl' ? featured.titleSl : featured.titleEn}
            </h3>
            <p className="mt-1 text-muted-foreground text-sm sm:text-base">
              {lang === 'sl' ? featured.descSl : featured.descEn}
            </p>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {playlist.map((video, index) => (
              <button
                key={video.id}
                onClick={() => {
                  setFeaturedId(video.id);
                  setSelectedVideo(video.id);
                }}
                className={`flex gap-4 p-3 rounded-xl border transition-all duration-300 text-left group hover:border-honey-300 dark:hover:border-honey-700 hover:shadow-lg ${
                  featuredId === video.id
                    ? 'border-honey-400 dark:border-honey-600 bg-honey-50/50 dark:bg-honey-900/10'
                    : 'border-border bg-card'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-32 sm:w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={video.image}
                    alt={lang === 'sl' ? video.titleSl : video.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                      <Play className="w-3 h-3 text-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 rounded text-white text-[10px] font-medium">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 group-hover:text-honey-600 dark:group-hover:text-honey-400 transition-colors">
                    {lang === 'sl' ? video.titleSl : video.titleEn}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                    {lang === 'sl' ? video.descSl : video.descEn}
                  </p>
                  <span className="mt-2 inline-flex items-center text-xs text-honey-600 dark:text-honey-400 font-medium">
                    {t('Predvajaj', 'Watch')}
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-muted">
                <Image
                  src={videos.find((v) => v.id === selectedVideo)?.image || '/images/visit.jpg'}
                  alt=""
                  fill
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-honey-500/20 flex items-center justify-center">
                    <Play className="w-10 h-10 text-honey-500 ml-1" />
                  </div>
                  <p className="text-foreground/60 text-sm font-medium">
                    {t('Video bo kmalu na voljo', 'Video coming soon')}
                  </p>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">
                  {lang === 'sl'
                    ? videos.find((v) => v.id === selectedVideo)?.titleSl
                    : videos.find((v) => v.id === selectedVideo)?.titleEn}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {lang === 'sl'
                    ? videos.find((v) => v.id === selectedVideo)?.descSl
                    : videos.find((v) => v.id === selectedVideo)?.descEn}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10"
                aria-label={t('Zapri', 'Close')}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
