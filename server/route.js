import express from 'express';
import objetRouter from './routes/objets.js';
import categorieRouter from './routes/categories.js';
import personneRouter from './routes/personnes.js';
import depotRouter from './routes/depots.js';
import statRouter from './routes/stats.js';

const router = express.Router();

router.use('/objets', objetRouter)
router.use('/categories', categorieRouter)
router.use('/personnes', personneRouter)
router.use('/depots', depotRouter)
router.use('/stats', statRouter)

// GET /
router.get('/', async (req, res) => {
  try {
    res.json({ "mesage": "ok"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});


export default router;