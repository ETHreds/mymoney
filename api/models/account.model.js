import { DataTypes } from 'sequelize';
import dbClient from '../configs/db.js';
import User from './user.model.js';
import Category from './category.model.js';

const Budget = dbClient.sequelize.define('budget', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    type: {
        type: DataTypes.ENUM('want', 'need', 'savings'),
        allowNull: false,
    },
});

// Define Relationships
Budget.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Budget.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default Budget;
