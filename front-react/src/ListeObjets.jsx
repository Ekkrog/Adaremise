import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Objet from "./Objet.jsx";
import Filtres from "./Filtres.jsx";
import { getData } from "./assets/utils.js";

function ListeObjets() {
  const [searchParams] = useSearchParams();
  const [objets, setObjets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const chargerObjets = async () => {
      try {
        const donnees = await getData(location.pathname);
        setObjets(donnees);
        console.log(donnees);
      } catch (erreur) {
        console.error("Erreur de chargement :", erreur.message);
      }
    };

    chargerObjets();
  }, []);

  return (
    <>
      <section className="afficherObjets">
        <ul className="ListeObjets">
          {objets.map((item) => (
            <Objet key={item.id} objet={item} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default ListeObjets;