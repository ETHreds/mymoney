import { Router } from 'express';

import UsersController from '../controllers/user.controller.js';
import AccountController from '../controllers/account.controller.js';
import TransactionsController from '../controllers/transaction.controller.js';
import AuthController from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ "msg": "Hello World" })
})

// router.get('/auth', AuthController.logOut)



//  Users
router.get('/users', UsersController.getAll)
router.post('/auth/sign-up', UsersController.postNew)

router.get('/users/:userId', AuthMiddleware.verifyToken, UsersController.getUserByPk)

// Accounts
router.post('/accounts', AuthMiddleware.verifyToken, AccountController.addNew)
router.get('/accounts/:accountId', AccountController.getAccountInfo)

// Transactions
router.post('/transaction', TransactionsController.addNew)

// Authentication
router.post('/auth/sign-in', AuthController.logIn)




export default router