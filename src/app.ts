import express from 'express';
import config from 'config';
import { connect } from './utils/connect';
import routes from './routes';
import Deserializer from './middlewares/deserializerUser';

const port = config.get<number>("port");

const app = express();
app.use(express.json());

app.use(Deserializer);

app.listen(port,async () => {
     routes(app);
    await connect();
})
