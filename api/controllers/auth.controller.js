import handleSequelizeError from "../utils/sequelize.errors.js";
import User from "../models/user.model.js";
import redisClient from '../configs/redis.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '24h';
const REDIS_EXPIRATION = 24 * 60 * 60;


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

            const isMatch = await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (!isMatch) {
                return res.status(401).json({ error: 'Unauthorized: Invalid password' });
            }

            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
            const key = `auth_${token}`;

            await redisClient.set(key, user.id.toString(), REDIS_EXPIRATION);

            return res.status(200).json({ token });

        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    // static async googleCallback(req, res) {

    // }
    // static async logOut(req, res) {

    // }
}

export default AuthController