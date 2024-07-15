import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const user = await User.create({
      ...request.body(),
      password: await hash.make(request.body().password),
    })
    response.status(200)
    return {
      message: 'user successfully created',
      data: {
        name: user.name,
        email: user.email,
      },
    }
  }

  async show({ response, auth }: HttpContext) {
    await auth.authenticate()
    response.status(200)
    const user = auth.getUserOrFail() as any
    return {
      ...user.$original,
      password: null,
    }
  }

  async update({ request, auth }: HttpContext) {
    await auth.authenticate()
    const user = (await auth.getUserOrFail()) as any
    const updatedUser = await User.query()
      .where('id', user.$original.id)
      .update({ ...request.body() })
    return updatedUser
  }
}
