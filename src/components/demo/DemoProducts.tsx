'use client'

/**
 * Демо-каталог: фильтры, таблица / карточки, CRUD через модальное окно (локальный state).
 */
import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ProductForm, type ProductFormPayload } from '@/components/demo/ProductForm'
import { ProductsTable } from '@/components/demo/ProductsTable'
import type { DemoProduct, ProductStatus } from '@/data/products'
import { initialDemoProducts, PRODUCT_CATEGORIES } from '@/data/products'
import { cn } from '@/lib/utils'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/ui/modal'

const filterSelectClass = cn(
  'h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm sm:w-auto sm:min-w-[160px]',
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

/** Сортировка отфильтрованного списка (локальный state). */
export type ProductsSortOption =
  | 'name-asc'
  | 'price-asc'
  | 'price-desc'
  | 'stock-asc'
  | 'stock-desc'
  | 'category-asc'
  | 'category-desc'

const sortLabels: Record<ProductsSortOption, string> = {
  'name-asc': 'Название: А → Я',
  'price-asc': 'Цена: по возрастанию',
  'price-desc': 'Цена: по убыванию',
  'stock-asc': 'Остаток: сначала меньше',
  'stock-desc': 'Остаток: сначала больше',
  'category-asc': 'Категория: А → Я',
  'category-desc': 'Категория: Я → А',
}

function sortProducts(list: DemoProduct[], sortBy: ProductsSortOption): DemoProduct[] {
  const arr = [...list]
  arr.sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'ru')
      case 'price-asc':
        return a.priceRub - b.priceRub
      case 'price-desc':
        return b.priceRub - a.priceRub
      case 'stock-asc':
        return a.stock - b.stock
      case 'stock-desc':
        return b.stock - a.stock
      case 'category-asc':
        return a.category.localeCompare(b.category, 'ru')
      case 'category-desc':
        return b.category.localeCompare(a.category, 'ru')
      default:
        return 0
    }
  })
  return arr
}

export function DemoProducts() {
  const [products, setProducts] = useState<DemoProduct[]>(initialDemoProducts)
  const [removingIds, setRemovingIds] = useState<string[]>([])
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | ProductStatus>('all')
  const [sortBy, setSortBy] = useState<ProductsSortOption>('name-asc')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<DemoProduct | null>(null)

  const filtered = useMemo(() => {
    const q = nameFilter.trim().toLowerCase()
    const base = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
      if (statusFilter !== 'all' && p.status !== statusFilter) return false
      return true
    })
    return sortProducts(base, sortBy)
  }, [products, nameFilter, categoryFilter, statusFilter, sortBy])

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (p: DemoProduct) => {
    setEditing(p)
    setModalOpen(true)
  }

  const handleModalChange = (open: boolean) => {
    setModalOpen(open)
    if (!open) setEditing(null)
  }

  const handleSubmitProduct = (data: ProductFormPayload) => {
    if (data.id) {
      setProducts((prev) =>
        prev.map((x) =>
          x.id === data.id
            ? {
                id: data.id,
                name: data.name,
                priceRub: data.priceRub,
                stock: data.stock,
                category: data.category,
                status: data.status,
              }
            : x,
        ),
      )
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: `p-${Date.now()}`,
          name: data.name,
          priceRub: data.priceRub,
          stock: data.stock,
          category: data.category,
          status: data.status,
        },
      ])
    }
    handleModalChange(false)
  }

  const handleDelete = (id: string) => {
    if (removingIds.includes(id)) return
    setRemovingIds((prev) => [...prev, id])
    window.setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setRemovingIds((prev) => prev.filter((x) => x !== id))
    }, 300)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Товары</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Каталог и остатки (демо, без сохранения на сервере)
          </p>
        </header>
        <Button
          type="button"
          className="shrink-0 gap-1.5 self-start transition-transform duration-150 hover:brightness-105 active:scale-[0.98] sm:self-auto"
          onClick={openCreate}
        >
          <Plus className="size-4" aria-hidden />
          Добавить товар
        </Button>
      </div>

      <section
        aria-label="Фильтры каталога"
        className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/50 p-4 shadow-sm dark:bg-card/30 sm:flex-row sm:flex-wrap sm:items-end"
      >
        <div className="min-w-0 flex-1 space-y-2 sm:min-w-[200px]">
          <label htmlFor="flt-name" className="text-xs font-medium text-muted-foreground">
            Название
          </label>
          <Input
            id="flt-name"
            placeholder="Поиск по названию..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="transition-colors duration-200"
          />
        </div>
        <div className="w-full space-y-2 sm:w-auto">
          <label htmlFor="flt-cat" className="text-xs font-medium text-muted-foreground">
            Категория
          </label>
          <select
            id="flt-cat"
            className={filterSelectClass}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Все категории</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2 sm:w-auto">
          <label htmlFor="flt-st" className="text-xs font-medium text-muted-foreground">
            Статус
          </label>
          <select
            id="flt-st"
            className={filterSelectClass}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | ProductStatus)}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активен</option>
            <option value="inactive">Неактивен</option>
          </select>
        </div>
        <div className="w-full space-y-2 sm:w-auto sm:min-w-[200px]">
          <label htmlFor="flt-sort" className="text-xs font-medium text-muted-foreground">
            Сортировка
          </label>
          <select
            id="flt-sort"
            className={filterSelectClass}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ProductsSortOption)}
          >
            {(Object.keys(sortLabels) as ProductsSortOption[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section aria-label="Таблица товаров">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 py-12 text-center text-sm text-muted-foreground dark:bg-muted/10">
            Ничего не найдено — измените фильтры или добавьте товар.
          </p>
        ) : (
          <ProductsTable
            products={filtered}
            removingIds={removingIds}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </section>

      <Modal open={modalOpen} onOpenChange={handleModalChange}>
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <ModalHeader>
            <ModalTitle>{editing ? 'Редактировать товар' : 'Новый товар'}</ModalTitle>
            <ModalDescription>Изменения действуют до перезагрузки страницы.</ModalDescription>
          </ModalHeader>
          <ProductForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onCancel={() => handleModalChange(false)}
            onSubmit={handleSubmitProduct}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}
