import { Tipo } from './../models/Tipo';
import { Status } from './../models/Status';
import { Classificacao } from './../models/Classificacao';
import { Alarme } from './../models/Alarme';
import { Request, Response } from 'express';
import { Equipamento } from '../models/Equipamento';
// import { Atuado } from '../models/Atuados';


export const getAll = async (req: Request, res: Response) => {
    let order:any
    if(req.query.ordenar === 'equipamento'){
        order = [ Equipamento, 'nome', req.query.reverse==='true' ? 'DESC': 'ASC']
    }else{
        order = [req.query.ordenar ? req.query.ordenar as string : 'id', req.query.reverse==='true' ? 'DESC': 'ASC']
    }
    let alarmes = await Alarme.findAll({
        include: [
            { model: Classificacao, required: true },
            { model: Equipamento, required: true },
            { model: Status, required: true },
        ],
        order:[order]
    })
    if (alarmes) {
        res.send(alarmes)
    } else {
        res.send({ erro: "erro" })
    }
}

export const getById = async (req: Request, res: Response) => {
    let alarme = await Alarme.findByPk(req.params.id, {
        include: [
            { model: Classificacao, required: true },
            { model: Equipamento, required: true, include: [{model: Tipo, required:true}] },
            { model: Status, required: true },
        ]
    })
    if (alarme) {
        res.send(alarme)
    } else {
        res.status(400).send({ erro: "não existe" })
    }
}

export const create = async (req: Request, res: Response) => {
    let { descricao, classificacao_id, equipamento_id } = req.body
    if (!descricao || !classificacao_id || !equipamento_id) {
        res.status(400).send("Todos os campos precisam estar preenchidos")
    } else {
        const alarme = await Alarme.create({
            descricao,
            classificacao_id,
            creat_at: new Date(),
            equipamento_id,
        }).then(() => res.status(201).send(true)).catch(() => res.status(404).send(false))
    }

}

export const deleteAlarme = async (req: Request, res: Response) => {
    let alarme = await Alarme.findByPk(req.params.id)
    if (alarme) {
        await alarme.destroy().then(() => res.status(201).send(true)).catch((erro) => res.status(404).send(erro))
    } else {
        res.status(400).send("Alarme não existe")
    }
}

export const update = async (req: Request, res: Response) => {
    let { descricao, classificacao_id, equipamento_id } = req.body
    if (!descricao || !classificacao_id || !equipamento_id) {
        res.status(400).send("Todos os campos precisam estar preenchidos")
    } 
    else {
        let alarme = await Alarme.findByPk(req.params.id)
        if (alarme) {
            alarme.descricao = descricao
            alarme.classificacao_id = classificacao_id
            alarme.equipamento_id = equipamento_id
            await alarme.save().then(() => res.status(201).send(true)).catch((erro) => res.status(404).send(erro))
        } else {
            res.status(400).send("Não existe")
        }
    }
}

export const findByClassificacao = async (req: Request, res: Response) => {
    if(req.params.id && (+req.params.id > 0 && +req.params.id <=3) ){
        let alarmes = await Alarme.findAll({
            include: [
                { model: Classificacao, required: true, where: {id: req.params.id} },
                { model: Equipamento, required: true },
                { model: Status, required: true },
            ],
        })
        if (alarmes) {
            res.send(alarmes)
        } else {
            res.send({ erro: "erro" })
        }
    } else{
        res.status(400).send({erro: 'falotou os params ou estão incorretos'})
    }
}

// export const ativarAlarme = async (req: Request, res: Response) => {
//     let alarme_id = req.params.id
//     if (alarme_id) {
//         let autuado = await Atuado.findOne({ where: { alarme_id: alarme_id } })
//         if (!autuado) {
//             Atuado.create({
//                 entrada: new Date(),
//                 saida: null,
//                 alarme_id
//             }).then(() => res.status(201).send(true)).catch((erro) => res.status(404).send(erro))
//         } else { res.send("ainda não há saida") }
//     } else {
//         res.status(404).send("Id do alarme é obrigatorio")
//     }
// }
// export const desativarAlarme = async (req: Request, res: Response) => {
//     let alarme_id = req.params.id
//     if (alarme_id) {
//         let autuado = await Atuado.findOne({ where: { alarme_id: alarme_id } })
//         if (autuado) {
//             if(autuado.saida === null){
//                 autuado.saida = new Date()
//                 await autuado.save().then(() => res.status(201).send(true)).catch((erro) => res.status(404).send(erro))
//             }else{
//                 res.send("Ainda não saida da entrada anterior")
//             }
//         } else { res.send("ainda não há saida da ativação anterior") }
//     } else {
//         res.status(404).send("Id do alarme é obrigatorio")
//     }
// }