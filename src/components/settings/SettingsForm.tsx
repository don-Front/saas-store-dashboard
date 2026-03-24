'use client'

/**
 * Секции настроек: профиль, магазин, уведомления (полностью на русском).
 * Ошибки: «Обязательное поле», «Неверный формат email»; успех — анимированный toast; кнопки с индикатором загрузки.
 */
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { CheckCircle2, Loader2 } from 'lucide-react'

import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Input } from '@/components/Input'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/ui/checkbox'
import {
  initialAdminProfile,
  initialNotificationSettings,
  initialShopSettings,
} from '@/data/settings'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const selectClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

type ProfileErrors = Partial<Record<'adminName' | 'adminEmail' | 'newPassword' | 'confirmPassword', string>>
type ShopErrors = Partial<Record<'shopName', string>>

export function SettingsForm() {
  const { theme, setTheme } = useTheme()

  const [adminName, setAdminName] = useState(initialAdminProfile.name)
  const [adminEmail, setAdminEmail] = useState(initialAdminProfile.email)
  const [adminPhone, setAdminPhone] = useState(initialAdminProfile.phone)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [shopName, setShopName] = useState(initialShopSettings.shopName)
  const [currency, setCurrency] = useState(initialShopSettings.currency)
  const [language, setLanguage] = useState<'ru' | 'en'>(initialShopSettings.language)

  const [notifyEmail, setNotifyEmail] = useState(initialNotificationSettings.notifyEmail)
  const [notifySms, setNotifySms] = useState(initialNotificationSettings.notifySms)

  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({})
  const [shopErrors, setShopErrors] = useState<ShopErrors>({})
  const [toast, setToast] = useState<string | null>(null)
  const [profileSaving, setProfileSaving] = useState(false)
  const [shopSaving, setShopSaving] = useState(false)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 3200)
  }

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: ProfileErrors = {}
    if (!adminName.trim()) next.adminName = 'Обязательное поле'
    if (!adminEmail.trim()) next.adminEmail = 'Обязательное поле'
    else if (!emailRe.test(adminEmail.trim())) next.adminEmail = 'Неверный формат email'
    if (newPassword || confirmPassword) {
      if (confirmPassword && !newPassword) next.newPassword = 'Введите новый пароль'
      else if (newPassword && !confirmPassword) next.confirmPassword = 'Подтвердите пароль'
      else if (newPassword.length < 6) next.newPassword = 'Минимум 6 символов'
      else if (newPassword !== confirmPassword) next.confirmPassword = 'Пароли не совпадают'
    }
    setProfileErrors(next)
    if (Object.keys(next).length > 0) return

    setProfileSaving(true)
    await new Promise((r) => window.setTimeout(r, 500))
    showToast('Изменения профиля сохранены')
    setNewPassword('')
    setConfirmPassword('')
    setProfileSaving(false)
  }

  const saveShop = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: ShopErrors = {}
    if (!shopName.trim()) next.shopName = 'Обязательное поле'
    setShopErrors(next)
    if (Object.keys(next).length > 0) return

    setShopSaving(true)
    await new Promise((r) => window.setTimeout(r, 500))
    showToast('Настройки магазина сохранены')
    setShopSaving(false)
  }

  const handleNotifyChange = (kind: 'email' | 'sms', value: boolean) => {
    if (kind === 'email') setNotifyEmail(value)
    else setNotifySms(value)
    showToast('Настройки уведомлений обновлены')
  }

  const themeValue = (theme ?? 'system') as 'light' | 'dark' | 'system'

  return (
    <>
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 left-1/2 z-[100] flex max-w-[min(90vw,24rem)] -translate-x-1/2 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg',
            'animate-in fade-in slide-in-from-bottom-4 duration-300 dark:shadow-black/50',
          )}
        >
          <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
          {toast}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-xl border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md dark:shadow-black/20">
          <CardHeader>
            <CardTitle>Профиль администратора</CardTitle>
            <CardDescription>Личные данные и смена пароля (только в демо, без сервера).</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => void saveProfile(e)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="adm-name" className="text-sm font-medium">
                  Имя <span className="text-destructive">*</span>
                </label>
                <Input
                  id="adm-name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className={cn('transition-colors duration-200', profileErrors.adminName && 'border-destructive')}
                />
                {profileErrors.adminName ? <p className="text-xs text-destructive">{profileErrors.adminName}</p> : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="adm-email" className="text-sm font-medium">
                  Электронная почта <span className="text-destructive">*</span>
                </label>
                <Input
                  id="adm-email"
                  type="email"
                  autoComplete="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className={cn('transition-colors duration-200', profileErrors.adminEmail && 'border-destructive')}
                />
                {profileErrors.adminEmail ? <p className="text-xs text-destructive">{profileErrors.adminEmail}</p> : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="adm-phone" className="text-sm font-medium">
                  Телефон
                </label>
                <Input
                  id="adm-phone"
                  type="tel"
                  autoComplete="tel"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="transition-colors duration-200"
                />
              </div>
              <div className="space-y-2 border-t border-border/70 pt-4">
                <p className="text-sm font-medium text-foreground">Смена пароля</p>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn('transition-colors duration-200', profileErrors.newPassword && 'border-destructive')}
                />
                {profileErrors.newPassword ? <p className="text-xs text-destructive">{profileErrors.newPassword}</p> : null}
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Подтверждение пароля"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn('transition-colors duration-200', profileErrors.confirmPassword && 'border-destructive')}
                />
                {profileErrors.confirmPassword ? (
                  <p className="text-xs text-destructive">{profileErrors.confirmPassword}</p>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60">
              <Button
                type="submit"
                disabled={profileSaving}
                className="transition-transform duration-150 hover:brightness-105 active:scale-[0.98] disabled:active:scale-100"
              >
                {profileSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Сохранение…
                  </span>
                ) : (
                  'Сохранить изменения'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="rounded-xl border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md dark:shadow-black/20">
          <CardHeader>
            <CardTitle>Настройки магазина</CardTitle>
            <CardDescription>Название, валюта, язык и тема интерфейса.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => void saveShop(e)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="shop-name" className="text-sm font-medium">
                  Название магазина <span className="text-destructive">*</span>
                </label>
                <Input
                  id="shop-name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className={cn('transition-colors duration-200', shopErrors.shopName && 'border-destructive')}
                />
                {shopErrors.shopName ? <p className="text-xs text-destructive">{shopErrors.shopName}</p> : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="shop-currency" className="text-sm font-medium">
                  Валюта
                </label>
                <select
                  id="shop-currency"
                  className={selectClass}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="RUB">₽ Рубль (RUB)</option>
                  <option value="USD">$ Доллар (USD)</option>
                  <option value="EUR">€ Евро (EUR)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="shop-lang" className="text-sm font-medium">
                  Язык интерфейса
                </label>
                <select
                  id="shop-lang"
                  className={selectClass}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
                >
                  <option value="ru">Русский</option>
                  <option value="en">Английский (демо)</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  В демо переключение языка только локальное, без перевода всего приложения.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Тема оформления</span>
                <select
                  id="shop-theme"
                  className={selectClass}
                  disabled={!mounted}
                  value={themeValue}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Тёмная</option>
                  <option value="system">Как в системе</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Синхронизировано с переключателем темы в шапке страницы настроек.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60">
              <Button
                type="submit"
                disabled={shopSaving}
                className="transition-transform duration-150 hover:brightness-105 active:scale-[0.98] disabled:active:scale-100"
              >
                {shopSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Сохранение…
                  </span>
                ) : (
                  'Сохранить'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Card className="rounded-xl border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md dark:shadow-black/20">
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
          <CardDescription>Каналы оповещений (демо, без реальной отправки).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="notif-email"
              checked={notifyEmail}
              onCheckedChange={(v) => handleNotifyChange('email', v === true)}
            />
            <label htmlFor="notif-email" className="cursor-pointer text-sm leading-none text-foreground">
              Уведомления по почте
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="notif-sms"
              checked={notifySms}
              onCheckedChange={(v) => handleNotifyChange('sms', v === true)}
            />
            <label htmlFor="notif-sms" className="cursor-pointer text-sm leading-none text-foreground">
              Уведомления по SMS
            </label>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
