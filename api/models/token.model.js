// import { DataTypes } from "sequelize";


// import dbClient from "../configs/db.js";
// import User from "./user.model.js";

// const Token = dbClient.sequelize.define('token', {
//     id: {
//         type: DataTypes.UUIDV4,
//         primaryKey: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User,
//             key: 'id'
//         }
//     },
//     token: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     expiresAt: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     revoked: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     }
// });

// Token.belongsTo(User, { foreignKey: 'userId' });

// export default Token;
