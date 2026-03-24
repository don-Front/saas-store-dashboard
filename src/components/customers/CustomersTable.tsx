'use client'

import { Table } from '@/components/Table'
import { formatDateRu, formatIntegerRu, formatRubles } from '@/lib/format'
import type { DemoCustomer } from '@/data/customers'

type CustomersTableProps = {
  customers: DemoCustomer[]
}

/**
 * Таблица клиентов для экранов от lg.
 */
export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="hidden rounded-xl border border-border/80 lg:block">
      <div className="overflow-x-auto">
        <Table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/30 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3">№</th>
              <th className="whitespace-nowrap px-4 py-3">Имя</th>
              <th className="whitespace-nowrap px-4 py-3">Почта</th>
              <th className="whitespace-nowrap px-4 py-3">Телефон</th>
              <th className="whitespace-nowrap px-4 py-3">Регистрация</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Заказы</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Сумма</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {customers.map((c) => (
              <tr key={c.id} className="transition-colors duration-150 hover:bg-muted/35">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                <td className="max-w-[180px] truncate px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-muted-foreground">{c.email}</td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{c.phone}</td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">
                  {formatDateRu(c.registeredAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-foreground">
                  {formatIntegerRu(c.ordersCount)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-foreground">
                  {formatRubles(c.totalSpentRub)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
