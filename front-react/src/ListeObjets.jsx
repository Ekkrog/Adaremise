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
    
    const aucuneCategorieSelectionnee = categoriesActives.length === 0
    const categorieSelectionnee = categoriesActives.includes(item.categorie);
    const matchCategorie = aucuneCategorieSelectionnee || categorieSelectionnee
    
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
