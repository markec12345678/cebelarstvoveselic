'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Tag,
  X,
  Clock,
  Link as LinkIcon,
  Facebook,
  Twitter,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function Blog() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const b = t.blog;

  const tText = useCallback(
    (sl: string, en: string) => (lang === 'sl' ? sl : en),
    [lang]
  );

  // Category definitions
  const categories = [
    { key: 'all', label: tText('Vse', 'All') },
    { key: 'Znanje o medu', label: tText('Znanje o medu', 'Honey Knowledge') },
    { key: 'Iz čebeljnjaka', label: tText('Iz čebeljnjaka', 'From the Apiary') },
    { key: 'Trajnostnost', label: tText('Trajnostnost', 'Sustainability') },
  ];

  // Map EN category names to SL keys for filtering
  const categorySlMap: Record<string, string> = {
    'Znanje o medu': 'Znanje o medu',
    'Honey Knowledge': 'Znanje o medu',
    'Iz čebeljnjaka': 'Iz čebeljnjaka',
    'From the Apiary': 'Iz čebeljnjaka',
    'Trajnostnost': 'Trajnostnost',
    'Sustainability': 'Trajnostnost',
  };

  // Filter posts by active category
  const filteredPosts = b.posts.filter((post) => {
    if (activeCategory === 'all') return true;
    const mapped = categorySlMap[post.category] || post.category;
    return mapped === activeCategory;
  });

  // Reading time estimation (roughly 200 words per minute)
  const getReadingTime = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return minutes;
  };

  const categoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Znanje o medu':
        'bg-honey-100 text-honey-700 dark:bg-honey-900/20 dark:text-honey-400',
      'Honey Knowledge':
        'bg-honey-100 text-honey-700 dark:bg-honey-900/20 dark:text-honey-400',
      'Iz čebeljnjaka':
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
      'From the Apiary':
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
      'Trajnostnost':
        'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
      Sustainability:
        'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    };
    return (
      colors[category] ||
      'bg-honey-100 text-honey-700 dark:bg-honey-900/20 dark:text-honey-400'
    );
  };

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href + '#blog'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = window.location.href + '#blog';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden"
      ref={ref}
      id="blog"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-50/20 to-background dark:via-honey-950/5" />
      <div className="absolute inset-0 hex-pattern opacity-[0.02]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            variant="secondary"
            className="px-4 py-1.5 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 hover:bg-honey-100 text-xs font-medium mb-4"
          >
            <BookOpen className="w-3 h-3 mr-1.5" />
            {b.sectionTag}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {b.title}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {b.subtitle}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-honey-500 text-white shadow-md active-tab-indicator'
                  : 'border border-border text-muted-foreground hover:border-honey-300 hover:text-honey-600 dark:hover:border-honey-700 dark:hover:text-honey-400'
              }`}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 rounded-full bg-honey-500 -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => {
              // Get the original index from b.posts for trending badge (first post)
              const originalIndex = b.posts.findIndex((p) => p.slug === post.slug);
              const readingTime = getReadingTime(post.content);
              const isExpanded = expandedPost === originalIndex;

              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden group hover-lift h-full flex flex-col card-shine card-shimmer-sweep">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${categoryColor(post.category)}`}
                        >
                          <Tag className="w-2.5 h-2.5 mr-1 inline-block" />
                          {post.category}
                        </span>
                      </div>

                      {/* Date badge + Reading time */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                          <Calendar className="w-2.5 h-2.5 mr-1 inline-block" />
                          {post.date}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {readingTime} {tText('min', 'min')}
                        </span>
                      </div>

                      {/* Trending badge on first post */}
                      {originalIndex === 0 && (
                        <div className="absolute bottom-3 right-3">
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-orange-500/90 text-white backdrop-blur-sm flex items-center gap-1">
                            🔥 {tText('Priljubljeno', 'Trending')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-honey-600 dark:group-hover:text-honey-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read more button */}
                      <Button
                        variant="outline"
                        className="w-full mt-4 text-xs h-9 border-honey-200 dark:border-honey-800 hover:bg-honey-50 dark:hover:bg-honey-900/10"
                        onClick={() => setExpandedPost(originalIndex)}
                      >
                        {b.readMore}
                        <ArrowRight className="w-3 h-3 ml-1.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button
            variant="ghost"
            className="text-sm text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 hover:bg-honey-50 dark:hover:bg-honey-900/10"
          >
            {b.viewAll}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </motion.div>

        {/* Expanded Post Modal */}
        <AnimatePresence>
          {expandedPost !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setExpandedPost(null)}
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
                className="relative bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero Image */}
                <div className="relative h-48 sm:h-72 overflow-hidden rounded-t-2xl">
                  <Image
                    src={b.posts[expandedPost].image}
                    alt={b.posts[expandedPost].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setExpandedPost(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    aria-label={b.backToBlog}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Badges on image */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${categoryColor(b.posts[expandedPost].category)}`}
                    >
                      <Tag className="w-3 h-3 mr-1 inline-block" />
                      {b.posts[expandedPost].category}
                    </span>
                    <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1 inline-block" />
                      {b.posts[expandedPost].date}
                    </span>
                    <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/90 text-foreground backdrop-blur-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getReadingTime(b.posts[expandedPost].content)} {tText('min branja', 'min read')}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                    {b.posts[expandedPost].title}
                  </h2>

                  {/* Author row with avatar */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {/* Author avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      JV
                    </div>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-medium">
                        {b.publishedBy} Jožef Veselič
                      </span>
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{b.categoryLabel}: {b.posts[expandedPost].category}</span>
                    </span>
                  </div>

                  <Separator className="mb-6" />

                  {/* Content paragraphs */}
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                    {b.posts[expandedPost].content.split('\n\n').map((paragraph, j) => (
                      <motion.p
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.1 }}
                        className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Share buttons row */}
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">
                      {tText('Deli objavo', 'Share this post')}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyLink}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-honey-50 dark:hover:bg-honey-900/10 hover:text-honey-600 dark:hover:text-honey-400 hover:border-honey-300 dark:hover:border-honey-700 transition-colors"
                        aria-label={tText('Kopiraj povezavo', 'Copy link')}
                      >
                        {copied ? (
                          <>
                            <span className="text-green-500 text-xs">✓</span>
                            {tText('Kopirano!', 'Copied!')}
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-3.5 h-3.5" />
                            {tText('Kopiraj', 'Copy')}
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href + '#blog')}`,
                            '_blank',
                            'width=600,height=400'
                          );
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href + '#blog')}`,
                            '_blank',
                            'width=600,height=400'
                          );
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:bg-sky-50 dark:hover:bg-sky-900/10 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-colors"
                        aria-label="X / Twitter"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Back button */}
                  <div className="mt-6">
                    <Button
                      variant="ghost"
                      className="text-sm text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 hover:bg-honey-50 dark:hover:bg-honey-900/10"
                      onClick={() => setExpandedPost(null)}
                    >
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                      {b.backToBlog}
                    </Button>
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
