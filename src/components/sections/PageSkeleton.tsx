'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Skeleton navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-2.5 w-16 rounded" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-md" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md lg:hidden" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none shimmer" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-12 w-80 max-w-full rounded-lg sm:h-16" />
          <Skeleton className="h-6 w-64 max-w-full rounded-lg sm:w-96" />
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 w-36 rounded-lg" />
          </div>
          <div className="flex gap-6 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <Skeleton className="h-5 w-10 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content section skeletons — row 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-10">
          <Skeleton className="h-4 w-20 rounded-full mx-auto mb-3" />
          <Skeleton className="h-8 w-48 rounded-lg mx-auto mb-3" />
          <Skeleton className="h-5 w-72 rounded-lg mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl shimmer" />
          ))}
        </div>
      </div>

      {/* Content section skeletons — row 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-10">
          <Skeleton className="h-4 w-24 rounded-full mx-auto mb-3" />
          <Skeleton className="h-8 w-56 rounded-lg mx-auto mb-3" />
          <Skeleton className="h-5 w-64 rounded-lg mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl shimmer" />
          ))}
        </div>
      </div>

      {/* Content section skeletons — row 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-10">
          <Skeleton className="h-4 w-20 rounded-full mx-auto mb-3" />
          <Skeleton className="h-8 w-40 rounded-lg mx-auto" />
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
