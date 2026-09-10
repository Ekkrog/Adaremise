import "./Objet.css"

function Objet ({objets}) {
    return (
        <>
        <section className="afficherObjets">
        {objets.map((item) => (
          <ul className="Objet">
            <li key={item.id} objet={item}>
              <p> {item.libelle}</p>
              <p className={`statut-${item.statut}`}> {item.statut} </p>
              <p> {item.prix} € </p>
            </li>
          </ul>
        ))}
      </section>
      </>
    )
}

export default Objet;