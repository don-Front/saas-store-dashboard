'use client'

/**
 * Клиентская форма входа: состояние, валидация (заглушка под backend),
 * редирект в дашборд после успешного логина.
 */
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Loader2, Store } from 'lucide-react'

import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Input } from '@/components/Input'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/ui/checkbox'

/** Демо-учётка до подключения API. */
const DEMO_EMAIL = 'admin@example.com'
const DEMO_PASSWORD = '123456'

/** Задержка перед переходом — имитация запроса к серверу (мс). */
const REDIRECT_DELAY_MS = 1200

type FieldErrors = {
  email?: boolean
  password?: boolean
}

function runValidation(email: string, password: string): { message: string; fields: FieldErrors } | null {
  const trimmedEmail = email.trim()
  if (!trimmedEmail || !password) {
    return {
      message: 'Заполните все поля',
      fields: { email: !trimmedEmail, password: !password },
    }
  }
  if (trimmedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return {
      message: 'Неверный адрес почты или пароль',
      fields: { email: true, password: true },
    }
  }
  return null
}

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const clearFeedback = useCallback(() => {
    setError('')
    setFieldErrors({})
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    const failure = runValidation(email, password)
    if (failure) {
      setError(failure.message)
      setFieldErrors(failure.fields)
      return
    }

    setError('')
    setFieldErrors({})
    setLoading(true)

    window.setTimeout(() => {
      router.push('/dashboard')
    }, REDIRECT_DELAY_MS)
  }

  const inputErrorClass = 'border-destructive focus-visible:ring-destructive'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10 sm:px-6">
      {/* Переключатель темы: доступен до входа, фиксирован в углу экрана */}
      <ThemeToggle className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6" />

      <div
        className={cn(
          'w-full max-w-md',
          'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0',
        )}
      >
        <Card className="border-border/80 shadow-lg shadow-black/5 transition-colors duration-300 dark:shadow-black/40">
          <CardHeader className="space-y-6 pb-2 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md ring-1 ring-border/60 transition-colors duration-300">
              <Store className="size-7" aria-hidden />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-semibold tracking-tight">Панель управления магазином</CardTitle>
              <CardDescription className="text-base">
                Войдите, чтобы управлять магазином и заказами.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                  Электронная почта
                </label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    clearFeedback()
                  }}
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className={cn('transition-colors duration-200', fieldErrors.email && inputErrorClass)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                    Пароль
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-primary underline-offset-4 transition-colors duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearFeedback()
                  }}
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.password)}
                  className={cn('transition-colors duration-200', fieldErrors.password && inputErrorClass)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(v) => setRememberMe(v === true)}
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Запомнить меня
                </label>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive transition-colors duration-200 dark:bg-destructive/20"
                >
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  'relative w-full font-medium transition-all duration-200',
                  'hover:brightness-[1.03] active:scale-[0.98] dark:hover:brightness-110',
                  'disabled:active:scale-100',
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Вход...
                  </span>
                ) : (
                  'Войти'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-1 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
            <span>
              Нет аккаунта?{' '}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 transition-colors duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                Создать аккаунт
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
