import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async store({ request, response, auth }: HttpContext) {
    const user = await User.create({
      ...request.body(),
      password: await hash.make(request.body().password),
    })

    auth.authenticate()
    response.status(200)
    return {
      message: 'user successfully created',
      data: {
        name: user.name,
        email: user.email,
      },
    }
  }
}
