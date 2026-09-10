import "./Objet.css";

function Objet({ objets }) {
  
  return (
    <section className="afficherObjets">
      <ul className="Objet">
        {objets.map((item) => (
          <li key={item.id}>
            <details>
              <summary>
                <p> {item.libelle}</p>
                <p className={`statut-${item.statut}`}> {item.statut} </p>
                <p> {item.prix} € </p>
              </summary>
              <p>{item.poids_kg} kg</p>
              <p>{item.etat_arrivee}</p>
              <p>{item.date_mise_rayon}</p>
              <p>{item.categorie}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}


export default Objet;
