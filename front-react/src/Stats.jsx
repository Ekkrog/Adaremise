import { useState, useEffect } from "react";
import "./Stats.css";

function Stats() {
  const [stats, setStats] = useState({ objets_par_statut: [] });
  //TODO fonction qui récupère les stats depuis l'API et les stocke dans le state

  useEffect(() => {
    const chargerStats = async () => {
      const reponse = await fetch("http://localhost:3000/api/stats");
      const mes_stats = await reponse.json();
      setStats(mes_stats);
    };
    const intervalID = setInterval(chargerStats, 20000);

    chargerStats();
  }, []);

  useEffect(() => {
    console.log("stats : ", stats);
  }, [stats]);

  //TODO afficher les stats dans le tableau avec un Map

  return (
    <>
      <div className="stats">
        <h1>Tableau de bord</h1>

        <div className="status_stats">
          <h2>Objets par statut</h2>
          {stats.objets_par_statut.map((o) => (
            <div key={o.statut} className="carte_stats">
              <p className="titre_stats">{o.statut}</p>
              <p className="valeur_stats">{o.count}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Poids total</h2>
          <div className="carte_stats">
            <p className="titre_stats">Poids total reçu</p>
            <p className="valeur_stats">{stats.poids_total_recu}</p>
          </div>
        </div>

        <div>
          <h2>Poids détourné</h2>
          <div className="carte_stats">
            <p className="titre_stats">Poids détourné </p>
            <p className="valeur_stats">{stats.poids_detourne_dechetterie}</p>
          </div>
        </div>
      </div>
    </>
        );
}

export default Stats;
