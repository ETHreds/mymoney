import { DataTypes } from 'sequelize';
import dbClient from '../configs/db.js';
import Account from './account.model.js';
import User from './user.model.js';
import Category from './category.model.js'; // Assuming you have a Category model

const Transaction = dbClient.sequelize.define('transaction', {
    transactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Foreign Keys
    accountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'accounts', // Table name
            key: 'accountId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or 'CASCADE' depending on your needs
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users', // Table name
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or 'CASCADE' depending on your needs
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'categories', // Table name
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or 'CASCADE' depending on your needs
    },
});

// Define Relationships
Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Transaction.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default Transaction;

