import { SaleStatus } from '#models/enums/sale_enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.decimal('unit_price', 16, 2).notNullable()
      table.decimal('total_price', 16, 2).notNullable()
      table
        .enum('status', ['pending', 'finished', 'canceled', 'refunded'])
        .notNullable()
        .defaultTo(SaleStatus.FINISHED)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('finished_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
