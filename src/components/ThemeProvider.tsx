'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Провайдер темы next-themes: класс `dark` на `<html>` синхронизируется с выбором пользователя.
 * Оборачивает всё приложение в корневом `layout.tsx`.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props} storageKey="saas-store-dashboard-theme">
      {children}
    </NextThemesProvider>
  )
}
