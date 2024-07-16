import Costumer from '#models/costumer'

import { createCostumerValidator, updateCostumerValidator } from '#validators/costumer'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CostumersController {
  async index({ response }: HttpContext) {
    const costumers = await Costumer.query().orderBy('id', 'asc')
    return response.json(costumers)
  }

  async show({ params, response }: HttpContext) {
    const costumer = await Costumer.query()
      .where('costumers.id', params.id)
      .preload('Addresses')
      .preload('Phones')
    return response.json(costumer)
  }

  async store({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const body = await request.validateUsing(createCostumerValidator)

      const createdCostumer = await Costumer.create(
        { fullname: body.fullname, birth: new Date(body.birth), cpf: body.cpf },
        { client: trx }
      )
      const createdPhone = await trx.insertQuery().table('phones').insert({
        phone: body.phone,
        costumer_id: createdCostumer.id,
        created_at: Date.now(),
        updated_at: Date.now(),
      })

      const createdAddress = await trx
        .insertQuery()
        .table('addresses')
        .insert({
          ...body.address,
          costumer_id: createdCostumer.id,
          created_at: Date.now(),
          updated_at: Date.now(),
        })

      await trx.commit()
      return response.json({
        createdCostumer,
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
      const data = await request.validateUsing(updateCostumerValidator)

      const updatedCostumer = await Costumer.findOrFail(params.id)
      updatedCostumer.merge({ ...data }).save()
      return response.json(updatedCostumer)
    } catch (error) {
      return response.badRequest({
        message: 'Error updating user, profile, and address',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const deletedCostumer = await Costumer.query().where('id', params.id).delete()
    response.json(deletedCostumer)
  }
}
