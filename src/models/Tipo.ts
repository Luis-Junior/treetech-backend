import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface TipoInstance extends Model {
    id: number,
    tipo: string,
}

export const Tipo = db.define<TipoInstance>("tipo", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    tipo: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tipos',
    timestamps: false
})