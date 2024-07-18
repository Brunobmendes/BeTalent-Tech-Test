import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const allProducts = await Product.query().orderBy('name', 'asc')
    response.ok(allProducts)
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)
    response.json(product)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
    const product = await Product.create(data)

    response.created(product)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateProductValidator)
    const product = await Product.findOrFail(params.id)
    const updatedProduct = await product.merge(data).save()

    response.ok(updatedProduct)
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findByOrFail('id', params.id)
    await Product.softDelete(product)

    response.accepted(product)
  }
}
