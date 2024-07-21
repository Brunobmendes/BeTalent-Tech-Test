const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SalesController = () => import('#controllers/sales_controller')
const ProductsController = () => import('#controllers/products_controller')
const CustomersController = () => import('#controllers/customers_controller')

router.post('/signup', [UsersController, 'store'])
router.get('/user', [UsersController, 'show'])
router.patch('/user', [UsersController, 'update'])

router.post('/login', [SessionController, 'login'])

router
  .group(() => {
    router.get('/customer', [CustomersController, 'index'])
    router.get('/customer/:id', [CustomersController, 'show'])
    router.post('/customer', [CustomersController, 'store'])
    router.patch('/customer/:id', [CustomersController, 'update'])
    router.delete('customer/:id', [CustomersController, 'destroy'])

    router.get('/product', [ProductsController, 'index'])
    router.get('/product/:id', [ProductsController, 'show'])
    router.post('/product', [ProductsController, 'store'])
    router.patch('/product/:id', [ProductsController, 'update'])
    router.delete('product/:id', [ProductsController, 'destroy'])

    router.post('/sale', [SalesController, 'store'])
    router.get('/sale', [SalesController, 'index'])
    router.get('/sale/:id', [SalesController, 'show'])
    router.patch('/sale/:id', [SalesController, 'update'])
    router.delete('/sale/:id', [SalesController, 'destroy'])
    router.patch('/sale/:id/finish', [SalesController, 'finish'])
  })
  .use(middleware.auth())
