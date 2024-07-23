import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.log(err));
        this.connected = false;
        this.client.on('connect', () => {
            console.log('Redis is connected')
            this.connected = true;
        });
        this.initialize();
    }

    async initialize() {
        try {
            await this.client.connect();
            this.connected = true;
        } catch (err) {
            console.error('Failed to connect to Redis:', err);
            this.connected = false;
        }
    }
    isAlive() {
        return this.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        const val = await getAsync(key);
        return val;
    }

    async set(key, val, dur) {
        try {
            await this.client.set(key, val, 'EX', dur);
        } catch (err) {
            console.error('Error setting Redis key:', err);
            throw err;
        }

    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        await delAsync(key);
    }
}

const redisClient = new RedisClient();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    await redisClient.close();
    process.exit(0);
});

export default redisClient;
