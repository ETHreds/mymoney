
import { newTransactionQueue } from '../queues/transaction.queue.js'
import Account from '../models/account.model.js';
import Transaction from '../models/transaction.model.js';

newTransactionQueue.process(async (job) => {
    const { accountId } = job.data;

    const account = await Account.findByPk(accountId);
    if (!account) {
        console.error(`Account with ID ${accountId} not found.`);
        return;
    }

    const transactions = await Transaction.findAll({
        where: { accountId },
        attributes: ['amount', 'type']
    });

    const newBalance = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + transaction.amount;
        } else if (transaction.type === 'expense') {
            return acc - transaction.amount;
        }
        return acc;
    }, account.currentBalance);
    console.log(`Calculated balance for account ${accountId}: ${newBalance}`);
});
