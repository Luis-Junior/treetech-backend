import {Router ,Request, Response} from 'express';
import * as alarmeController from '../controllers/alarmeController';
const router = Router() 


router.get('/', alarmeController.getAll)
router.post('/', alarmeController.create)
router.get('/findByClassificacao/:id', alarmeController.findByClassificacao)


router.get('/:id', alarmeController.getById)
router.put('/:id', alarmeController.update)
router.delete('/:id', alarmeController.deleteAlarme)

// router.post('/ativar/:id', alarmeController.ativarAlarme)
// router.post('/desativar/:id', alarmeController.desativarAlarme)


export default router;