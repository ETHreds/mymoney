import { Router } from 'express';

import UsersController from '../controllers/user.controller.js';

const router = Router()

//  Users
router.get('/users', UsersController.getAll)
router.post('/users', UsersController.postNew)

export default router