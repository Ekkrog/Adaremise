import express from 'express';
import { pool } from '../db.js';

export const objetRouter = express.Router();

// GET /objets — liste des objets, avec filtres optionnels statut et categorie_id
objetRouter.get('/', async (req, res) => {
  const { statut, categorie_id } = req.query;

  try {
    const result = await pool.query(
      `SELECT o.id, o.libelle, o.statut, o.prix, c.libelle AS categorie
       FROM objet o
       JOIN categorie c ON c.id = o.categorie_id
       WHERE o.statut       = COALESCE($1::statut_objet, o.statut)
         AND o.categorie_id = COALESCE($2::integer,      o.categorie_id)
       ORDER BY o.id`,
      [statut || null, categorie_id || null]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// GET /objets/:id — un objet, sa catégorie, son dépôt et sa donatrice
objetRouter.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.libelle, o.poids_kg, o.etat_arrivee, o.statut, o.prix,
              c.libelle AS categorie,
              d.id AS depot_id, d.date_depot,
              p.nom AS nom_donatrice, p.prenom AS prenom_donatrice
       FROM objet o
       JOIN categorie c ON c.id = o.categorie_id
       JOIN depot d ON d.id = o.depot_id
       JOIN personne p ON p.id = d.personne_id
       WHERE o.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: 'Objet introuvable' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// PATCH /objets/:id/statut — fait évoluer le statut d'un objet
objetRouter.patch('/:id/statut', async (req, res) => {
  const { statut, prix } = req.body;

  const statutsValides = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];
  if (!statut || !statutsValides.includes(statut)) {
    return res.status(400).json({ erreur: 'statut invalide ou manquant' });
  }

  try {
    const result = await pool.query(
      `UPDATE objet
       SET statut = $1, prix = COALESCE($2, prix)
       WHERE id = $3
       RETURNING *`,
      [statut, prix || null, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: 'Objet introuvable' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});
