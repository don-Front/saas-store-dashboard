import type { Metadata } from 'next'

import { DemoCustomers } from '@/components/demo/DemoCustomers'

export const metadata: Metadata = {
  title: 'Клиенты',
  description: 'База клиентов интернет-магазина',
}

export default function CustomersPage() {
  return <DemoCustomers />
}
