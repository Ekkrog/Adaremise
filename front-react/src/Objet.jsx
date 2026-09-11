import "./Objet.css";
import "./variables.css"
import { Link } from 'react-router-dom';

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
                <Link to={`/objets/${item.id}`}>✎</Link>
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
