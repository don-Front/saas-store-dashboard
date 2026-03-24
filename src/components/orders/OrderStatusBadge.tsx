'use client'

import { cn } from '@/lib/utils'
import type { OrderDemoStatus } from '@/data/orders'
import { orderStatusLabelRu } from '@/data/orders'

export function OrderStatusBadge({ status }: { status: OrderDemoStatus }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
        status === 'paid' &&
          'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
        status === 'pending' &&
          'bg-amber-500/15 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        status === 'cancelled' &&
          'bg-destructive/15 text-destructive dark:bg-destructive/25 dark:text-red-400',
      )}
    >
      {orderStatusLabelRu[status]}
    </span>
  )
}
