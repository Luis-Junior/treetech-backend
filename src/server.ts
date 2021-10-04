import express, {Request,Response, urlencoded} from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import equipamentosRoutes from './routes/equipamentosRoutes';
import alarmeRoutes from './routes/alarmesRoutes';

import bodyParser from 'body-parser'

dotenv.config();
const server = express();
server.use(cors());
server.use(bodyParser.json())

server.use(urlencoded({extended:true}));

server.use('/equipamentos', equipamentosRoutes)
server.use('/alarmes', alarmeRoutes)

server.listen(process.env.PORT)