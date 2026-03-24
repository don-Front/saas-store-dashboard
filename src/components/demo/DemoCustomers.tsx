'use client'

/**
 * Демо-страница «Клиенты»: поиск, фильтр по числу заказов, сортировка (локальный state).
 */
import { useMemo, useState } from 'react'

import { CustomerCard } from '@/components/customers/CustomerCard'
import {
  CustomerFilters,
  type CustomersOrdersFilter,
  type CustomersSortOption,
} from '@/components/customers/CustomerFilters'
import { CustomersTable } from '@/components/customers/CustomersTable'
import type { DemoCustomer } from '@/data/customers'
import { initialDemoCustomers } from '@/data/customers'

function matchesOrdersFilter(c: DemoCustomer, filter: CustomersOrdersFilter): boolean {
  switch (filter) {
    case 'all':
      return true
    case 'none':
      return c.ordersCount === 0
    case 'gt5':
      return c.ordersCount > 5
    case 'gt10':
      return c.ordersCount > 10
    case 'gt20':
      return c.ordersCount > 20
    default:
      return true
  }
}

function applyFiltersAndSort(
  list: DemoCustomer[],
  search: string,
  ordersFilter: CustomersOrdersFilter,
  sortBy: CustomersSortOption,
): DemoCustomer[] {
  const q = search.trim().toLowerCase()
  let out = list.filter((c) => {
    if (!matchesOrdersFilter(c, ordersFilter)) return false
    if (!q) return true
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  })

  out = [...out].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'ru')
      case 'name-desc':
        return b.name.localeCompare(a.name, 'ru')
      case 'registered-desc':
        return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
      case 'registered-asc':
        return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
      case 'total-desc':
        return b.totalSpentRub - a.totalSpentRub
      case 'total-asc':
        return a.totalSpentRub - b.totalSpentRub
      default:
        return 0
    }
  })

  return out
}

export function DemoCustomers() {
  const [customers] = useState<DemoCustomer[]>(initialDemoCustomers)
  const [search, setSearch] = useState('')
  const [ordersFilter, setOrdersFilter] = useState<CustomersOrdersFilter>('all')
  const [sortBy, setSortBy] = useState<CustomersSortOption>('registered-desc')

  const visible = useMemo(
    () => applyFiltersAndSort(customers, search, ordersFilter, sortBy),
    [customers, search, ordersFilter, sortBy],
  )

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Клиенты</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          База покупателей (демо, данные только в памяти вкладки)
        </p>
      </header>

      <CustomerFilters
        search={search}
        onSearchChange={setSearch}
        ordersFilter={ordersFilter}
        onOrdersFilterChange={setOrdersFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <section aria-label="Список клиентов">
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 py-12 text-center text-sm text-muted-foreground dark:bg-muted/10">
            Нет клиентов по выбранным условиям — измените поиск или фильтр по заказам.
          </p>
        ) : (
          <>
            <CustomersTable customers={visible} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {visible.map((c) => (
                <CustomerCard key={c.id} customer={c} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
