'use client'

import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/Button'
import { Table } from '@/components/Table'
import { cn } from '@/lib/utils'
import { formatRubles } from '@/lib/format'
import type { DemoProduct } from '@/data/products'
import { productStatusLabel } from '@/data/products'

type ProductsTableProps = {
  products: DemoProduct[]
  onEdit: (product: DemoProduct) => void
  onDelete: (id: string) => void
  /** id товаров в анимации удаления (fade / slide). */
  removingIds?: string[]
}

function StatusPill({ status }: { status: DemoProduct['status'] }) {
  const active = status === 'active'
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        active
          ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
          : 'bg-zinc-500/15 text-zinc-700 dark:bg-zinc-500/25 dark:text-zinc-300',
      )}
    >
      {productStatusLabel(status)}
    </span>
  )
}

/**
 * Десктоп: таблица. Мобилка / планшет: карточки (удобнее тыкать по CRUD).
 */
export function ProductsTable({ products, onEdit, onDelete, removingIds = [] }: ProductsTableProps) {
  return (
    <>
      <div className="hidden rounded-xl border border-border/80 lg:block">
        <div className="overflow-x-auto">
          <Table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="whitespace-nowrap px-4 py-3">Название</th>
                <th className="whitespace-nowrap px-4 py-3">Цена</th>
                <th className="whitespace-nowrap px-4 py-3">Остаток</th>
                <th className="whitespace-nowrap px-4 py-3">Категория</th>
                <th className="whitespace-nowrap px-4 py-3">Статус</th>
                <th className="whitespace-nowrap px-4 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {products.map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    'transition-all duration-300 hover:bg-muted/25',
                    removingIds.includes(p.id) &&
                      'pointer-events-none -translate-x-1 scale-[0.99] opacity-0',
                  )}
                >
                  <td className="max-w-[220px] truncate px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">{formatRubles(p.priceRub)}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{p.stock}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={`Редактировать ${p.name}`}
                        onClick={() => onEdit(p)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Удалить ${p.name}`}
                        onClick={() => onDelete(p.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {products.map((p) => (
          <div
            key={p.id}
            className={cn(
              'rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md dark:shadow-black/20',
              removingIds.includes(p.id) &&
                'pointer-events-none -translate-y-1 scale-[0.98] opacity-0',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.category}</p>
              </div>
              <StatusPill status={p.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="text-muted-foreground">Цена:</span>
              <span className="font-medium tabular-nums text-foreground">{formatRubles(p.priceRub)}</span>
              <span className="text-muted-foreground">Остаток:</span>
              <span className="tabular-nums text-foreground">{p.stock} шт.</span>
            </div>
            <div className="mt-4 flex justify-end gap-2 border-t border-border/60 pt-3">
              <Button type="button" variant="outline" size="sm" onClick={() => onEdit(p)}>
                Изменить
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(p.id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
