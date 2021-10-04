import { Request, Response } from 'express';
import { Log } from '../models/Log'

export const getAll = async (req: Request, res: Response) => {
    await Log.findAll({
        order:[ ['data', 'DESC']]
    }).then((logs)=>{
        res.status(200).send(logs)
    }).catch((erro)=>res.status(400).send(erro))

}