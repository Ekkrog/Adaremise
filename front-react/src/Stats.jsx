import { useState } from 'react'

import './Stats.css'

function Stats({}) {
    const [stats, setStats] = useState({})

    //TODO fonction qui récupère les stats depuis l'API et les stocke dans le state
    
    const changerStats = async () => {
        const reponse = await fetch('http://localhost:3000/stats')  
        const mes_stats = await reponse.json()
        setStats(mes_stats)
    }

    chargerStats();


    //TODO afficher les stats dans le tableau avec un Map

  return (
    <>
      <div className="stats">
        <h1>Tableau de bord</h1>
        <h2>Objets par statut</h2>
        {stats.objets_par_statut .map(o => {
            return (
               <div className="carte_stats"> 
                <p>o.statut</p>
                <p>o.count</p>
            </div>
            )

        })}
        <div className="carte_stats"> 
            <p>Poids total reçu</p>
            <p>{stats.poids_total_recu}</p>
        </div>

        <div className="carte_stats">   
          <p>poids détourné de la déchetterie</p>   
          <p>{stats.poids_detourne_dechetterie}</p>
        </div>
      </div>
    </>
  )
}

export default Stats
