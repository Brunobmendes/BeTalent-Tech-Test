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
import { middleware } from './kernel.js'
const CostumersController = () => import('#controllers/costumers_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/user', [UsersController, 'store'])
router.get('/user', [UsersController, 'show'])
router.patch('/user', [UsersController, 'update'])

router
  .group(() => {
    router.post('/costumer', [CostumersController, 'store'])
    router.get('/costumer', [CostumersController, 'index'])
    router.get('/costumer/:id', [CostumersController, 'show'])
    router.put('/costumer/:id', [CostumersController, 'update'])
    router.delete('costumer/:id', [CostumersController, 'destroy'])
  })
  .use(middleware.auth())

router.post('/login', [SessionController, 'login'])
