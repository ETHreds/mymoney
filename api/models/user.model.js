import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid'


import dbClient from "../configs/db.js";

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
        unique: {
            msg: 'Email address must be unique',
        },
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            },


        }
    }
})

export default User;