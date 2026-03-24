import type { Metadata } from 'next'

import { LoginForm } from './LoginForm'

/**
 * Маршрут `/login` — вне группы `(with-sidebar)`, без боковой панели.
 */
export const metadata: Metadata = {
  title: 'Вход — панель магазина',
  description: 'Вход в панель администрирования интернет-магазина.',
}

export default function LoginPage() {
  return <LoginForm />
}
