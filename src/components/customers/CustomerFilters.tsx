'use client'

/**
 * Поиск и фильтры списка клиентов (подписи на русском для портфолио).
 */
import { Input } from '@/components/Input'
import { cn } from '@/lib/utils'

/** Сортировка списка клиентов. */
export type CustomersSortOption =
  | 'name-asc'
  | 'name-desc'
  | 'registered-desc'
  | 'registered-asc'
  | 'total-desc'
  | 'total-asc'

/** Фильтр по числу заказов. */
export type CustomersOrdersFilter = 'all' | 'none' | 'gt5' | 'gt10' | 'gt20'

type CustomerFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  ordersFilter: CustomersOrdersFilter
  onOrdersFilterChange: (value: CustomersOrdersFilter) => void
  sortBy: CustomersSortOption
  onSortChange: (value: CustomersSortOption) => void
}

const selectClass = cn(
  'h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const sortLabels: Record<CustomersSortOption, string> = {
  'name-asc': 'Имя: А → Я',
  'name-desc': 'Имя: Я → А',
  'registered-desc': 'Регистрация: сначала новые',
  'registered-asc': 'Регистрация: сначала старые',
  'total-desc': 'Сумма заказов: по убыванию',
  'total-asc': 'Сумма заказов: по возрастанию',
}

const ordersFilterLabels: Record<CustomersOrdersFilter, string> = {
  all: 'Любое число заказов',
  none: 'Без заказов (0)',
  gt5: 'Более 5 заказов',
  gt10: 'Более 10 заказов',
  gt20: 'Более 20 заказов',
}

/**
 * Поиск, порог по заказам и сортировка — state в родителе (DemoCustomers).
 */
export function CustomerFilters({
  search,
  onSearchChange,
  ordersFilter,
  onOrdersFilterChange,
  sortBy,
  onSortChange,
}: CustomerFiltersProps) {
  return (
    <section
      aria-label="Фильтры клиентов"
      className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/50 p-4 shadow-sm dark:bg-card/30 lg:flex-row lg:flex-wrap lg:items-end"
    >
      <div className="min-w-0 flex-1 space-y-2 lg:min-w-[240px]">
        <label htmlFor="cust-search" className="text-xs font-medium text-muted-foreground">
          Поиск по имени или email
        </label>
        <Input
          id="cust-search"
          placeholder="Имя или email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="transition-colors duration-200"
        />
      </div>
      <div className="w-full space-y-2 lg:w-auto lg:min-w-[220px]">
        <label htmlFor="cust-orders" className="text-xs font-medium text-muted-foreground">
          Заказы
        </label>
        <select
          id="cust-orders"
          className={selectClass}
          value={ordersFilter}
          onChange={(e) => onOrdersFilterChange(e.target.value as CustomersOrdersFilter)}
        >
          {(Object.keys(ordersFilterLabels) as CustomersOrdersFilter[]).map((key) => (
            <option key={key} value={key}>
              {ordersFilterLabels[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full space-y-2 lg:w-auto lg:min-w-[240px]">
        <label htmlFor="cust-sort" className="text-xs font-medium text-muted-foreground">
          Сортировка
        </label>
        <select
          id="cust-sort"
          className={selectClass}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as CustomersSortOption)}
        >
          {(Object.keys(sortLabels) as CustomersSortOption[]).map((key) => (
            <option key={key} value={key}>
              {sortLabels[key]}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
