import { redirect } from 'next/navigation'

/** Корень сайта `/` — перенаправление в основной раздел дашборда. */
export default function HomePage() {
  redirect('/dashboard')
}
