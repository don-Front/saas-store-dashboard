import type { Metadata } from 'next'

import { DemoProducts } from '@/components/demo/DemoProducts'

export const metadata: Metadata = {
  title: 'Товары',
  description: 'Каталог и остатки интернет-магазина',
}

export default function ProductsPage() {
  return <DemoProducts />
}
