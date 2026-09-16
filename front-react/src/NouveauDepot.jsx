import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";
import {
  FormulaireDepot,
  FormulaireObjet,
  formatPrix,
} from "./FormulairesDepot.jsx";
import { ListePersonnes } from "./ListePersonnes.jsx";
import "./NouveauDepot.css";

function NouveauDepot() {
  const [categories, setCategories] = useState([]);
  const [depotId, setDepotId] = useState(null);
  const [deposant, setDeposant] = useState(null);
  const [objets, setObjets] = useState([]);
  const [erreurs, setErreurs] = useState({});
  const [messageDeposant, setMessageDeposant] = useState("");
  const [messageSucces, setMessageSucces] = useState("");

  useEffect(() => {
    getData("/categories").then(setCategories);
  }, []);

  const afficherSucces = (msg) => {
    setMessageSucces(msg);
    setTimeout(() => setMessageSucces(""), 3000);
  };

  const enregistrerDepot = async (event) => {
    event.preventDefault();
    setMessageDeposant("");
    const formulaire = event.target;
    const nom = formulaire.nom.value.trim();
    const prenom = formulaire.prenom.value.trim();
    const dateDepot = formulaire.date_depot.value;
    const telephone = formulaire.telephone.value.trim();

    const nouvellesErreurs = {};
    if (!nom) nouvellesErreurs.nom = "Nom requis";
    if (!prenom) nouvellesErreurs.prenom = "Prénom requis";
    if (!dateDepot) nouvellesErreurs.date_depot = "Date requise";
    if (telephone && !/^[0-9+ .-]{6,20}$/.test(telephone)) {
      nouvellesErreurs.telephone = "Téléphone invalide";
    }

    setErreurs(nouvellesErreurs);
    if (Object.keys(nouvellesErreurs).length > 0) return;

    const personnes = (await getData("/personnes")) ?? [];
    const personneExiste = personnes.find(
      (personne) =>
        personne.nom.toLowerCase() === nom.toLowerCase() &&
        personne.prenom.toLowerCase() === prenom.toLowerCase()
    );

    const personne =
      personneExiste ??
      (await getData("/personnes", "POST", {
        nom,
        prenom,
        telephone: telephone || undefined,
      }));

    if (personneExiste) {
      setMessageDeposant(
        `Contact existant repris : ${personne.prenom} ${personne.nom}.`
      );
    }

    const depot = await getData("/depots", "POST", {
      personne_id: personne.id,
      date_depot: dateDepot,
      type: formulaire.type.value,
    });

    if (depot.erreur) {
      setErreurs({ global: depot.erreur });
      return;
    }
    afficherSucces("Dépôt enregistré avec succès !");
    setDepotId(depot.id);
  };

  const ajouterObjet = async (event) => {
    event.preventDefault();
    const formulaire = event.target;

    const libelle = formulaire.libelle.value.trim();
    const poids = Number(formulaire.poids_kg.value);
    const prixValeur = formulaire.prix.value;
    const prix = prixValeur === "" ? null : Number(prixValeur);
    const categorieId = formulaire.categorie_id.value;

    const nouvellesErreurs = {};
    if (!libelle) nouvellesErreurs.libelle = "Nom de l'objet requis";
    if (!categorieId) nouvellesErreurs.categorie_id = "Catégorie requise";
    if (isNaN(poids) || poids <= 0) nouvellesErreurs.poids_kg = "Poids invalide (nombre positif attendu)";
    if (prix !== null && (isNaN(prix) || prix < 0)) nouvellesErreurs.prix = "Prix invalide";

    setErreurs(nouvellesErreurs);
    if (Object.keys(nouvellesErreurs).length > 0) return;

    const objet = await getData(`/depots/${depotId}/objets`, "POST", {
      libelle,
      poids_kg: poids,
      etat_arrivee: formulaire.etat_arrivee.value,
      categorie_id: categorieId,
      prix,
    });

    if (objet.erreur) {
      setErreurs({ global: objet.erreur });
      return;
    }
    setObjets([...objets, objet]);
    setErreurs({});
    afficherSucces("Objet ajouté avec succès !");
    formulaire.reset();
  };

  if (!depotId) {
    return (
      <>
        <ListePersonnes />
        <FormulaireDepot onSubmit={enregistrerDepot} erreurs={erreurs} />
        {messageSucces && <p className="succes">{messageSucces}</p>}
      </>
    );
  }

  return (
    <>
      <div className="messages-depot">
        <p>Dépôt n°{depotId} enregistré.</p>
        {messageDeposant && <p className="message-deposant">{messageDeposant}</p>}
      </div>

      <FormulaireObjet
        onSubmit={ajouterObjet}
        categories={categories}
        erreurs={erreurs}
      />
      {messageSucces && <p className="succes">{messageSucces}</p>}

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