import jwt from 'jsonwebtoken';
import redisClient from '../configs/redis.js';

import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET;

class AuthMiddleware {
    static async verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const key = `auth_${token}`;

            const userId = await redisClient.get(key);

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    };
}

export default AuthMiddleware;
