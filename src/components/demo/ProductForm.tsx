'use client'

/**
 * Форма создания / редактирования товара: валидация на русском, индикатор отправки (демо-задержка).
 */
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import type { DemoProduct, ProductStatus } from '@/data/products'
import { PRODUCT_CATEGORIES } from '@/data/products'
import { cn } from '@/lib/utils'

const selectClassName = cn(
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  'ring-offset-background transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

export type ProductFormPayload = Omit<DemoProduct, 'id'> & { id?: string }

type FormErrors = Partial<Record<'name' | 'priceRub' | 'stock', string>>

type ProductFormProps = {
  initial?: DemoProduct | null
  onSubmit: (data: ProductFormPayload) => void
  onCancel: () => void
}

export function ProductForm({ initial, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [priceRub, setPriceRub] = useState(initial ? String(initial.priceRub) : '')
  const [stock, setStock] = useState(initial ? String(initial.stock) : '')
  const [category, setCategory] = useState(initial?.category ?? PRODUCT_CATEGORIES[0])
  const [status, setStatus] = useState<ProductStatus>(initial?.status ?? 'active')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setName(initial?.name ?? '')
    setPriceRub(initial ? String(initial.priceRub) : '')
    setStock(initial ? String(initial.stock) : '')
    setCategory(initial?.category ?? PRODUCT_CATEGORIES[0])
    setStatus(initial?.status ?? 'active')
    setErrors({})
  }, [initial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Обязательное поле'

    const price = Number.parseInt(priceRub.replace(/\s/g, ''), 10)
    if (Number.isNaN(price) || price < 0) next.priceRub = 'Неверный формат числа'

    const st = Number.parseInt(stock.replace(/\s/g, ''), 10)
    if (Number.isNaN(st) || st < 0) next.stock = 'Неверный формат числа'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    await new Promise((r) => window.setTimeout(r, 450))
    setSubmitting(false)

    onSubmit({
      id: initial?.id,
      name: name.trim(),
      priceRub: price,
      stock: st,
      category,
      status,
    })
  }

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
      <div className="space-y-2">
        <label htmlFor="pf-name" className="text-sm font-medium">
          Название <span className="text-destructive">*</span>
        </label>
        <Input
          id="pf-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors((x) => ({ ...x, name: undefined }))
          }}
          placeholder="Например, Кроссовки Urban"
          className={cn('transition-colors duration-200', errors.name && 'border-destructive')}
        />
        {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="pf-price" className="text-sm font-medium">
            Цена, ₽ <span className="text-destructive">*</span>
          </label>
          <Input
            id="pf-price"
            inputMode="numeric"
            value={priceRub}
            onChange={(e) => {
              setPriceRub(e.target.value)
              setErrors((x) => ({ ...x, priceRub: undefined }))
            }}
            placeholder="0"
            className={cn('transition-colors duration-200', errors.priceRub && 'border-destructive')}
          />
          {errors.priceRub ? <p className="text-xs text-destructive">{errors.priceRub}</p> : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="pf-stock" className="text-sm font-medium">
            На складе, шт. <span className="text-destructive">*</span>
          </label>
          <Input
            id="pf-stock"
            inputMode="numeric"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value)
              setErrors((x) => ({ ...x, stock: undefined }))
            }}
            placeholder="0"
            className={cn('transition-colors duration-200', errors.stock && 'border-destructive')}
          />
          {errors.stock ? <p className="text-xs text-destructive">{errors.stock}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="pf-cat" className="text-sm font-medium">
          Категория
        </label>
        <select
          id="pf-cat"
          className={selectClassName}
          value={category}
          disabled={submitting}
          onChange={(e) => setCategory(e.target.value)}
        >
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="pf-status" className="text-sm font-medium">
          Статус
        </label>
        <select
          id="pf-status"
          className={selectClassName}
          value={status}
          disabled={submitting}
          onChange={(e) => setStatus(e.target.value as ProductStatus)}
        >
          <option value="active">Активен</option>
          <option value="inactive">Неактивен</option>
        </select>
      </div>
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" disabled={submitting} onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Сохранение…
            </span>
          ) : initial ? (
            'Сохранить'
          ) : (
            'Добавить товар'
          )}
        </Button>
      </div>
    </form>
  )
}
