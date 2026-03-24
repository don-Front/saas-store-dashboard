/**
 * Демо-каталог (~10 позиций) для страницы «Товары» без бекенда.
 */

export type ProductStatus = 'active' | 'inactive'

export type DemoProduct = {
  id: string
  name: string
  priceRub: number
  stock: number
  category: string
  status: ProductStatus
}

export const PRODUCT_CATEGORIES = ['Электроника', 'Одежда', 'Дом и быт', 'Красота', 'Спорт', 'Книги'] as const

export function productStatusLabel(status: ProductStatus): string {
  return status === 'active' ? 'Активен' : 'Неактивен'
}

/** Стартовый набор для интерактивного CRUD в памяти вкладки. */
export const initialDemoProducts: DemoProduct[] = [
  { id: 'p1', name: 'Беспроводные наушники Pro', priceRub: 12_990, stock: 34, category: 'Электроника', status: 'active' },
  { id: 'p2', name: 'Умные часы Lite', priceRub: 8_450, stock: 12, category: 'Электроника', status: 'active' },
  { id: 'p3', name: 'Клавиатура механическая', priceRub: 9_200, stock: 0, category: 'Электроника', status: 'inactive' },
  { id: 'p4', name: 'Худи оверсайз', priceRub: 3_290, stock: 120, category: 'Одежда', status: 'active' },
  { id: 'p5', name: 'Джинсы классические', priceRub: 4_100, stock: 56, category: 'Одежда', status: 'active' },
  { id: 'p6', name: 'Кроссовки беговые', priceRub: 7_890, stock: 28, category: 'Спорт', status: 'active' },
  { id: 'p7', name: 'Коврик для йоги', priceRub: 1_490, stock: 45, category: 'Спорт', status: 'active' },
  { id: 'p8', name: 'Набор кастрюль', priceRub: 6_700, stock: 8, category: 'Дом и быт', status: 'active' },
  { id: 'p9', name: 'Пылесос ручной', priceRub: 5_200, stock: 3, category: 'Дом и быт', status: 'inactive' },
  { id: 'p10', name: 'Сыворотка для лица', priceRub: 2_150, stock: 90, category: 'Красота', status: 'active' },
]
