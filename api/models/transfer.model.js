import { DataTypes } from 'sequelize';
import dbClient from '../configs/db.js';
import Account from './account.model.js';
import User from './user.model.js';

const Transfer = dbClient.sequelize.define('transfer', {
    transferId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    sourceAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Account',
            key: 'accountId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    destinationAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Account',
            key: 'accountId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    charge: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    transferDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.hasMany(Transfer, { foreignKey: 'userId', as: 'transfers' });
Transfer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Account.hasMany(Transfer, { foreignKey: 'sourceAccountId', as: 'outgoingTransfers' });
Transfer.belongsTo(Account, { foreignKey: 'sourceAccountId', as: 'sourceAccount' });

Account.hasMany(Transfer, { foreignKey: 'destinationAccountId', as: 'incomingTransfers' });
Transfer.belongsTo(Account, { foreignKey: 'destinationAccountId', as: 'destinationAccount' });

export default Transfer;
