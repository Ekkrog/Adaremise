import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Objet from "./Objet.jsx";
import Filtres from "./Filtres.jsx";
import {getData} from "./assets/utils.js"

function ListeObjets() {
  const [searchParams] = useSearchParams();
  const [objets, setObjets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const chargerObjets = async () => {
      setObjets(await getData(location.pathname))
    };

    chargerObjets();
  }, []);

  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";

  const objetsFiltres = objets.filter((item) => {
    
    const matchCategorie =
      categoriesActives.length === 0 || //si pas de categorie selectionnée -> afficher tout
      categoriesActives.includes(item.categorie); // si categorie select = objets filtrés par catégorie (plusieurs select possible)
    const matchStatut = statutActif === "tous" || item.statut === statutActif; //
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
