import type { Metadata } from 'next'

import { DemoSettings } from '@/components/demo/DemoSettings'

export const metadata: Metadata = {
  title: 'Настройки',
  description: 'Параметры админ-панели и магазина',
}

export default function SettingsPage() {
  return <DemoSettings />
}
