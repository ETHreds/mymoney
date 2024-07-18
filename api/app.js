import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/index.js'

const app = express();

// BodyParser
app.use(bodyParser.json());


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use('/', routes);


export default app;