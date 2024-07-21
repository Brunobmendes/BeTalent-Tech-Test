import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('customer_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')

      table.string('street_address').notNullable()
      table.string('address_line_2')
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('postal_code').notNullable()
      table.string('country').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
