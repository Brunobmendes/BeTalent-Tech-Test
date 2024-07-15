import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Phone from './phone.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'

export default class Costumer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare fullname: string
  @column()
  declare birth: Date
  @column()
  declare cpf: string

  @hasMany(() => Phone)
  declare phones: HasMany<typeof Phone>
  @hasMany(() => Address)
  declare Addres: HasMany<typeof Address>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
