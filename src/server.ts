import express, {Request,Response, urlencoded} from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import equipamentosRoutes from './routes/equipamentosRoutes';
import alarmeRoutes from './routes/alarmesRoutes';
import * as logController from './controllers/logController'

import bodyParser from 'body-parser'


dotenv.config();
const server = express();
server.use(cors());
server.use(bodyParser.json())

server.use(urlencoded({extended:true}));

server.get('/logs', logController.getAll)
server.use('/equipamentos', equipamentosRoutes)
server.use('/alarmes', alarmeRoutes)

server.use((req:Request, res:Response)=>{
    res.status(404)
    res.json({error: 'Endpoint não encontrada'})
})
server.listen(process.env.PORT)