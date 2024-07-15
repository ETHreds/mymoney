import User from '../models/user.model.js'
class UsersController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            return res.status(201).json(users);
        } catch (error) {
            console.error('Error Getting Users');
            throw error;

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
            const existingUser = await User.findOne({
                where: {
                    email,
                },
            });
            if (existingUser) {
                return res.status(400).json({ error: ' Already exist' });
            }
            const newUser = await User.create({ name, email });
            return res.status(201).json({ id: newUser.id, name, email });
        } catch (error) {
            console.error('Error adding new user');
            throw error;
        }
    }
}

export default UsersController;