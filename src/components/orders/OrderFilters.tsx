'use client'

import { Input } from '@/components/Input'
import { cn } from '@/lib/utils'
import type { OrderDemoStatus } from '@/data/orders'
import { orderStatusLabelRu } from '@/data/orders'

export type OrdersSortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'

/** Фильтр по дате заказа (относительно «сегодня» в браузере). */
export type OrdersDatePreset = 'all' | '7d' | '30d' | '90d'

type OrderFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  status: 'all' | OrderDemoStatus
  onStatusChange: (value: 'all' | OrderDemoStatus) => void
  datePreset: OrdersDatePreset
  onDatePresetChange: (value: OrdersDatePreset) => void
  sortBy: OrdersSortOption
  onSortChange: (value: OrdersSortOption) => void
}

const selectClass = cn(
  'h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const sortLabels: Record<OrdersSortOption, string> = {
  'date-desc': 'Дата: сначала новые',
  'date-asc': 'Дата: сначала старые',
  'amount-desc': 'Сумма: по убыванию',
  'amount-asc': 'Сумма: по возрастанию',
}

const datePresetLabels: Record<OrdersDatePreset, string> = {
  all: 'За всё время',
  '7d': 'Последние 7 дней',
  '30d': 'Последние 30 дней',
  '90d': 'Последние 90 дней',
}

/**
 * Поиск, статус, период по дате и сортировка — локальный state в родителе (демо).
 */
export function OrderFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  datePreset,
  onDatePresetChange,
  sortBy,
  onSortChange,
}: OrderFiltersProps) {
  return (
    <section
      aria-label="Фильтры заказов"
      className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/50 p-4 shadow-sm dark:bg-card/30 lg:flex-row lg:flex-wrap lg:items-end"
    >
      <div className="min-w-0 flex-1 space-y-2 lg:min-w-[220px]">
        <label htmlFor="orders-search" className="text-xs font-medium text-muted-foreground">
          Поиск по клиенту
        </label>
        <Input
          id="orders-search"
          placeholder="Имя или email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="transition-colors duration-200"
        />
      </div>
      <div className="w-full space-y-2 lg:w-auto lg:min-w-[180px]">
        <label htmlFor="orders-status" className="text-xs font-medium text-muted-foreground">
          Статус
        </label>
        <select
          id="orders-status"
          className={selectClass}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as 'all' | OrderDemoStatus)}
        >
          <option value="all">Все статусы</option>
          {(Object.keys(orderStatusLabelRu) as OrderDemoStatus[]).map((key) => (
            <option key={key} value={key}>
              {orderStatusLabelRu[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full space-y-2 lg:w-auto lg:min-w-[200px]">
        <label htmlFor="orders-date" className="text-xs font-medium text-muted-foreground">
          Период
        </label>
        <select
          id="orders-date"
          className={selectClass}
          value={datePreset}
          onChange={(e) => onDatePresetChange(e.target.value as OrdersDatePreset)}
        >
          {(Object.keys(datePresetLabels) as OrdersDatePreset[]).map((key) => (
            <option key={key} value={key}>
              {datePresetLabels[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full space-y-2 lg:w-auto lg:min-w-[220px]">
        <label htmlFor="orders-sort" className="text-xs font-medium text-muted-foreground">
          Сортировка
        </label>
        <select
          id="orders-sort"
          className={selectClass}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as OrdersSortOption)}
        >
          {(Object.keys(sortLabels) as OrdersSortOption[]).map((key) => (
            <option key={key} value={key}>
              {sortLabels[key]}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
