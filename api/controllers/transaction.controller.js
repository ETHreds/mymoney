import Transactions from '../models/transaction.model.js'
import Account from '../models/account.model.js';
import handleSequelizeError from '../utils/sequelize.errors.js'

class TransactionsController {
    static async addNew(req, res) {
        const { date, amount, transactionType, accountId, counterparty, categoryId, notes } = req.body;

        try {
            const account = await Account.findByPk(accountId);

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            const transaction = await Transactions.create({
                date,
                amount,
                transactionType,
                accountId,
                counterparty,
                categoryId,
                notes,
            });

            return res.status(201).json(transaction);
        } catch (error) {
            return handleSequelizeError(error, res);
        }

    }

}

export default TransactionsController