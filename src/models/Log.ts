import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface LogInstance extends Model {
    id: number,
    acao: string,
    dados_acessados: string,
    dados_alterados: string,
    rota: string,
    data: Date
}

export const Log = db.define<LogInstance>("log", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    acao: {
        type: DataTypes.STRING
    },
    dados_acessados: {
        type: DataTypes.STRING
    },
    dados_alterados: {
        type: DataTypes.STRING
    },
    rota: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'log',
    timestamps: false
})