'use client'

/**
 * Демо дашборда: `initialRecentOrders` и агрегаты KPI из `@/data/dashboard`, всё в `useState` / `useMemo`.
 */
import { useCallback, useMemo, useState } from 'react'
import { Banknote, Loader2, Package, Plus, ShoppingBag, Users } from 'lucide-react'

import { KpiCard } from '@/components/dashboard/KpiCard'
import { RecentOrdersCard } from '@/components/dashboard/RecentOrdersCard'
import { SalesChartPlaceholder } from '@/components/dashboard/SalesChartPlaceholder'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import type { OrderStatus, RecentOrder } from '@/data/dashboard'
import { computeDashboardKpis, initialRecentOrders } from '@/data/dashboard'
import { formatIntegerRu, formatRubles } from '@/lib/format'
import { cn } from '@/lib/utils'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/ui/modal'

const selectOrderClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

export function DemoDashboard() {
  const [orders, setOrders] = useState<RecentOrder[]>(initialRecentOrders)
  const [modalOpen, setModalOpen] = useState(false)
  const [highlightId, setHighlightId] = useState<string | null>(null)
  const [orderSubmitting, setOrderSubmitting] = useState(false)
  const [removingIds, setRemovingIds] = useState<string[]>([])

  const [newName, setNewName] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newStatus, setNewStatus] = useState<OrderStatus>('pending')
  const [newUnits, setNewUnits] = useState('1')

  const kpis = useMemo(() => computeDashboardKpis(orders), [orders])

  const resetForm = useCallback(() => {
    setNewName('')
    setNewAmount('')
    setNewStatus('pending')
    setNewUnits('1')
  }, [])

  const handleAddOrder = async () => {
    const amount = Number.parseInt(newAmount.replace(/\s/g, ''), 10)
    const units = Number.parseInt(newUnits.replace(/\s/g, ''), 10)
    if (!newName.trim() || Number.isNaN(amount) || amount < 0 || Number.isNaN(units) || units < 1) return

    setOrderSubmitting(true)
    await new Promise((r) => window.setTimeout(r, 500))

    const id = `o-${Date.now()}`
    const row: RecentOrder = {
      id,
      customerName: newName.trim(),
      amountRub: amount,
      status: newStatus,
      units,
      orderedAt: new Date().toISOString(),
    }
    setOrders((prev) => [row, ...prev])
    setHighlightId(id)
    window.setTimeout(() => setHighlightId(null), 900)
    setModalOpen(false)
    resetForm()
    setOrderSubmitting(false)
  }

  const handleDeleteOrder = (id: string) => {
    if (removingIds.includes(id)) return
    setRemovingIds((prev) => [...prev, id])
    window.setTimeout(() => {
      setOrders((prev) => prev.filter((o) => o.id !== id))
      setRemovingIds((prev) => prev.filter((x) => x !== id))
    }, 320)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Панель управления</h1>
        <p className="text-sm text-muted-foreground sm:text-base">Обзор показателей магазина</p>
      </header>

      <section aria-label="Ключевые показатели">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Выручка"
            value={formatRubles(kpis.revenueRub)}
            caption="Только оплаченные заказы в списке"
            icon={Banknote}
          />
          <KpiCard
            title="Заказы"
            value={formatIntegerRu(kpis.ordersCount)}
            caption="Количество заказов в текущем списке"
            icon={ShoppingBag}
          />
          <KpiCard
            title="Клиенты"
            value={formatIntegerRu(kpis.clientsCount)}
            caption="Уникальные имена покупателей"
            icon={Users}
          />
          <KpiCard
            title="Товары"
            value={formatIntegerRu(kpis.productsUnits)}
            caption="Сумма единиц товара по заказам"
            icon={Package}
          />
        </div>
      </section>

      <section aria-label="Аналитика и заказы" className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0">
          <SalesChartPlaceholder />
        </div>
        <div className="min-w-0">
          <RecentOrdersCard
            orders={orders}
            highlightOrderId={highlightId}
            removingOrderIds={removingIds}
            onDeleteOrder={handleDeleteOrder}
            headerActions={
              <Button
                type="button"
                size="sm"
                className="gap-1.5 transition-transform duration-150 hover:brightness-105 active:scale-[0.98]"
                onClick={() => setModalOpen(true)}
              >
                <Plus className="size-4" aria-hidden />
                Добавить заказ
              </Button>
            }
          />
        </div>
      </section>

      <Modal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open)
          if (!open) resetForm()
        }}
      >
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <ModalHeader>
            <ModalTitle>Новый заказ</ModalTitle>
            <ModalDescription>Данные сохраняются только в памяти вкладки (без сервера).</ModalDescription>
          </ModalHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              void handleAddOrder()
            }}
          >
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="ord-name" className="text-sm font-medium">
                  Клиент
                </label>
                <Input
                  id="ord-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Имя или название организации"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ord-sum" className="text-sm font-medium">
                  Сумма, ₽
                </label>
                <Input
                  id="ord-sum"
                  inputMode="numeric"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ord-units" className="text-sm font-medium">
                  Единиц товара
                </label>
                <Input
                  id="ord-units"
                  inputMode="numeric"
                  value={newUnits}
                  onChange={(e) => setNewUnits(e.target.value)}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ord-st" className="text-sm font-medium">
                  Статус оплаты
                </label>
                <select
                  id="ord-st"
                  className={selectOrderClass}
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                >
                  <option value="paid">Оплачен</option>
                  <option value="pending">В ожидании</option>
                </select>
              </div>
            </div>
            <ModalFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModalOpen(false)
                  resetForm()
                }}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={orderSubmitting}>
                {orderSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Сохранение…
                  </span>
                ) : (
                  'Добавить'
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}
