import User from '../models/user.model.js'
import handleSequelizeError from '../utils/sequelize.errors.js'
class UsersController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            handleSequelizeError(error, res)

        }
    }
    static async getUserByPk(req, res) {
        const userId = req.params.userId;

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            res.json(user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            handleSequelizeError(error, res)

        }
    }


    static async postNew(req, res) {
        const { name, email, password } = req.body;
        console.log(req.body)

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Missing name' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        try {

            const newUser = await User.create({ name, email, password });
            return res.status(201).json({ id: newUser.id, name, email, message: 'Account created. ' });
        } catch (error) {
            return handleSequelizeError(error, res);
        }
    }
}

export default UsersController;