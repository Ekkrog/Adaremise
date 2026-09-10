import express from 'express';
import { pool } from '../db.js';

export const depotRouter = express.Router();

// GET /depots — liste tous les dépôts
depotRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM depot ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// GET /depots/:id — un dépôt, sa donatrice, et ses objets
depotRouter.get('/:id', async (req, res) => {
  try {
    const depotResult = await pool.query(
      `SELECT d.id, d.date_depot, d.type,
              p.id AS personne_id, p.nom, p.prenom
       FROM depot d
       JOIN personne p ON p.id = d.personne_id
       WHERE d.id = $1`,
      [req.params.id]
    );

    if (depotResult.rows.length === 0) {
      return res.status(404).json({ erreur: 'Dépôt introuvable' });
    }

    const objetsResult = await pool.query(
      'SELECT id, libelle, poids_kg, etat_arrivee, statut, prix FROM objet WHERE depot_id = $1',
      [req.params.id]
    );

    res.json({
      ...depotResult.rows[0],
      objets: objetsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// POST /depots — enregistre un dépôt
depotRouter.post('/', async (req, res) => {
  const { personne_id, nom, prenom, telephone, date_depot, type } = req.body;

   if (!date_depot || !['boutique', 'domicile'].includes(type)) {
    return res.status(400).json({ erreur: 'date_depot et type (boutique|domicile) sont requis' });
  }

  
  if (!personne_id && !nom) {
    return res.status(400).json({
      erreur: 'personne_id ou nom est requis',
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO depot (personne_id, date_depot, type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [personne_id, date_depot, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// POST /depots/:id/objets — ajoute un objet à un dépôt existant
depotRouter.post('/:id/objets', async (req, res) => {
  const { libelle, poids_kg, etat_arrivee, categorie_id } = req.body;

  if (!libelle || !poids_kg || !etat_arrivee || !categorie_id) {
    return res.status(400).json({
      erreur: 'libelle, poids_kg, etat_arrivee et categorie_id sont requis',
    });
  }

  const etatsValides = ['bon_etat', 'a_reparer', 'hors_service'];
  if (!etatsValides.includes(etat_arrivee)) {
    return res.status(400).json({ erreur: 'etat_arrivee invalide' });
  }

  if (isNaN(Number(poids_kg))) {
    return res.status(400).json({ erreur: 'poids_kg doit être un nombre' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO objet (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [libelle, poids_kg, etat_arrivee, categorie_id, req.params.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});
