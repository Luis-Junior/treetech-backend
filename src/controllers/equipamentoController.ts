import { Classificacao } from './../models/Classificacao';
import { Equipamento } from './../models/Equipamento';
import { Request, Response } from 'express';
import { Tipo } from '../models/Tipo';
import { Alarme } from '../models/Alarme';
import { Status } from '../models/Status';
import { Op } from 'sequelize';


export const getAll = async (req: Request, res: Response) => {
    let equipamentos = await Equipamento.findAll({
        include: [
            {
                model: Tipo,
                required: true,
            }
        ],
        order:[ [req.query.ordenar ? req.query.ordenar as string : 'id', req.query.reverse==='true' ? 'DESC': 'ASC']]
    })
    if (equipamentos) {
        res.send(equipamentos)
    } else {
        res.send({ erro: "erro" })
    }
}

export const getById = async (req: Request, res: Response) => {
    let equipamento = await Equipamento.findByPk(req.params.id, {
        include: [{model: Tipo,required: true}]
    }
    )
    if (equipamento) {
        res.send(equipamento)
    } else {
        res.status(400).send({ erro: "não existe" })
    }
}

export const getAlarmesRelacionados = async(req:Request, res:Response)=>{
    await Alarme.findAll({
        where:{equipamento_id: req.params.id},
        include: [
            { model: Classificacao, required: true },
            { model: Equipamento, required: true },
            { model: Status, required: true },
        ]
    }).then((alarmes)=>res.send(alarmes)).catch((erro)=>res.status(400).send(erro))
}

export const create = async (req: Request, res: Response) => {
    let { nome, numero_serie, tipo_id, descricao } = req.body
    if (!nome || !numero_serie || !tipo_id || !descricao) {
        res.status(400).send("Todos os campos precisam estar preenchidos")
    } else {
        const equipamento = await Equipamento.create({
            nome,
            numero_serie,
            tipo_id,
            descricao,
            creat_at: new Date(),
        }).then(() => res.status(201).send(true)).catch(() => res.status(400).send(false))
    }
}

export const deleteAlarme = async (req: Request, res: Response) => {
    let equipamento = await Equipamento.findByPk(req.params.id)
    if (equipamento) {
        await equipamento.destroy().then(() => res.status(201).send(true)).catch((erro) => res.status(400).send(erro))
    } else {
        res.status(400).send("Equipamento não existe")
    }
}

export const update = async (req: Request, res: Response) => {
    let { nome, numero_serie, tipo_id, descricao } = req.body
    console.log(req.body)
    if (!nome || !numero_serie || !tipo_id || !descricao) {
        res.status(400).send("Todos os campos precisam estar preenchidos")
    } else {
        let equipamento = await Equipamento.findByPk(req.params.id)

        if (equipamento) {
            equipamento.nome = nome
            equipamento.numero_serie = numero_serie
            equipamento.descricao = descricao
            equipamento.tipo_id = tipo_id
            await equipamento.save().then(() => res.status(201).send({Atualizado:true})).catch((erro) => res.status(404).send(erro))
        } else {
            res.status(400).send("Não existe")
        }
    }
}

export const filterByName = async (req:Request, res:Response)=>{
    let nomeDigitado = req.query.nome
    if(!nomeDigitado){
        res.status(400).send({erro:"nome precisa ser informado"})
    }else{
        await Equipamento.findAll({
            where: {nome:{
                [Op.like]: '%'+ nomeDigitado +'%'
            }},
            include:[{model: Tipo, required: true}]
        }).then((equipamentos)=>res.status(200).send(equipamentos)).catch((erro)=>res.status(400).send(erro))
    }
    

}

export const findByTipo = async (req: Request, res: Response) => {
    if(req.params.id && (+req.params.id > 0 && +req.params.id <=3) ){
        let equipamentos = await Equipamento.findAll({
            where: {tipo_id: req.params.id},
            include: [
                {
                    model: Tipo,
                    required: true,
                }
            ]
        })
        if (equipamentos) {
            res.send(equipamentos)
        } else {
            res.send({ erro: "erro" })
        }
    } else{
        res.status(400).send({erro: 'falotou os params ou estão incorretos'})
    }
}