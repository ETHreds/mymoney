import Account from '../models/account.model.js'
import handleSequelizeError from '../utils/sequelize.errors.js'

class AccountController {
    static async addNew(req, res) {
        const { accountType, subtype = null, providerName, startingBalance = 0.0 } = req.body;

        try {


            const newAccount = await Account.create({ accountType, subtype, providerName, startingBalance });
            return res.status(201).json({ id: newAccount.accountId, accountType, subtype, providerName, startingBalance });
        } catch (error) {
            return handleSequelizeError(error, res);
        }

    }
    static async getAccountInfo(req, res) {
        const { accountId } = req.params;
        try {
            const account = await Account.findByPk(accountId);
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            return res.status(200).json({
                account: {
                    accountId: account.accountId,
                    accountName: account.accountName,
                    accountType: account.accountType,
                    subtype: account.subtype,
                    providerName: account.providerName,
                    startingBalance: account.startingBalance,
                    currentBalance: account.currentBalance,
                },
            });

        } catch (error) {
            return handleSequelizeError(error, res);

        }
    }

}

export default AccountController