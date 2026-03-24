'use client'

import type { ReactNode } from 'react'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { cn } from '@/lib/utils'
import { formatOrderDateTime, formatRubles } from '@/lib/format'
import type { RecentOrder } from '@/data/dashboard'
import { orderStatusLabel } from '@/data/dashboard'

type RecentOrdersCardProps = {
  orders: RecentOrder[]
  /** Кнопки/действия в шапке карточки (например «Добавить заказ»). */
  headerActions?: ReactNode
  /** Удаление строки; если не передано — кнопка не показывается. */
  onDeleteOrder?: (id: string) => void
  /** id строки с краткой подсветкой после добавления. */
  highlightOrderId?: string | null
  /** Строки в анимации удаления (opacity / slide). */
  removingOrderIds?: string[]
}

function OrderStatusBadge({ status }: { status: RecentOrder['status'] }) {
  const label = orderStatusLabel(status)
  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        status === 'paid'
          ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
          : 'bg-amber-500/15 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
      )}
    >
      {label}
    </span>
  )
}

const rowAnim = (highlight: boolean, removing: boolean) =>
  cn(
    'transition-all duration-300 ease-out',
    highlight &&
      'bg-primary/5 ring-2 ring-inset ring-primary/25 animate-in fade-in slide-in-from-bottom-1 duration-300',
    removing && 'pointer-events-none -translate-x-2 scale-[0.98] opacity-0 duration-300',
  )

/**
 * Последние заказы: на lg+ — строки в виде сетки (табличный вид), на мобиле — карточки.
 */
export function RecentOrdersCard({
  orders,
  headerActions,
  onDeleteOrder,
  highlightOrderId,
  removingOrderIds = [],
}: RecentOrdersCardProps) {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm dark:shadow-black/20">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-semibold">Последние заказы</CardTitle>
          <CardDescription>Клиент, дата, сумма и статус</CardDescription>
        </div>
        {headerActions ? <div className="flex shrink-0 flex-wrap gap-2">{headerActions}</div> : null}
      </CardHeader>
      <CardContent className="px-0 pb-2">
        {orders.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-muted-foreground">Заказов пока нет — добавьте первый.</p>
        ) : (
          <>
            {/* Мобильные карточки */}
            <ul className="space-y-3 px-4 pb-2 lg:hidden" aria-label="Заказы (карточки)">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className={cn(
                    'rounded-xl border border-border/80 bg-card/40 p-4 shadow-sm transition-shadow duration-200 hover:border-border hover:shadow-md dark:bg-card/20',
                    rowAnim(highlightOrderId === order.id, removingOrderIds.includes(order.id)),
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-tight text-foreground">{order.customerName}</p>
                      {onDeleteOrder ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Удалить заказ ${order.customerName}`}
                          onClick={() => onDeleteOrder(order.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatOrderDateTime(order.orderedAt)} · единиц: {order.units}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-base font-semibold tabular-nums text-foreground">
                        {formatRubles(order.amountRub)}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Десктоп: сетка как укороченная таблица */}
            <div className="hidden lg:block" aria-label="Заказы (таблица)">
              <div
                className={cn(
                  'grid grid-cols-[minmax(0,1.35fr)_minmax(0,7.5rem)_minmax(0,5.5rem)_auto_minmax(0,2.5rem)]',
                  'items-center gap-x-3 border-b border-border/80 bg-muted/25 px-6 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground',
                )}
              >
                <span>Клиент</span>
                <span>Дата</span>
                <span className="text-right">Сумма</span>
                <span>Статус</span>
                <span className="sr-only">Действия</span>
              </div>
              <ul className="divide-y divide-border/80">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className={cn(
                      'grid grid-cols-[minmax(0,1.35fr)_minmax(0,7.5rem)_minmax(0,5.5rem)_auto_minmax(0,2.5rem)]',
                      'items-center gap-x-3 px-6 py-3.5 transition-colors duration-150 hover:bg-muted/35',
                      rowAnim(highlightOrderId === order.id, removingOrderIds.includes(order.id)),
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{order.customerName}</p>
                      <p className="truncate text-xs text-muted-foreground">Единиц: {order.units}</p>
                    </div>
                    <span className="tabular-nums text-sm text-muted-foreground">
                      {formatOrderDateTime(order.orderedAt)}
                    </span>
                    <span className="text-right text-sm font-semibold tabular-nums text-foreground">
                      {formatRubles(order.amountRub)}
                    </span>
                    <OrderStatusBadge status={order.status} />
                    <div className="flex justify-end">
                      {onDeleteOrder ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Удалить заказ ${order.customerName}`}
                          onClick={() => onDeleteOrder(order.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
