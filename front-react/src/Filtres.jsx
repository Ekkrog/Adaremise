import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const [categories, setCategories] = useState([]);

useEffect(() => {
  const getlisteCategories = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/categories");
      const categories = await reponse.json();

      setCategories(categories);
      console.log(categories);
    } catch (erreur) {
      console.error("Erreur :", erreur.message);
    }
  };
  getlisteCategories;
}, []);

const statuts = [
  { value: "tous", label: "Tous" },
  { value: "recycle", label: "Recyclé" },
  { value: "arrive", label: "Arrivé" },
  { value: "en_reparation", label: "En réparation" },
  { value: "en_rayon", label: "En rayon" },
  { value: "vendu", label: "Vendu" },
];

function Filtres() {
  const [searchParams, setSearchParams] = useSearchParams();


  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";

  const changerCategories = (e) => {
    const selectionnees = Array.from(e.target.selectedOptions).map(
      (o) => o.value,
    );

    const params = new URLSearchParams(searchParams);
    params.delete("categorie");
    selectionnees.forEach((c) => params.append("categorie", c));
    setSearchParams(params);
  };

  const changerStatut = (e) => {
    const statut = e.target.value;

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
            <option key={categorie} value={categorie}>
              {categorie}
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
