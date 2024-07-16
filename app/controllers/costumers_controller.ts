import Address from '#models/address'
import Costumer from '#models/costumer'
import Phone from '#models/phone'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CostumersController {
  async index({ response }: HttpContext) {
    const costumers = await Costumer.query().orderBy('id', 'asc')
    return response.json(costumers)
  }

  async show({ params, response }: HttpContext) {
    const costumer = await Costumer.query()
      .leftJoin('addresses', 'costumers.id', 'addresses.costumer_id')
      .leftJoin('phones', 'costumers.id', 'phones.costumer_id')
      .where('costumer.id', params.id)
    return response.json(costumer)
  }

  async store({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const { costumer, phone, address } = request.only(['costumer', 'phone', 'address'])
      const createdCostumer = await Costumer.create(costumer, { client: trx })
      const createdPhone = await trx.insertQuery().table('phones').insert(phone)
      const createdAddress = await trx.insertQuery().table('addresses').insert(address)
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
    const trx = await db.transaction()
    try {
      const { costumer, phone, address } = request.only(['costumer', 'phone', 'address'])
      const updatedCostumer = await Costumer.findOrFail(params.id)
      updatedCostumer.merge(costumer)
      await updatedCostumer.useTransaction(trx).save()

      const updatedPhone = await Phone.findOrFail(phone.id)
      updatedCostumer.merge(phone)
      await updatedCostumer.useTransaction(trx).save()

      const updatedAddress = await Address.findOrFail(address.id)
      updatedAddress.merge(address)
      await updatedAddress.useTransaction(trx).save()
      await trx.commit()
      return response.json({
        updatedCostumer,
        updatedPhone,
        updatedAddress,
      })
    } catch (error) {
      await trx.rollback()
      return response.badRequest({
        message: 'Error creating user, profile, and address',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const deletedCostumer = await Costumer.query().where('id', params.id).delete()
    response.json(deletedCostumer)
  }
}
