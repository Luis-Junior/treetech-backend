import {Router ,Request, Response} from 'express';
import * as alarmeController from '../controllers/alarmeController';
const router = Router() 


router.get('/', alarmeController.getAll)
router.post('/', alarmeController.create)
router.get('/maisAtuados', alarmeController.maisAtuados)
router.get('/findByClassificacao/:id', alarmeController.findByClassificacao)
router.get('/ativarAlarme/:id', alarmeController.ativarAlarme)
router.get('/desativarAlarme/:id', alarmeController.desativarAlarme)
router.get('/:id', alarmeController.getById)
router.put('/:id', alarmeController.update)
router.delete('/:id', alarmeController.deleteAlarme)


export default router;