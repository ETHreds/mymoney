import { DataTypes, DATE } from "sequelize";
import dbClient from "../configs/db.js";

const Transaction = dbClient.sequelize.define(transaction, {
    transactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    typeId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    myAccountId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    counterparty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});