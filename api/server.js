import http from 'http'
import 'dotenv/config'

import app from './app.js'
import dbClient from './configs/db.js';

const PORT = process.env.SERVER_PORT || 3000;
const startServer = async () => {
    await dbClient.sequelize.authenticate();

    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`HTTP server running at port ${PORT}`);
    });

    server.on('error', (error) => {
        console.error('Server error:', error);
    });
};

startServer();