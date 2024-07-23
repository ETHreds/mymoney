import { Sequelize } from 'sequelize';
import 'dotenv/config'
class DBClient {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                logging: false,
                define: {
                    timestamps: false,
                }

            });
        this._authenticate();
    }

    async _authenticate() {
        try {

            await this.sequelize.authenticate();
            await this.sequelize.sync({ alter: { drop: true } })
            // await this.sequelize.drop();
            console.log('Connection has database been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

const dbClient = new DBClient;

export default dbClient;