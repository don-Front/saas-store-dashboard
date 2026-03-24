import type { Metadata } from 'next'

import { DemoDashboard } from '@/components/demo/DemoDashboard'

export const metadata: Metadata = {
  title: 'Панель управления',
  description: 'Обзор показателей магазина',
}

export default function DashboardPage() {
  return <DemoDashboard />
}
