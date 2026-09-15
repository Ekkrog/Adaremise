import express from "express";
import { pool } from "../db.js";

export const ventesRouter = express.Router();

ventesRouter.post("/", async (req, res) => {
    const { date_vente, mode_paiement } = req.body;

    if (!date_vente || !mode_paiement) {
        return res.status(400).json({
            erreur: "date_vente et mode_paiement sont requis",
        });
    }

    const paiementsValides = ["especes", "carte", "cheque"];
    if (!paiementsValides.includes(mode_paiement)) {
        return res.status(400).json({ erreur: "mode_paiement invalide" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO vente (date_vente, mode_paiement)
        VALUES ($1, $2)
        RETURNING *`,
            [
                date_vente,
                mode_paiement
            ],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});


ventesRouter.patch("/", async (req, res) => {
  const { id, prix_paye, vente_id, statut } = req.body;

  const statutsValides = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];
  if (!statut || !statutsValides.includes(statut)) {
    return res.status(400).json({ erreur: 'statut invalide ou manquant' });
  }

  try {
    const result = await pool.query(
      `UPDATE objet
       SET statut = $1, prix_paye = $2, vente_id = $3
       WHERE id = $4
       RETURNING *`,
      [statut, prix_paye, vente_id, id]
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