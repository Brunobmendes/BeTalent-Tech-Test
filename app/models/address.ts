import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Costumer from './costumer.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare costumerId: string
  @column()
  declare streetAddress: string
  @column()
  declare addressLine2: string
  @column()
  declare city: string
  @column()
  declare state: string
  @column()
  declare postal_code: string
  @column()
  declare country: string

  @belongsTo(() => Costumer)
  declare costumer: BelongsTo<typeof Costumer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
function belongsTo(arg0: () => any): (target: Address, propertyKey: 'costumer') => void {
  throw new Error('Function not implemented.')
}