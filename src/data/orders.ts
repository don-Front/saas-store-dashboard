/**
 * Демо-заказы для страницы «Заказы» (~10 записей, без API).
 */

export type OrderDemoStatus = 'paid' | 'pending' | 'cancelled'

export type OrderLineItem = {
  name: string
  quantity: number
}

export type DemoOrder = {
  id: string
  customerName: string
  customerEmail: string
  /** ISO 8601 (дата заказа). */
  orderedAt: string
  amountRub: number
  status: OrderDemoStatus
  lines: OrderLineItem[]
}

export const orderStatusLabelRu: Record<OrderDemoStatus, string> = {
  paid: 'Оплачен',
  pending: 'В ожидании',
  cancelled: 'Отменён',
}

export const initialDemoOrdersList: DemoOrder[] = [
  {
    id: 'ORD-1042',
    customerName: 'Анна Смирнова',
    customerEmail: 'anna.s@mail.ru',
    orderedAt: '2025-03-18T10:24:00.000Z',
    amountRub: 12_450,
    status: 'paid',
    lines: [
      { name: 'Беспроводные наушники Pro', quantity: 1 },
      { name: 'Чехол силиконовый', quantity: 2 },
    ],
  },
  {
    id: 'ORD-1041',
    customerName: 'ИП «Вектор»',
    customerEmail: 'zakaz@vector-spb.ru',
    orderedAt: '2025-03-18T09:05:00.000Z',
    amountRub: 89_000,
    status: 'pending',
    lines: [
      { name: 'Умные часы Lite', quantity: 10 },
      { name: 'Ремешок запасной', quantity: 10 },
    ],
  },
  {
    id: 'ORD-1040',
    customerName: 'Михаил Козлов',
    customerEmail: 'kozlov.m@gmail.com',
    orderedAt: '2025-03-17T16:40:00.000Z',
    amountRub: 3_200,
    status: 'paid',
    lines: [{ name: 'Коврик для йоги', quantity: 1 }],
  },
  {
    id: 'ORD-1039',
    customerName: 'ООО «Север»',
    customerEmail: 'snab@sever-opt.ru',
    orderedAt: '2025-03-17T14:12:00.000Z',
    amountRub: 156_780,
    status: 'pending',
    lines: [
      { name: 'Набор кастрюль', quantity: 4 },
      { name: 'Пылесос ручной', quantity: 2 },
    ],
  },
  {
    id: 'ORD-1038',
    customerName: 'Елена Волкова',
    customerEmail: 'elena.volkova@yandex.ru',
    orderedAt: '2025-03-17T11:00:00.000Z',
    amountRub: 7_890,
    status: 'cancelled',
    lines: [
      { name: 'Сыворотка для лица', quantity: 3 },
      { name: 'Шампунь восстанавливающий', quantity: 2 },
    ],
  },
  {
    id: 'ORD-1037',
    customerName: 'Дмитрий Орлов',
    customerEmail: 'd.orlov@mail.ru',
    orderedAt: '2025-03-16T18:22:00.000Z',
    amountRub: 21_300,
    status: 'paid',
    lines: [
      { name: 'Кроссовки беговые', quantity: 1 },
      { name: 'Носки спортивные', quantity: 3 },
    ],
  },
  {
    id: 'ORD-1036',
    customerName: 'ООО «ТехноЛайн»',
    customerEmail: 'order@technoline.ru',
    orderedAt: '2025-03-16T12:00:00.000Z',
    amountRub: 340_000,
    status: 'paid',
    lines: [{ name: 'Планшет 10"', quantity: 8 }],
  },
  {
    id: 'ORD-1035',
    customerName: 'Светлана Никифорова',
    customerEmail: 'svetlana.n@inbox.ru',
    orderedAt: '2025-03-15T09:15:00.000Z',
    amountRub: 1_890,
    status: 'pending',
    lines: [{ name: 'Роман «Северный ветер»', quantity: 1 }],
  },
  {
    id: 'ORD-1034',
    customerName: 'ИП Зайцев',
    customerEmail: 'zaycev.ip@mail.ru',
    orderedAt: '2025-03-15T08:30:00.000Z',
    amountRub: 45_600,
    status: 'paid',
    lines: [
      { name: 'Футболка базовая', quantity: 12 },
      { name: 'Худи оверсайз', quantity: 6 },
    ],
  },
  {
    id: 'ORD-1033',
    customerName: 'Кафе «Уют»',
    customerEmail: 'zakup@uyut-cafe.ru',
    orderedAt: '2025-03-14T15:45:00.000Z',
    amountRub: 8_120,
    status: 'paid',
    lines: [
      { name: 'Набор полотенец', quantity: 4 },
      { name: 'Кружки керамические', quantity: 8 },
    ],
  },
]
