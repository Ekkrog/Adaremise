import express from 'express';
import { pool } from '../db.js';

export const benevolesRouter = express.Router();

// GET /benevoles — liste tous les bénévoles
benevolesRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM benevole ORDER BY nom, prenom');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// POST /benevoles - ajout de nouveaux bénévoles
benevolesRouter.post('/', async (req, res) => {
  const { nom, prenom, telephone } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({ erreur: 'nom et prenom sont requis' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO benevole (nom, prenom, telephone, date_arrivee)
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING *`,
      [nom, prenom, telephone || null],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: "Erreur serveur" });
  }
});

// DELETE /benevoles/:id — supprime un bénévole
benevolesRouter.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM benevole WHERE id = $1 RETURNING *',
      [req.params.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ erreur: 'Bénévole introuvable' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});