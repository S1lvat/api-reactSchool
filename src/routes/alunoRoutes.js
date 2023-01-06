import { Router } from 'express'
import alunoController from '../controllers/alunoController'
import loginRequired from '../middlewares/loginRequired'
const router = Router()

router.post('/', loginRequired, alunoController.store)
router.get('/', loginRequired, alunoController.index)
router.get('/:id', loginRequired, alunoController.show)
router.put('/:id', loginRequired, alunoController.update)
router.delete('/:id', loginRequired, alunoController.delete)

export default router
