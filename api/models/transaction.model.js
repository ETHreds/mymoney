import { DataTypes } from "sequelize";
import dbClient from "../configs/db.js";
import Account from './account.model.js'; // Ensure correct import path

const Transaction = dbClient.sequelize.define('Transaction', {
    transactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transactionType: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
    },
    accountId: {
        type: DataTypes.UUID,
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

Transaction.belongsTo(Account, { foreignKey: 'accountId' });

const updateCurrentBalance = async (transaction, options) => {
    const account = await Account.findByPk(transaction.accountId, { transaction: options.transaction });
    if (account) {
        const transactions = await Transaction.findAll({
            where: { accountId: account.accountId },
            transaction: options.transaction,
        });
        const totalDeposits = transactions.reduce((total, t) => t.transactionType === 'income' ? total + t.amount : total, 0);
        const totalWithdrawals = transactions.reduce((total, t) => t.transactionType === 'expense' ? total + t.amount : total, 0);
        account.currentBalance = account.startingBalance + totalDeposits - totalWithdrawals;
        await account.save({ transaction: options.transaction });
    }
};

Transaction.addHook('afterCreate', updateCurrentBalance);
Transaction.addHook('afterUpdate', updateCurrentBalance);
Transaction.addHook('afterDestroy', updateCurrentBalance);

export default Transaction;
