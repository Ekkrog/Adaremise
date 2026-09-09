import express from "express";
import { pool } from "../db.js";

export const personneRouter = express.Router();

// GET /personnes — liste toutes les personnes
personneRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM personne ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: "Erreur serveur" });
  }
});

// GET /personnes/:id — récupère une seule personne
personneRouter.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM personne WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: "Personne introuvable" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: "Erreur serveur" });
  }
});

// POST /personnes — crée une personne (donatrice)
personneRouter.post("/", async (req, res) => {
  const { nom, prenom, telephone, adherente } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({
      erreur: "nom et prenom sont requis",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO personne (nom, prenom, telephone, adherente)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nom, prenom, telephone || null, adherente ?? false],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: "Erreur serveur" });
  }
});
