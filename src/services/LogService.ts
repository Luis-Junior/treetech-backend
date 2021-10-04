import { Log } from '../models/Log'

export const newLog = async (acao:string,dados_acessados:string, dados_alterados:string,rota:string) => {
    const log = await Log.create({
        acao,
        dados_acessados,
        dados_alterados,
        rota,
        data: new Date(),
    }).then(() => console.log("------ log criado ------")).catch(() => console.log("------ log criado ------"))
}