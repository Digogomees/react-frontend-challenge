import { Card, Skeleton } from '@shared/ui'

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/60 flex flex-col h-full animate-pulse">
      {/* Poster skeleton */}
      <div className="relative aspect-[2/3] w-full bg-muted/70" />

      {/* Content skeleton */}
      <div className="p-4 flex flex-col flex-1 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-5 w-4/5" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="pt-2 border-t border-border/40 flex justify-between items-center">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </Card>
  )
}
