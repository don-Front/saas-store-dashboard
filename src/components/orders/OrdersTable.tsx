'use client'

import { ListOrdered } from 'lucide-react'

import { Button } from '@/components/Button'
import { Table } from '@/components/Table'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { formatOrderDateTime, formatRubles } from '@/lib/format'
import type { DemoOrder } from '@/data/orders'

type OrdersTableProps = {
  orders: DemoOrder[]
  onShowDetails: (order: DemoOrder) => void
}

/**
 * Таблица заказов для больших экранов (от lg).
 */
export function OrdersTable({ orders, onShowDetails }: OrdersTableProps) {
  return (
    <div className="hidden rounded-xl border border-border/80 lg:block">
      <div className="overflow-x-auto">
        <Table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/30 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3">№</th>
              <th className="whitespace-nowrap px-4 py-3">Клиент</th>
              <th className="whitespace-nowrap px-4 py-3">Дата</th>
              <th className="whitespace-nowrap px-4 py-3">Сумма</th>
              <th className="whitespace-nowrap px-4 py-3">Статус</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors duration-150 hover:bg-muted/35"
              >
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{order.id}</td>
                <td className="max-w-[220px] px-4 py-3">
                  <div className="font-medium text-foreground">{order.customerName}</div>
                  <div className="truncate text-xs text-muted-foreground">{order.customerEmail}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">
                  {formatOrderDateTime(order.orderedAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold tabular-nums text-foreground">
                  {formatRubles(order.amountRub)}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 transition-transform duration-150 hover:bg-accent active:scale-[0.98]"
                    onClick={() => onShowDetails(order)}
                  >
                    <ListOrdered className="size-3.5" aria-hidden />
                    Состав
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
