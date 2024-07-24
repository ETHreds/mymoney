import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";


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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {

            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
        }
    },
})

export default User;