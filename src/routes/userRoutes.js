import { Router } from 'express'
import userController from '../controllers/userController'

import loginRequired from '../middlewares/loginRequired'

const router = new Router()

// nao deveria existir
router.get('/', userController.index)
router.get('/:id', userController.show)

// pode existir
router.post('/', userController.store)
router.put('/', loginRequired, userController.update)
router.delete('/', loginRequired, userController.delete)

export default router
