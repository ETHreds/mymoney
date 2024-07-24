import Transactions from '../models/transaction.model.js'
import Account from '../models/account.model.js';
import handleSequelizeError from '../utils/sequelize.errors.js'
import { newTransactionQueue } from '../queues/transaction.queue.js'

class TransactionsController {
    static async addNew(req, res) {
        const { date, amount, transactionType, accountId, counterparty, categoryId, notes } = req.body;

        try {
            const account = await Account.findByPk(accountId);

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            await Transactions.create({
                date,
                amount,
                transactionType,
                accountId,
                counterparty,
                categoryId,
                notes,
            });
            await newTransactionQueue.add({ accountId });
            return res.status(200).json({ message: 'Transaction added and balance recalculation job queued' });
        } catch (error) {
            return handleSequelizeError(error, res);
        }

    }

}

export default TransactionsController