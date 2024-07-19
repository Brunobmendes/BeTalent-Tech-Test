import { SaleStatus } from '#models/enums/sale_enum'
import Sale from '#models/sale'
import { createSaleValidator, udpateSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async index({ response }: HttpContext) {
    const allSales = await Sale.all()
    response.ok(allSales)
  }

  async show({ params, response }: HttpContext) {
    const sale = await Sale.query().where('id', params.id).preload('costumer').preload('product')
    response.ok(sale)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSaleValidator)
    const createdSale = Sale.create(data)
    return createdSale
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(udpateSaleValidator)
      const sale = await Sale.findOrFail(params.id)
      const updatedSale = sale.merge(data).save()
      response.ok(updatedSale)
    } catch (err) {
      response.badRequest(err)
    }
  }

  async destroy({ params, response }: HttpContext) {
    const data = await Sale.findByOrFail(params.id)
    await data.delete()

    response.accepted(data)
  }

  async finish({ params, response }: HttpContext) {
    const sale = await Sale.findOrFail(params.id)
    const finishedSale = await sale
      .merge({
        status: SaleStatus.FINISHED,
      })
      .save()
    response.ok('FINISHED')
    return finishedSale
  }
}
