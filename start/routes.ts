/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/user', [UsersController, 'store'])
router.get('/user', [UsersController, 'show'])
router.patch('/user', [UsersController, 'update'])

router.post('/login', [SessionController, 'login'])
