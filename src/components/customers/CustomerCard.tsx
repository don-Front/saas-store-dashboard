'use client'

import { Card, CardContent, CardHeader } from '@/components/Card'
import { formatDateRu, formatIntegerRu, formatRubles } from '@/lib/format'
import type { DemoCustomer } from '@/data/customers'

type CustomerCardProps = {
  customer: DemoCustomer
}

/**
 * Карточка клиента для планшетов и мобильных (до lg).
 */
export function CustomerCard({ customer: c }: CustomerCardProps) {
  return (
    <Card className="rounded-xl border-border/80 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md dark:shadow-black/20">
      <CardHeader className="space-y-1 pb-2">
        <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
        <p className="text-lg font-semibold leading-tight text-foreground">{c.name}</p>
        <p className="truncate text-sm text-muted-foreground">{c.email}</p>
      </CardHeader>
      <CardContent className="space-y-2 pt-0 text-sm">
        <div className="flex flex-wrap justify-between gap-2 border-t border-border/60 pt-3">
          <span className="text-muted-foreground">Телефон</span>
          <span className="tabular-nums text-foreground">{c.phone}</span>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-muted-foreground">Регистрация</span>
          <span className="tabular-nums text-foreground">{formatDateRu(c.registeredAt)}</span>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-muted-foreground">Заказов</span>
          <span className="font-medium tabular-nums text-foreground">{formatIntegerRu(c.ordersCount)}</span>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-muted-foreground">Сумма заказов</span>
          <span className="text-lg font-semibold tabular-nums text-foreground">{formatRubles(c.totalSpentRub)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
