# Структура каталога `src`

Описание папок и файлов в `src/` проекта **saas-store-dashboard** (Next.js App Router, Tailwind, shadcn/ui).

---

## Дерево файлов

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   ├── LoginForm.tsx
│   │   └── page.tsx
│   └── (with-sidebar)/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── products/page.tsx
│       ├── orders/page.tsx
│       ├── customers/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Table.tsx
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   └── modal.tsx
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
└── data/
    └── index.ts
```

---

## Назначение верхнего уровня

| Папка / файл | Роль |
|--------------|------|
| **`app/`** | App Router: маршруты, вложенные `layout.tsx`, страницы (`page.tsx`). |
| **`components/`** | Каркас (`Layout`, `Sidebar`) и обёртки над `@/ui` с кастомизацией приложения. |
| **`ui/`** | Примитивы в стиле shadcn (Radix + Tailwind). |
| **`lib/`** | Утилиты (`cn()`). |
| **`styles/`** | Глобальные стили и директивы Tailwind. |
| **`data/`** | Мок-данные для прототипирования страниц. |

**Разделение `components/` и `ui/`:** страницы и фичи импортируют `@/components/*`; примитивы и варианты — `@/ui/*`.

---

## `src/app/` — маршрутизация

| Файл / папка | Назначение |
|--------------|------------|
| **`layout.tsx`** | Корневой layout: `<html>`, `<body>`, шрифты, `globals.css`. |
| **`page.tsx`** | `/` — редирект на `/dashboard`. |
| **`login/`** | **`/login`** без сайдбара. |
| `login/LoginForm.tsx` | Разметка и логика формы входа. |
| `login/page.tsx` | Рендер `<LoginForm />`. |
| **`(with-sidebar)/`** | [Route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups): имя **не** в URL. |
| `(with-sidebar)/layout.tsx` | Обёртка в `Layout` (Sidebar + Topbar + `{children}`). |
| `(with-sidebar)/dashboard/page.tsx` | **`/dashboard`**. |
| `(with-sidebar)/products/page.tsx` | **`/products`**. |
| `(with-sidebar)/orders/page.tsx` | **`/orders`**. |
| `(with-sidebar)/customers/page.tsx` | **`/customers`**. |
| `(with-sidebar)/settings/page.tsx` | **`/settings`**. |

В сегментах с маршрутом достаточно одного **`page.tsx`** (без дублирующего `index.tsx`).

Итоговые URL: `/`, `/login`, `/dashboard`, `/products`, `/orders`, `/customers`, `/settings`.

---

## `src/components/`

| Файл | Роль |
|------|------|
| **`Layout.tsx`** | Сетка: Sidebar, Topbar, `<main>{children}</main>`. |
| **`Sidebar.tsx`** | Боковая навигация. |
| **`Button.tsx`**, **`Input.tsx`** | Обёртки над `@/ui/button`, `@/ui/input` (+ `className` / общие классы). |
| **`Card.tsx`** | Обёртка корня `@/ui/card`; реэкспорт `CardHeader`, `CardTitle`, … |
| **`Table.tsx`** | Заготовка таблицы для списков. |

---

## `src/ui/`

| Файл | Роль |
|------|------|
| **`button.tsx`** | Кнопка (CVA + Slot). |
| **`input.tsx`** | Поле ввода. |
| **`card.tsx`** | Карточка и секции. |
| **`select.tsx`** | Select (Radix). |
| **`checkbox.tsx`** | Checkbox (Radix). |
| **`modal.tsx`** | Модальное окно = Dialog (Radix), экспорт `Modal`, `ModalContent`, … |

---

## `src/lib/`

| Файл | Роль |
|------|------|
| **`utils.ts`** | `cn()` — объединение классов Tailwind. |

---

## `src/styles/`

| Файл | Роль |
|------|------|
| **`globals.css`** | Tailwind, CSS-переменные темы (в т.ч. `popover`). |

---

## `src/data/`

| Файл | Роль |
|------|------|
| **`index.ts`** | Экспорт моков для страниц без бекенда. |

---

## Связанные папки вне `src`

- **`public/`** — статика (`logos/`, `images/`).
- **`components.json`** — конфигурация shadcn (алиасы `@/components`, `@/ui`).
