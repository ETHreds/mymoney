import Account from '../models/account.model.js';
import handleSequelizeError from '../utils/sequelize.errors.js';

class AccountController {
    static async addNew(req, res) {
        const { accountType, subtype = null, providerName, startingBalance = 0.0 } = req.body;
        const userId = req.user.id;

        try {
            const newAccount = await Account.create({
                accountType,
                subtype,
                providerName,
                startingBalance,
                currentBalance: startingBalance,
                userId,
            });
            return res.status(201).json({
                id: newAccount.accountId,
                accountType,
                subtype,
                providerName,
                currentBalance: newAccount.currentBalance,
                userId,
            });
        } catch (error) {
            return handleSequelizeError(error, res);
        }
    }

    static async getAccountInfo(req, res) {

        const { accountId } = req.params;
        const userId = req.user?.id;
        try {
            const account = await Account.findOne({ where: { accountId, userId } });
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            return res.status(200).json({
                account: {
                    accountId: account.accountId,
                    accountType: account.accountType,
                    subtype: account.subtype,
                    providerName: account.providerName,
                    currentBalance: account.currentBalance,
                    userId: account.userId,
                },
            });
        } catch (error) {
            return handleSequelizeError(error, res);
        }
    }
}

export default AccountController;
