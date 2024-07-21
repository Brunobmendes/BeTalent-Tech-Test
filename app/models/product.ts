import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeDelete,
  beforeFetch,
  beforeFind,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Sale from './sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare description: string
  @column()
  declare name: string
  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @beforeDelete()
  static async softDelete(product: Product) {
    product.deletedAt = DateTime.now()
    await product.save()
  }

  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Product>) {
    query.whereNull('deleted_at')
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
