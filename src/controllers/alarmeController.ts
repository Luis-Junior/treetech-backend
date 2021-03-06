import { Tipo } from './../models/Tipo';
import { Status } from './../models/Status';
import { Classificacao } from './../models/Classificacao';
import { Alarme } from './../models/Alarme';
import { Request, Response } from 'express';
import { Equipamento } from '../models/Equipamento';
import { newLog } from '../services/LogService'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
// import { Atuado } from '../models/Atuados';


export const getAll = async (req: Request, res: Response) => {
    let order: any
    if (req.query.ordenar === 'equipamento') {
        order = [Equipamento, 'nome', req.query.reverse === 'true' ? 'DESC' : 'ASC']
    } else if(req.query.ordenar === 'equipamentodescr'){
        order = [Equipamento, 'descricao', req.query.reverse === 'true' ? 'DESC' : 'ASC']
    }else{
        order = [req.query.ordenar ? req.query.ordenar as string : 'id', req.query.reverse === 'true' ? 'DESC' : 'ASC']
    }
    let alarmes = await Alarme.findAll({
        include: [
            { model: Classificacao, required: true },
            { model: Equipamento, required: true },
            { model: Status, required: true },
        ],
        order: [order]
    })
    if (alarmes) {
        res.send(alarmes)
        newLog('Acessou getAll de alarmes', JSON.stringify(alarmes), "nenhum", "GET - /alarmes")
    } else {
        res.send({ erro: "erro" })
    }
}

export const getById = async (req: Request, res: Response) => {
    let alarme = await Alarme.findByPk(req.params.id, {
        include: [
            { model: Classificacao, required: true },
            { model: Equipamento, required: true, include: [{ model: Tipo, required: true }] },
            { model: Status, required: true },
        ]
    })
    if (alarme) {
        res.send(alarme)
        newLog('Acessou getById de alarmes', JSON.stringify(alarme), "nenhum", `GET - /alarmes/${req.params.id}`)
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
        }).then((alarme) => {
            res.status(201).send(true)
            newLog('Criou um alarme novo', "CRIOU", JSON.stringify(alarme), `POST - /alarmes`)
        }).catch((erro) => res.status(404).send(erro))
    }

}

export const deleteAlarme = async (req: Request, res: Response) => {
    let alarme = await Alarme.findByPk(req.params.id)
    if (alarme) {
        await alarme.destroy().then(() => {
            newLog('Deletou um alarme',JSON.stringify(alarme), "DELETOU", `DELETE - /alarmes/${req.params.id}`)
            res.status(201).send(true)
        }).catch((erro) => res.status(404).send(erro))
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
        let valorAnterior = JSON.stringify(alarme)
        if (alarme) {
            alarme.descricao = descricao
            alarme.classificacao_id = classificacao_id
            alarme.equipamento_id = equipamento_id
            await alarme.save().then((alarme_att) => {
                res.status(201).send(true)
                newLog('Atualizou um alarme',JSON.stringify(valorAnterior), JSON.stringify(alarme_att), `PUT - /alarmes/${req.params.id}`)
            }).catch((erro) => res.status(404).send(erro))
        } else {
            res.status(400).send("Não existe")
        }
    }
}

export const findByClassificacao = async (req: Request, res: Response) => {
    if (req.params.id && (+req.params.id > 0 && +req.params.id <= 3)) {
        let alarmes = await Alarme.findAll({
            include: [
                { model: Classificacao, required: true, where: { id: req.params.id } },
                { model: Equipamento, required: true },
                { model: Status, required: true },
            ],
        })
        if (alarmes) {
            res.send(alarmes)
            newLog('Acessou alarmes filtrando pela classificacao',JSON.stringify(alarmes), "nenhum", `GET - /alarmes/findByClassificacao/${req.params.id}`)
        } else {
            res.send({ erro: "erro" })
        }
    } else {
        res.status(400).send({ erro: 'falotou os params ou estão incorretos' })
    }
}

export const ativarAlarme = async (req: Request, res: Response) => {
    console.log('ativar')
    let alarme = await Alarme.findByPk(req.params.id)
    if (alarme) {
        if (alarme.status_id == 2) {
            alarme.vezes_autuado = alarme.vezes_autuado + 1
            alarme.status_id = 1
            alarme.entrada = new Date()
            alarme.saida = null

            await alarme.save().then((alarme) => {
                if (alarme.classificacao_id == 3) {
                    let transport = nodemailer.createTransport({
                        host: process.env.HOST_EMAIL as string,
                        port: parseInt(process.env.PORT_EMAIL as string),
                        auth: {
                            user: process.env.AUTH_EMAIL_USER as string,
                            pass: process.env.AUTH_EMAIL_PASS as string
                        }
                    });
                    let email = {
                        from: 'Luis Junior <junior.plens@hotmail.com>',
                        to: 'abcd@abc.com.br',
                        subject: 'Alarme com classificação "ALTO" ativado',
                        html: `O alarme <strong>${alarme.descricao}</strong>, que tem sua classificacao <strong style="color:red;">ALTA</strong> foi ativado hoje as ${alarme.entrada}`,
                        text: `O alarme ${alarme.descricao}, que tem sua classificacao ALTA foi ativado hoje as ${alarme.entrada}`
                    }
                    let enviar = async ()=>{
                        return await transport.sendMail(email)
                    }
                    enviar().then(() => {
                        res.status(201).send({ resultado: "email enviado para o email abcd@abc.com.br" })
                        newLog(`Ativou o alarme de id:${req.params.id} e encaminhou um email para abcd@abc.com.br`,"nenhum", "nenhum", `GET - /alarmes/ativaralarme/${req.params.id}`)
                    }
                    ).catch((erro) => res.status(400).send(erro))

                } else {
                    res.status(200).send(true)
                    newLog(`Ativou o alarme de id:${req.params.id}`,"nenhum", "nenhum", `GET - /alarmes/ativaralarme/${req.params.id}`)
                    
                }
            }).catch((erro) => res.status(400).send(erro))
        } else if (alarme.status_id == 1) {
            res.status(400).send({ erro: "Não pode ativar um alarme já ativo" })
            newLog('Tentou ativar um alarme já ativo',"nenhum", "nenhum", `GET - /alarmes/ativaralarme/${req.params.id}`)
        } else {
            res.status(400).send({ erro: "erro" })
        }
    } else {
        res.status(400).send({ erro: "alarme nao encontrado" })
    }
}
export const desativarAlarme = async (req: Request, res: Response) => {
    console.log('desativar')
    let alarme = await Alarme.findByPk(req.params.id)
    if (alarme) {
        if (alarme.status_id == 1) {
            alarme.vezes_autuado = alarme.vezes_autuado
            alarme.status_id = 2
            alarme.saida = new Date()
            await alarme.save().then(() => {
                res.status(201).send(true)
                newLog(`Desativou o alarme de id:${req.params.id}`,"nenhum", "nenhum", `GET - /alarmes/desativarAlarme/${req.params.id}`)
            }).catch((erro) => res.status(400).send(erro))
        } else if (alarme.status_id == 2) {
            res.status(400).send({ erro: "Não pode desativar um alarme já desativado" })
            newLog('Tentou desativar um alarme já desativado',"nenhum", "nenhum", `GET - /alarmes/desativarAlarme/${req.params.id}`)
        } else {
            res.status(400).send({ erro: "??" })
        }
    } else {
        res.status(400).send({ erro: "alarme nao encontrado" })
    }
}

export const maisAtuados = async (req: Request, res: Response) => {
    await Alarme.findAll({
        include:[{model:Equipamento, required:true}],
        order:[['vezes_autuado', 'DESC']],
        limit: 3
    }).then((alarmes)=>{
        res.status(200).send(alarmes)
        newLog('Acessou os 3 alarmes mais atuados',JSON.stringify(alarmes), "nenhum", `GET - /alarmes/maisAtuados`)
    }).catch((erro)=>res.status(400).send(erro))
}