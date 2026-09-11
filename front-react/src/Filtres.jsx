import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import {getData} from "./assets/utils.js"

const statuts = [
  { value: "tous", label: "Tous" },
  { value: "recycle", label: "Recyclé" },
  { value: "arrive", label: "Arrivé" },
  { value: "en_reparation", label: "En réparation" },
  { value: "en_rayon", label: "En rayon" },
  { value: "vendu", label: "Vendu" },
];

function Filtres() {
  
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();


  useEffect(() => {
    const getlisteCategories = async () => {
      setCategories(await getData("/categories"))
    };
    getlisteCategories();
  }, []);


  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";

  const changerCategories = (event) => {
    const optionsSelectionnees = Array.from(event.target.selectedOptions).map(
      (option) => option.value,
    );

    const params = new URLSearchParams(searchParams);
    params.delete("categorie");
    optionsSelectionnees.forEach((categorie) => params.append("categorie", categorie));
    setSearchParams(params);
  };

  const changerStatut = (event) => {
    const statut = event.target.value;

    const params = new URLSearchParams(searchParams);
    if (statut === "tous") {
      params.delete("statut");
    } else {
      params.set("statut", statut);
    }
    setSearchParams(params);
  };


  return (
    <>
      <section className="filtreCategorie">
        <h3>Catégorie</h3>
        <select multiple value={categoriesActives} onChange={changerCategories}>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.libelle}>
              {categorie.libelle}
            </option>
          ))}
        </select>
      </section>

      <section className="filtreStatut">
        <h3>Statut</h3>
        <select value={statutActif} onChange={changerStatut}>
          {statuts.map((statut) => (
            <option key={statut.value} value={statut.value}>
              {statut.label}
            </option>
          ))}
        </select>
      </section>
    </>
  );
}

export default Filtres;
