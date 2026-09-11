import "./Objet.css";
import "./variables.css"
import { Link } from 'react-router-dom';

const date = (valeur) => (valeur ? valeur.slice(0,10) : "")

function Objet({ objets }) {
  
  return (
    <section className="afficherObjets">
      <ul className="Objet">
        {objets.map((item) => (
          <li key={item.id}>
            <details>
              <summary>
                <p> {item.libelle}</p>
                <span className={`statut-${item.statut}`}> {item.statut} </span>
                <p> {item.prix} € </p>
                <Link to={`/objets/${item.id}`}>✎</Link>
              </summary>
              <p><span className="items">id :</span> {item.id}</p>
              <p><span className="items">poids :</span> {item.poids_kg} kg</p>
              <p><span className="items">état :</span> {item.etat_arrivee}</p>
              <p><span className="items">date mise en rayon:</span> {date(item.date_mise_rayon)}</p>
              <p><span className="items">catégorie :</span> {item.categorie}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}


export default Objet;
