import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import { SaleStatus } from './enums/sale_enum.js'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number
  @column()
  declare productId: number
  @column()
  declare quantity: number
  @column()
  declare unitPrice: number
  @column()
  declare totalPrice: number
  @column()
  declare status: SaleStatus

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare finishedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async setFinishedAt(sale: Sale) {
    if (sale.$dirty.status && sale.status === 'finished') {
      sale.finishedAt = DateTime.now()
    }
  }
}
