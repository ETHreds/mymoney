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
    static async postNew(req, res) {
        const { name, email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Missing name' });
        }

        try {

            const newUser = await User.create({ name, email });
            return res.status(201).json({ id: newUser.id, name, email });
        } catch (error) {
            return handleSequelizeError(error, res);
        }
    }
}

export default UsersController;