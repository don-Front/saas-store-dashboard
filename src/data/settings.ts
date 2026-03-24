/**
 * Демо-значения настроек (профиль, магазин, уведомления) до подключения API.
 */

export type AdminProfileDefaults = {
  name: string
  email: string
  phone: string
}

export type ShopSettingsDefaults = {
  shopName: string
  currency: string
  language: 'ru' | 'en'
}

export type NotificationDefaults = {
  notifyEmail: boolean
  notifySms: boolean
}

export const initialAdminProfile: AdminProfileDefaults = {
  name: 'Алексей Администратор',
  email: 'admin@store-demo.ru',
  phone: '+7 (999) 000-11-22',
}

export const initialShopSettings: ShopSettingsDefaults = {
  shopName: 'Демо Маркет',
  currency: 'RUB',
  language: 'ru',
}

export const initialNotificationSettings: NotificationDefaults = {
  notifyEmail: true,
  notifySms: false,
}
