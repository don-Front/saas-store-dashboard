/**
 * Демо-данные дашборда: KPI и последние заказы (локальный state на странице).
 */

export type OrderStatus = 'paid' | 'pending'

export type RecentOrder = {
  id: string
  customerName: string
  /** Сумма в рублях (целое число). */
  amountRub: number
  status: OrderStatus
  /** Количество единиц товара в заказе — участвует в KPI «Товары». */
  units: number
  /** ISO 8601 — дата и время заказа. */
  orderedAt: string
}

/** Агрегированные показатели, выводятся в KpiCard (пересчитываются из списка заказов). */
export type DashboardKpis = {
  revenueRub: number
  ordersCount: number
  clientsCount: number
  /** Сумма полей `units` по всем заказам в списке. */
  productsUnits: number
}

export function computeDashboardKpis(orders: RecentOrder[]): DashboardKpis {
  const paid = orders.filter((o) => o.status === 'paid')
  return {
    revenueRub: paid.reduce((s, o) => s + o.amountRub, 0),
    ordersCount: orders.length,
    clientsCount: new Set(orders.map((o) => o.customerName)).size,
    productsUnits: orders.reduce((s, o) => s + o.units, 0),
  }
}

/**
 * 8 последних заказов для стартового state (даты согласованы с демо-периодом в «Заказах»).
 */
export const initialRecentOrders: RecentOrder[] = [
  {
    id: 'd-801',
    customerName: 'Анна Смирнова',
    amountRub: 12_450,
    status: 'paid',
    units: 2,
    orderedAt: '2025-03-19T11:30:00.000Z',
  },
  {
    id: 'd-802',
    customerName: 'ИП «Вектор»',
    amountRub: 89_000,
    status: 'pending',
    units: 5,
    orderedAt: '2025-03-19T09:15:00.000Z',
  },
  {
    id: 'd-803',
    customerName: 'Михаил Козлов',
    amountRub: 3_200,
    status: 'paid',
    units: 1,
    orderedAt: '2025-03-18T16:40:00.000Z',
  },
  {
    id: 'd-804',
    customerName: 'ООО «Север»',
    amountRub: 156_780,
    status: 'pending',
    units: 12,
    orderedAt: '2025-03-18T14:12:00.000Z',
  },
  {
    id: 'd-805',
    customerName: 'Елена Волкова',
    amountRub: 7_890,
    status: 'paid',
    units: 3,
    orderedAt: '2025-03-17T11:00:00.000Z',
  },
  {
    id: 'd-806',
    customerName: 'Дмитрий Орлов',
    amountRub: 21_300,
    status: 'paid',
    units: 4,
    orderedAt: '2025-03-16T18:22:00.000Z',
  },
  {
    id: 'd-807',
    customerName: 'ООО «ТехноЛайн»',
    amountRub: 340_000,
    status: 'paid',
    units: 8,
    orderedAt: '2025-03-16T12:00:00.000Z',
  },
  {
    id: 'd-808',
    customerName: 'Светлана Никифорова',
    amountRub: 1_890,
    status: 'pending',
    units: 1,
    orderedAt: '2025-03-15T09:15:00.000Z',
  },
]

/** Снимок KPI, соответствующий `initialRecentOrders` (для документации и тестов). */
export const initialDashboardKpis: DashboardKpis = computeDashboardKpis(initialRecentOrders)

/** @deprecated Используйте `initialRecentOrders` */
export const initialDemoOrders: RecentOrder[] = initialRecentOrders

/** @deprecated Используйте `initialRecentOrders.slice(0, 5)` при необходимости */
export const recentOrders: RecentOrder[] = initialRecentOrders.slice(0, 5)

export function orderStatusLabel(status: OrderStatus): string {
  return status === 'paid' ? 'Оплачен' : 'В ожидании'
}
