'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground page-enter">
      {/* ── Skeleton Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo area */}
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-9 rounded-full shimmer" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28 rounded shimmer" />
              <Skeleton className="h-2.5 w-20 rounded shimmer" />
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-md shimmer" />
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md shimmer" />
            <Skeleton className="h-8 w-16 rounded-md shimmer" />
            <Skeleton className="h-9 w-9 rounded-md lg:hidden shimmer" />
          </div>
        </div>
      </nav>

      {/* ── Hero Skeleton ── */}
      <section className="relative h-[70vh] w-full overflow-hidden mt-16">
        {/* Background image placeholder */}
        <Skeleton className="absolute inset-0 rounded-none shimmer" />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4">
          {/* Trust badge pill */}
          <Skeleton className="h-5 w-36 rounded-full shimmer" />

          {/* Main heading */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-14 w-80 max-w-full rounded-lg sm:h-16 shimmer" />
            <Skeleton className="h-14 w-64 max-w-full rounded-lg sm:h-16 shimmer" />
          </div>

          {/* Subtitle */}
          <Skeleton className="h-6 w-72 max-w-full rounded-lg sm:w-[28rem] shimmer" />

          {/* CTA buttons */}
          <div className="flex gap-3 mt-5">
            <Skeleton className="h-12 w-40 rounded-xl shimmer" />
            <Skeleton className="h-12 w-40 rounded-xl shimmer" />
          </div>

          {/* Trust badges row */}
          <div className="flex gap-6 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <Skeleton className="h-6 w-12 rounded shimmer" />
                <Skeleton className="h-3 w-20 rounded shimmer" />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── About Section Skeleton (2-col: image + text) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <Skeleton className="h-[28rem] w-full rounded-2xl shimmer" />
            {/* Experience badge overlay */}
            <Skeleton className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 h-16 w-16 rounded-2xl shimmer" />
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-20 rounded-full shimmer" />
            <Skeleton className="h-9 w-56 rounded-lg shimmer" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded shimmer" />
              <Skeleton className="h-4 w-11/12 rounded shimmer" />
              <Skeleton className="h-4 w-full rounded shimmer" />
              <Skeleton className="h-4 w-10/12 rounded shimmer" />
              <Skeleton className="h-4 w-full rounded shimmer" />
              <Skeleton className="h-4 w-9/12 rounded shimmer" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/50">
                  <Skeleton className="h-6 w-10 rounded shimmer" />
                  <Skeleton className="h-3 w-16 rounded shimmer" />
                </div>
              ))}
            </div>

            {/* Certification badges */}
            <div className="flex gap-2 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-lg shimmer" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Section Skeleton (6 cards) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-24 rounded-full mx-auto mb-3 shimmer" />
          <Skeleton className="h-9 w-52 rounded-lg mx-auto mb-3 shimmer" />
          <Skeleton className="h-5 w-80 rounded-lg mx-auto shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-48 w-full rounded-xl shimmer" />
              <div className="px-1 space-y-2">
                <Skeleton className="h-5 w-28 rounded shimmer" />
                <Skeleton className="h-4 w-full rounded shimmer" />
                <Skeleton className="h-4 w-20 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats Bar Skeleton (dark band with 6 counters) ── */}
      <section className="w-full py-16 bg-gradient-to-br from-foreground/90 to-foreground/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <Skeleton className="h-8 w-16 rounded shimmer bg-white/10" />
                <Skeleton className="h-3 w-24 rounded shimmer bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section Skeleton ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-28 rounded-full mx-auto mb-3 shimmer" />
          <Skeleton className="h-9 w-48 rounded-lg mx-auto shimmer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 rounded-2xl bg-muted/40 space-y-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4 rounded-full shimmer" />
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded shimmer" />
                <Skeleton className="h-4 w-11/12 rounded shimmer" />
                <Skeleton className="h-4 w-9/12 rounded shimmer" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-10 w-10 rounded-full shimmer" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-24 rounded shimmer" />
                  <Skeleton className="h-3 w-16 rounded shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section Skeleton ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-16 rounded-full mx-auto mb-3 shimmer" />
          <Skeleton className="h-9 w-40 rounded-lg mx-auto shimmer" />
          <Skeleton className="h-10 w-full mt-6 rounded-xl shimmer" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50">
              <Skeleton className="h-5 w-3/4 rounded shimmer" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full rounded shimmer" />
                <Skeleton className="h-4 w-5/6 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Section Skeleton ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-24 rounded-full mx-auto mb-3 shimmer" />
          <Skeleton className="h-9 w-44 rounded-lg mx-auto mb-3 shimmer" />
          <Skeleton className="h-5 w-64 rounded-lg mx-auto shimmer" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form side */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 rounded-xl shimmer" />
              <Skeleton className="h-12 rounded-xl shimmer" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl shimmer" />
            <Skeleton className="h-12 w-full rounded-xl shimmer" />
            <Skeleton className="h-32 w-full rounded-xl shimmer" />
            <Skeleton className="h-12 w-40 rounded-xl shimmer" />
          </div>

          {/* Info side */}
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl shimmer" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl shimmer" />
              ))}
            </div>
            <Skeleton className="h-48 w-full rounded-xl shimmer" />
          </div>
        </div>
      </section>

      {/* ── Footer Skeleton ── */}
      <footer className="border-t border-border/50 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24 rounded shimmer" />
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-3.5 w-full rounded shimmer" />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-4 w-48 rounded shimmer" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full shimmer" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
