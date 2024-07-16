import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Costumer from './costumer.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare costumerId: number
  @column()
  declare phone: string

  @belongsTo(() => Costumer)
  declare costumer: BelongsTo<typeof Costumer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
