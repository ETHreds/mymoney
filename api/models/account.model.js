import { DataTypes } from "sequelize";
import dbClient from "../configs/db.js";

const Account = dbClient.sequelize.define('account', {
    accountId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    accountName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['cash', 'transfer', 'bank']],
                msg: 'Invalid account type. Must be either cash, transfer, or bank.',
            },
        },
    },
    subtype: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            subtypeValidation() {
                if (this.accountType === 'transfer') {
                    if (!['mobile money', 'online money'].includes(this.subtype)) {
                        throw new Error('Invalid subtype for transfer account. Must be either mobile money or online money.');
                    }
                    if (!this.providerName) {
                        throw new Error('Provider name is required for transfer accounts.');
                    }
                } else if (this.accountType === 'bank') {
                    if (!['checking', 'saving'].includes(this.subtype)) {
                        throw new Error('Invalid subtype for bank account. Must be either checking or saving.');
                    }
                    if (!this.providerName) {
                        throw new Error('Provider name is required for bank accounts.');
                    }
                } else if (this.subtype || this.providerName) {
                    throw new Error('Subtype and provider name are only applicable for transfer or bank accounts.');
                }
            },
        },
    },
    providerName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    startingBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    currentBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
});

export default Account;
