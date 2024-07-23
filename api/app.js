
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import 'dotenv/config';
import helmet from 'helmet'



const corsOptions = {
  origin: 'http://localhost:9000',
  credentials: true,
  optionSuccessStatus: 200
};

const app = express();
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


// Routes
app.get('/', (req, res) => {
  console.log('Authenticated');
  return res.status(200).json({ message: 'Hello world' });
});


app.use('/', routes);

export default app;
