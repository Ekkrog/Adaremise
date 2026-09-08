import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /stats — objets par statut, poids total reçu, poids détourné de la déchetterie
router.get('/', async (req, res) => {
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

export default router;