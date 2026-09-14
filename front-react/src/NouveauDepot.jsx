import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";
import {
  FormulaireDepot,
  FormulaireObjet,
  formatPrix,
} from "./FormulairesDepot.jsx";
import "./NouveauDepot.css";

function NouveauDepot() {
  const [categories, setCategories] = useState([]);
  const [depotId, setDepotId] = useState(null);
  const [deposant, setDeposant] = useState(null);
  const [objets, setObjets] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getData("/categories").then(setCategories);
  }, []);

  /**
   *
   * @param {*} event.preventDefault() empêche le clic du bouton "enregistrer" de revenir à un formulaire vierge
   * @returns
   */
  const enregistrerDepot = async (event) => {
    event.preventDefault();
    setErreur("");
    const formulaire = event.target;

    const personne = await getData("/personnes", "POST", {
      nom: formulaire.nom.value,
      prenom: formulaire.prenom.value,
      telephone: formulaire.telephone.value,
    });

    const depot = await getData("/depots", "POST", {
      personne_id: personne.id,
      date_depot: formulaire.date_depot.value,
      type: formulaire.type.value,
    });

    if (depot.erreur) return setErreur(depot.erreur);
    setDepotId(depot.id);
  };

  /**
   *
   * @param {*} event.preventDefault() annule l'event qui recharge le formulaire au clic du bouton
   * @returns
   */
  const ajouterObjet = async (event) => {
    event.preventDefault();
    const formulaire = event.target;

    const objet = await getData(`/depots/${depotId}/objets`, "POST", {
      libelle: formulaire.libelle.value,
      poids_kg: formulaire.poids_kg.value,
      etat_arrivee: formulaire.etat_arrivee.value,
      categorie_id: formulaire.categorie_id.value,
      prix: formulaire.prix.value || null,
    });

    if (objet.erreur) return setErreur(objet.erreur);
    setObjets([...objets, objet]);
    formulaire.reset();
  };

  if (!depotId) {
    return <FormulaireDepot onSubmit={enregistrerDepot} erreur={erreur} />;
  }

  return (
    <>
      <p>Dépôt n°{depotId} enregistré.</p>

      <FormulaireObjet
        onSubmit={ajouterObjet}
        categories={categories}
        erreur={erreur}
      />

      {objets.length > 0 && (
        <section className="objets-section">
          <h4 className="objets-titre">Objets ajoutés ({objets.length})</h4>
          <ul className="liste-objets">
            {objets.map((objet) => (
              <li key={objet.id}>
                <span className="objet-nom">{objet.libelle}</span>
                <div className="objet-details">
                  <span className="objet-poids">{objet.poids_kg} kg</span>
                  <span className="objet-prix">{formatPrix(objet.prix)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default NouveauDepot;
