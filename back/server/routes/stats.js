import express from 'express';
import {pool} from '../db.js';

export const statRouter = express.Router();

// GET /stats — objets par statut, poids total reçu, poids détourné de la déchetterie
statRouter.get('/', async (req, res) => {
  try {
    const parStatut = await pool.query('SELECT statut, COUNT(*) FROM objet GROUP BY statut');
    const poidsTotal = await pool.query('SELECT SUM(poids_kg) FROM objet');
    const poidsDetourne = await pool.query("SELECT SUM(poids_kg) FROM objet WHERE statut <> 'recycle'");

    res.json({
      objets_par_statut: parStatut.rows,
      poids_total_recu: poidsTotal.rows[0].sum,
      poids_detourne_dechetterie: poidsDetourne.rows[0].sum
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

statRouter.get('/heures', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT to_char(date_repa, 'MM-YYYY') AS "mois_annee", SUM(duree_h) AS "nombre_heures" FROM reparation GROUP BY to_char(date_repa, 'MM-YYYY') ORDER BY to_char(date_repa, 'MM-YYYY') ASC`);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});