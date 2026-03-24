'use client'

/**
 * Демо-страница «Заказы»: фильтры, сортировка и просмотр состава без API.
 */
import { useMemo, useState } from 'react'

import { OrderCard } from '@/components/orders/OrderCard'
import {
  OrderFilters,
  type OrdersDatePreset,
  type OrdersSortOption,
} from '@/components/orders/OrderFilters'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrdersTable } from '@/components/orders/OrdersTable'
import type { DemoOrder, OrderDemoStatus } from '@/data/orders'
import { initialDemoOrdersList } from '@/data/orders'
import { formatOrderDateTime, formatRubles } from '@/lib/format'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/ui/modal'

function minTimestampForPreset(preset: OrdersDatePreset): number | null {
  if (preset === 'all') return null
  const days = { '7d': 7, '30d': 30, '90d': 90 }[preset]
  return Date.now() - days * 86_400_000
}

function applyFiltersAndSort(
  list: DemoOrder[],
  search: string,
  status: 'all' | OrderDemoStatus,
  datePreset: OrdersDatePreset,
  sortBy: OrdersSortOption,
): DemoOrder[] {
  const q = search.trim().toLowerCase()
  const minTs = minTimestampForPreset(datePreset)
  let out = list.filter((o) => {
    if (minTs !== null && new Date(o.orderedAt).getTime() < minTs) return false
    if (status !== 'all' && o.status !== status) return false
    if (!q) return true
    return (
      o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q)
    )
  })

  out = [...out].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()
      case 'date-asc':
        return new Date(a.orderedAt).getTime() - new Date(b.orderedAt).getTime()
      case 'amount-desc':
        return b.amountRub - a.amountRub
      case 'amount-asc':
        return a.amountRub - b.amountRub
      default:
        return 0
    }
  })

  return out
}

export function DemoOrders() {
  const [orders] = useState<DemoOrder[]>(initialDemoOrdersList)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | OrderDemoStatus>('all')
  const [datePreset, setDatePreset] = useState<OrdersDatePreset>('all')
  const [sortBy, setSortBy] = useState<OrdersSortOption>('date-desc')
  const [detailOrder, setDetailOrder] = useState<DemoOrder | null>(null)

  const visible = useMemo(
    () => applyFiltersAndSort(orders, search, status, datePreset, sortBy),
    [orders, search, status, datePreset, sortBy],
  )

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Заказы</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Список заказов и состав корзины (демо, данные в памяти вкладки)
        </p>
      </header>

      <OrderFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        datePreset={datePreset}
        onDatePresetChange={setDatePreset}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <section aria-label="Список заказов">
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 py-12 text-center text-sm text-muted-foreground dark:bg-muted/10">
            Нет заказов по выбранным условиям — измените фильтры или поиск.
          </p>
        ) : (
          <>
            <OrdersTable orders={visible} onShowDetails={setDetailOrder} />
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {visible.map((order) => (
                <OrderCard key={order.id} order={order} onShowDetails={setDetailOrder} />
              ))}
            </div>
          </>
        )}
      </section>

      <Modal open={detailOrder !== null} onOpenChange={(open) => !open && setDetailOrder(null)}>
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {detailOrder ? (
            <>
              <ModalHeader>
                <ModalTitle className="font-mono text-base">{detailOrder.id}</ModalTitle>
                <ModalDescription>Состав и реквизиты заказа (демо).</ModalDescription>
              </ModalHeader>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{detailOrder.customerName}</p>
                <p className="truncate">{detailOrder.customerEmail}</p>
                <p className="tabular-nums">{formatOrderDateTime(detailOrder.orderedAt)}</p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="font-semibold text-foreground">{formatRubles(detailOrder.amountRub)}</span>
                  <OrderStatusBadge status={detailOrder.status} />
                </div>
              </div>
              <div className="space-y-2 border-t border-border/70 pt-4">
                <p className="text-sm font-medium text-foreground">Товары в заказе</p>
                <ul className="divide-y divide-border/70 rounded-lg border border-border/80">
                  {detailOrder.lines.map((line, i) => (
                    <li
                      key={`${line.name}-${i}`}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-muted/30"
                    >
                      <span className="min-w-0 flex-1 text-foreground">{line.name}</span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">× {line.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </div>
  )
}
