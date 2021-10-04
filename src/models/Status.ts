import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface StatusInstance extends Model {
    id: number,
    status: string,
}

export const Status = db.define<StatusInstance>("status", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'status',
    timestamps: false
})