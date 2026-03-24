import type { Metadata } from 'next'

import { DemoOrders } from '@/components/demo/DemoOrders'

export const metadata: Metadata = {
  title: 'Заказы',
  description: 'Управление заказами интернет-магазина',
}

export default function OrdersPage() {
  return <DemoOrders />
}
