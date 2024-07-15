import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async login({ request, auth }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.findByOrFail('email', email)
    if (await hash.verify(user.password, password)) {
      return await auth.use('jwt').generate(user)
    }
  }
}
