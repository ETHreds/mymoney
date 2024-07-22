import passport from "passport"
import handleSequelizeError from "../utils/sequelize.errors.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

class AuthController {
    static async logIn(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized: User not found' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Error comparing passwords' });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: 'Unauthorized: Invalid password' });
                }

                res.status(200).json({ user });
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    // static async googleCallback(req, res) {

    // }
    // static async logOut(req, res) {

    // }
}

export default AuthController