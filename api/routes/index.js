import { Router } from 'express';

import UsersController from '../controllers/user.controller.js';
import AccountController from '../controllers/account.controller.js';
import TransactionsController from '../controllers/transaction.controller.js';

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ "msg": "Hello World" })
})

//  Users
router.get('/users', UsersController.getAll)
router.post('/users', UsersController.postNew)

// Accounts
router.post('/accounts', AccountController.addNew)
router.get('/accounts/:accountId', AccountController.getAccountInfo)

// Accounts
router.post('/transaction', TransactionsController.addNew)




export default router