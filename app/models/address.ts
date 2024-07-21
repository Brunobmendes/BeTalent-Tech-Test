import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare customerId: string
  @column()
  declare streetAddress: string
  @column()
  declare addressLine2: string
  @column()
  declare city: string
  @column()
  declare state: string
  @column()
  declare postalCode: string
  @column()
  declare country: string

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
