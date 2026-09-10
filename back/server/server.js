import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { objetRouter } from './routes/objets.js';
import { categorieRouter } from './routes/categories.js';
import { personneRouter } from './routes/personnes.js';
import { depotRouter } from './routes/depots.js';
import { statRouter } from './routes/stats.js';
import { benevolesRouter } from './routes/benevoles.js'

const swaggerDocument = JSON.parse(readFileSync('./swagger.json', 'utf8'));

const app = express();
app.use(express.json());

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/benevoles', benevolesRouter)
app.use('/api/categories', categorieRouter)
app.use('/api/depots', depotRouter)
app.use('/api/objets', objetRouter)
app.use('/api/personnes', personneRouter)
app.use('/api/stats', statRouter)

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
  console.log('Doc Swagger sur http://localhost:3000/api-docs');
});

