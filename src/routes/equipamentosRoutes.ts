import { findByTipo } from './../controllers/equipamentoController';
import {Router ,Request, Response} from 'express';
import * as equipamentosController from '../controllers/equipamentoController';

const router = Router() 


router.get('/', equipamentosController.getAll)
router.post('/', equipamentosController.create)
router.get('/alarmes-relacionados/:id', equipamentosController.getAlarmesRelacionados)
router.get('/findByTipo/:id', equipamentosController.findByTipo)

router.get('/filter', equipamentosController.filterByName)

router.get('/:id', equipamentosController.getById)
router.put('/:id', equipamentosController.update)
router.delete('/:id', equipamentosController.deleteAlarme)

export default router;