import { DataTypes } from "sequelize";
import dbClient from "../configs/db.js";

const Budget = dbClient.sequelize.define('budget', {
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
        },
    },
    tag: {
        type: DataTypes.ENUM('want', 'need', 'saving'),
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
});

export default Budget;
