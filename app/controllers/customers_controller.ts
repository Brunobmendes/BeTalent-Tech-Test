import Customer from '#models/customer'

import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class CustomersController {
  async index({ response }: HttpContext) {
    const customers = await Customer.query().orderBy('id', 'asc')
    return response.json(customers)
  }

  async show({ params, response }: HttpContext) {
    const customer = await Customer.query()
      .where('customers.id', params.id)
      .preload('Addresses')
      .preload('Phones')
      .preload('Sales')

    return response.json(customer)
  }

  async store({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const body = await request.validateUsing(createCustomerValidator)

      const createdCustomer = await Customer.create(
        { fullname: body.fullname, birth: new Date(body.birth), cpf: body.cpf },
        { client: trx }
      )
      const createdPhone = await trx.insertQuery().table('phones').insert({
        phone: body.phone,
        customer_id: createdCustomer.id,
        created_at: DateTime.local().toISO(),
        updated_at: DateTime.local().toISO(),
      })

      const createdAddress = await trx
        .insertQuery()
        .table('addresses')
        .insert({
          ...body.address,
          customer_id: createdCustomer.id,
          created_at: DateTime.local().toISO(),
          updated_at: DateTime.local().toISO(),
        })

      await trx.commit()
      return response.json({
        createdCustomer,
        createdPhone,
        createdAddress,
      })
    } catch (error) {
      await trx.rollback()
      return response.badRequest({
        message: 'Error creating user, profile, and address',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateCustomerValidator)

      const updatedCustomer = await Customer.findOrFail(params.id)
      updatedCustomer.merge({ ...data }).save()
      return response.json(updatedCustomer)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating user, profile, and address',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const deletedCustomer = await Customer.query().where('id', params.id).delete()
    response.json(deletedCustomer)
  }
}
