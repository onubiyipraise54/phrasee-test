import { config } from 'dotenv';
config();

import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';

import Routers from './src/routers';

const app = express();

const PORT = process.env.PORT || 8000;

app.set('env', process.env.NODE_ENV);
app.set('port', PORT);

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));


app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).send(error);
  }
  next();
});

app.get('/', (req, res) => res.send('we are live'));
app.use(Routers(express.Router()));
app.all('*', (req, res) => res.status(404).end('Nothing here!'));


const server = app.listen(PORT, () => {
  console.info(`
        ################################################
        \n
        💯 🔥  App started & listening on port: ${PORT} 🔥 💯
        💯 🔥  Go to: http://localhost:${PORT} 🔥 💯
        \n
        ################################################
    `);
});

export default server;
