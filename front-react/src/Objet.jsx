import "./Objet.css";

function Objet({ objets }) {
  return (
    <section className="afficherObjets">
      <ul className="Objet">
        {objets.map((item) => (
          <li key={item.id}>
            <p> {item.libelle}</p>
            <p className={`statut-${item.statut}`}> {item.statut} </p>
            <p> {item.prix} € </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Objet;
