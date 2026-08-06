import React from "react";

export const Skeleton = ({ className = "" }) => (
  <div className={`skeleton rounded-xl ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-ink-900/60 overflow-hidden">
    <Skeleton className="aspect-square w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const LineSkeleton = ({ className = "" }) => <Skeleton className={`h-4 ${className}`} />;
