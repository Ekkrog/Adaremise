import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import router from './route.js';
import pool from './db.js';
import 'dotenv/config';

const swaggerDocument = JSON.parse(readFileSync('./swagger.json', 'utf8'));

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
  console.log('Doc Swagger sur http://localhost:3000/api-docs');
});