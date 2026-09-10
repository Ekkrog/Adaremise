import { useEffect, useState } from "react";

function ListeObjets() {
  const [objet, setObjet] = useState([]);


  useEffect(() => {
    const chargerObjets = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/objets");
      const objets = await reponse.json();

      setObjet(objets);
      console.log(objet);
      
    } catch (erreur) {
      console.error("Erreur de chargement :", erreur.message);
    }
  };
  
  chargerObjets();
  }, [])
  

  return (
    <>
      <section className="afficherObjets">
        {objet.map((item) => (
          <ul className="ListeObjets">
            <li key={item.id} objet={item}>
              <p> nom : {item.libelle}</p>
              <p> prix : {item.prix}</p>
              <p> statut : {item.statut} </p>
            </li>
          </ul>
        ))}
      </section>
    </>
  );
};

export default ListeObjets;