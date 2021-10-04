import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface ClassificacaoInstance extends Model {
    id: number,
    tipo: string,
}

export const Classificacao = db.define<ClassificacaoInstance>("classificacao", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    classificacao: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'classificacoes',
    timestamps: false
})