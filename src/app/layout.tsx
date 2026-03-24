/**
 * Корневой layout приложения: шрифты, глобальные стили, оболочка `<html>` / `<body>`.
 * `ThemeProvider` подключает next-themes (класс `dark` на `<html>`).
 */
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/ThemeProvider'

import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Панель магазина',
    template: '%s · Панель магазина',
  },
  description: 'Демо админ-панели интернет-магазина для портфолио',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
