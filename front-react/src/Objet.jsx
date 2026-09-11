import "./Objet.css";
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
                <p className={`statut-${item.statut}`}> {item.statut} </p>
                <p> {item.prix} € </p>
                <Link to={`/objets/${item.id}`}>✎</Link>
              </summary>
              <p>id : {item.id}</p>
              <p>poids : {item.poids_kg} kg</p>
              <p>état : {item.etat_arrivee}</p>
              <p>date mise en rayon: {date(item.date_mise_rayon)}</p>
              <p>catégorie : {item.categorie}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}


export default Objet;
