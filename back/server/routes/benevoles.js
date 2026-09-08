import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /benevoles — liste tous les bénévoles
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM benevole ORDER BY id');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

export default router;