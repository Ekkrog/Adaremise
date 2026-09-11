import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";

const libellesEtat = {
  bon_etat: "Bon état",
  a_reparer: "À réparer",
  hors_service: "Hors service",
};

function libelleEtat(code) {
  return libellesEtat[code] ?? code;
}

const libellesType = {
  boutique: "Boutique",
  domicile: "Domicile",
};

function libelleType(code) {
  return libellesType[code] ?? code;
}

function formatDateFR(valeur) {
  if (!valeur) return "";
  const [annee, mois, jour] = valeur.split("-");
  return `${jour}/${mois}/${annee}`;
}

function formatPrix(valeur) {
  if (valeur === null || valeur === undefined || valeur === "") {
    return "—";
  }
  return `${Number(valeur).toFixed(2)} €`;
}

function NouveauDepot() {
  const [categories, setCategories] = useState([]);
  const [depotId, setDepotId] = useState(null);
  const [deposant, setDeposant] = useState(null);
  const [objets, setObjets] = useState([]);
  const [erreur, setErreur] = useState('')

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
    setErreur('')
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

    if (depot.erreur) 
        return setErreur(depot.erreur);
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
    return (
      <form onSubmit={enregistrerDepot}>
        <h3>Enregistrer le dépôt</h3>
        <input name="prenom" placeholder="Prénom" required />
        <input name="nom" placeholder="Nom" required />
        <input name="date_depot" type="date" required />
        <input name="telephone" placeholder="Téléphone (optionnel)" />
        <select name="type">
          <option value="boutique">Boutique</option>
          <option value="domicile">Domicile</option>
        </select>
        <button type="submit">Enregistrer le dépôt</button>
        {erreur && <p>{erreur}</p>}
      </form>
    );
  }

  return (
    <>
      <p>Dépôt n°{depotId} enregistré.</p>

      <form onSubmit={ajouterObjet}>
        <h3>Ajouter un objet</h3>
        <input name="libelle" placeholder="Nom de l'objet" required />
        
        <select name="categorie_id" required>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.libelle}
            </option>
          ))}
        </select>

        <select name="etat_arrivee">
          <option value="bon_etat">Bon état</option>
          <option value="a_reparer">À réparer</option>
          <option value="hors_service">Hors service</option>
        </select>

        <input
          name="poids_kg"
          type="number"
          placeholder="Poids (kg)"
          required
        />

        <input name="prix" type="number" placeholder="Prix (€)" />
        <button type="submit">Ajouter l'objet</button>
        {erreur && <p>{erreur}</p>}
      </form>

      <ul>
        {objets.map((objet) => (
          <li key={objet.id}>
            {objet.libelle} – {objet.poids_kg} kg
          </li>
        ))}
      </ul>
    </>
  );
}

export default NouveauDepot;