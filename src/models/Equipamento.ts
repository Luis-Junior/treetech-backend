import { Tipo } from './Tipo';
import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface EquipamentoInstance extends Model {
    id: number,
    nome: string,
    numero_serie: string,
    tipo_id: number,
    descricao: string,
    creat_at: Date,
}

export const Equipamento = db.define<EquipamentoInstance>("equipamento", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_serie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creat_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'equipamentos',
    timestamps: false
})
Equipamento.belongsTo(Tipo, {foreignKey: 'tipo_id'})