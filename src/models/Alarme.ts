import { Classificacao } from './Classificacao';
import { Status } from './Status';
import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';
import { Equipamento } from './Equipamento';
// import { Atuado } from './Atuados';

export interface AlarmeInstance extends Model {
    id: number,
    descricao: string,
    classificacao_id: number,
    creat_at: Date,
    equipamento_id: number,
    status_id:number,
    vezes_autuado: number
}

export const Alarme = db.define<AlarmeInstance>("alarme", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    descricao: {
        type: DataTypes.STRING
    },
    classificacao_id: {
        type: DataTypes.NUMBER
    },
    creat_at: {
        type: DataTypes.DATE
    },
    equipamento_id: {
        type: DataTypes.INTEGER
    },
    status_id: {
        type: DataTypes.INTEGER
    },
    vezes_autuado: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'alarmes',
    timestamps: false
})
// Alarme.hasMany(Atuado, {as: 'autuados', foreignKey: 'alarme_id'})
Alarme.belongsTo(Status, {foreignKey: 'status_id'})
Alarme.belongsTo(Classificacao, {foreignKey: 'classificacao_id'})
Alarme.belongsTo(Equipamento,{foreignKey: 'equipamento_id'})