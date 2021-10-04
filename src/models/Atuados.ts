// import { Alarme } from './Alarme';
// import { Model, DataTypes } from 'sequelize';
// import { db } from '../instances/mysql';

// export interface AtuadoInstance extends Model {
//     id: number,
//     entrada: Date,
//     saida: Date,
//     alarme_id: string,
// }

// export const Atuado = db.define<AtuadoInstance>("atuados", {
//     id: {
//         primaryKey: true,
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     entrada: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     saida: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     alarme_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }

// }, {
//     tableName: 'atuados',
//     timestamps: false
// })
// Atuado.belongsTo(Alarme, {foreignKey: 'alarme_id'})