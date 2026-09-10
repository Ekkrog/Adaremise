import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Objet from "./Objet.jsx";
import Filtres from "./Filtres.jsx";

function ListeObjets() {
  const [searchParams] = useSearchParams();
  const [objets, setObjets] = useState([]);

  useEffect(() => {
    const chargerObjets = async () => {
      try {
        const reponse = await fetch("http://localhost:3000/api/objets");
        const objets = await reponse.json();

        setObjets(objets);
        console.log(objets);
      } catch (erreur) {
        console.error("Erreur de chargement :", erreur.message);
      }
    };

    chargerObjets();
  }, []);

  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";

  const objetsFiltres = objets.filter((item) => {
    const matchCategorie =
      categoriesActives.length === 0 ||
      categoriesActives.includes(item.categorie);
    const matchStatut = statutActif === "tous" || item.statut === statutActif;
    return matchCategorie && matchStatut;
  });

  return (
    <>
      <Filtres />
      <Objet objets={objetsFiltres} />
    </>
  );
}

export default ListeObjets;
