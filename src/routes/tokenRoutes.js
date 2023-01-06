import { Router } from 'express'
import tokenController from '../controllers/tokenController'
const router = Router()

router.post('/', tokenController.store)

export default router
