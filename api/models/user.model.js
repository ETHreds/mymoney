import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid'


import dbClient from "../utils/db.js";

const User = dbClient.sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

User.beforeCreate((user) => {
    user.id = uuidv4();
});

export default User;