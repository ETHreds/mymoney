import { DataTypes } from "sequelize";
import dbClient from "../configs/db.js";

const Category = dbClient.sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Category;
