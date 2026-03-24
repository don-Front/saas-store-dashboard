'use client'

import { ListOrdered } from 'lucide-react'

import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { formatOrderDateTime, formatRubles } from '@/lib/format'
import type { DemoOrder } from '@/data/orders'

type OrderCardProps = {
  order: DemoOrder
  onShowDetails: (order: DemoOrder) => void
}

/**
 * Карточка одного заказа для планшетов и мобильных (до lg).
 */
export function OrderCard({ order, onShowDetails }: OrderCardProps) {
  return (
    <Card className="rounded-xl border-border/80 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md dark:shadow-black/20">
      <CardHeader className="space-y-2 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
          <OrderStatusBadge status={order.status} />
        </div>
        <div>
          <p className="font-semibold text-foreground">{order.customerName}</p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-3 pt-0 text-sm">
        <div className="flex flex-wrap justify-between gap-2 border-t border-border/60 pt-3">
          <span className="text-muted-foreground">Дата</span>
          <span className="tabular-nums text-foreground">{formatOrderDateTime(order.orderedAt)}</span>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-muted-foreground">Сумма</span>
          <span className="text-lg font-semibold tabular-nums text-foreground">{formatRubles(order.amountRub)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/60 pt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-1.5 transition-transform duration-150 active:scale-[0.99]"
          onClick={() => onShowDetails(order)}
        >
          <ListOrdered className="size-3.5" aria-hidden />
          Состав заказа
        </Button>
      </CardFooter>
    </Card>
  )
}
