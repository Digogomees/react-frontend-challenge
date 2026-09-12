import { Star } from 'lucide-react'
import { Badge } from '@shared/ui'

interface MovieRatingBadgeProps {
  rating: number
  className?: string
  size?: 'sm' | 'md'
}

export function MovieRatingBadge({ rating, className, size = 'sm' }: MovieRatingBadgeProps) {
  const formattedRating = Number(rating || 0).toFixed(1)
  const isHighRating = rating >= 8.0
  const isMidRating = rating >= 6.5 && rating < 8.0

  return (
    <Badge
      variant="outline"
      className={`font-semibold flex items-center gap-1 backdrop-blur-md shadow-sm ${
        isHighRating
          ? 'border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400'
          : isMidRating
            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
            : 'border-muted-foreground/30 bg-muted/60 text-muted-foreground'
      } ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'} ${className || ''}`}
    >
      <Star className={`${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} fill-current`} />
      <span>{formattedRating}</span>
    </Badge>
  )
}
