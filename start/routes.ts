const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SalesController = () => import('#controllers/sales_controller')
const ProductsController = () => import('#controllers/products_controller')
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
    router.patch('/costumer/:id', [CostumersController, 'update'])
    router.delete('costumer/:id', [CostumersController, 'destroy'])

    router.post('/product', [ProductsController, 'store'])
    router.get('/product', [ProductsController, 'index'])
    router.get('/product/:id', [ProductsController, 'show'])
    router.patch('/product/:id', [ProductsController, 'update'])
    router.delete('product/:id', [ProductsController, 'destroy'])

    router.post('/sale', [SalesController, 'store'])
    router.get('/sale', [SalesController, 'index'])
    router.get('/sale/:id', [SalesController, 'show'])
    router.patch('/sale/:id', [SalesController, 'update'])
    router.delete('/sale/:id', [SalesController, 'destroy'])
  })
  .use(middleware.auth())

router.post('/login', [SessionController, 'login'])
