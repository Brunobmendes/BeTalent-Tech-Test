import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Phone from './phone.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Sale from './sale.js'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare fullname: string
  @column()
  declare birth: Date
  @column()
  declare cpf: string

  @hasMany(() => Phone)
  declare Phones: HasMany<typeof Phone>
  @hasMany(() => Address)
  declare Addresses: HasMany<typeof Address>
  @hasMany(() => Sale)
  declare Sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
