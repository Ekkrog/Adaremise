import express from 'express';
import { pool } from '../db.js';

export const categorieRouter = express.Router();

// GET /categories — liste toutes les catégories
categorieRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, libelle FROM categorie ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

