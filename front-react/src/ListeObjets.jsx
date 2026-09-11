import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Objet from "./Objet.jsx";
import Filtres from "./Filtres.jsx";
import {getData} from "./assets/utils.js"
import './ListeObjets.css';
import './variables.css';

function ListeObjets() {
  const [searchParams] = useSearchParams();
  const [objets, setObjets] = useState([]);
  const [objetId, setObjetId] = useState (null)
  const location = useLocation();

  const rechercheActive = searchParams.get("recherche") || "";
  const rechercheId = /^\d+$/.test(rechercheActive);

  useEffect(() => {
    const chargerObjets = async () => {
      const data = await getData(location.pathname)
      setObjets(Array.isArray(data) ? data : [])
    };

    chargerObjets();
  }, [location.pathname]);

  useEffect(() => {
    const chercherId = async () => {
      if (rechercheId && rechercheActive !== "") {
        const res = await getData(`/objets/${rechercheActive}`);
       if (res && !res.erreur) {
        setObjetId([res]);
      } else {
        setObjetId([]);
      } 
    } else {
        setObjetId(null);
      }
    }
    chercherId()
  }, [rechercheActive, rechercheId])

const filtreRecherche = (liste) => {
  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";
  const texteRecherche = rechercheActive.toLowerCase()

  return liste.filter((item) => {
    const aucuneCategorie = categoriesActives.length === 0
    const matchCategorie = aucuneCategorie || categoriesActives.includes(item.categorie);

    const matchStatut = statutActif === "tous" || item.statut === statutActif; 

    const matchRecherche = rechercheId || texteRecherche === "" || item.libelle.toLowerCase().includes(texteRecherche);

    return matchCategorie && matchStatut && matchRecherche;
  });
}

const objetsFiltres = objetId !== null ? objetId : filtreRecherche(objets);

  return (
    <>
      <Filtres />
      <Objet objets={objetsFiltres} />
    </>
  );
}

export default ListeObjets;