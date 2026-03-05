export function Skeleton({ className }: { className: string }) {
  return (
    <div className={`bg-slate-200 animate-pulse rounded-2xl ${className}`} />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="p-5 rounded-[32px] bg-white border border-slate-100 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-2 flex-1" />
        <Skeleton className="h-4 w-8" />
      </div>
    </div>
  );
}
