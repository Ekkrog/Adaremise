const libellesEtat = {
  bon_etat: "Bon état",
  a_reparer: "À réparer",
  hors_service: "Hors service",
};

export function libelleEtat(code) {
  return libellesEtat[code] ?? code;
}

const libellesType = {
  boutique: "Boutique",
  domicile: "Domicile",
};

export function libelleType(code) {
  return libellesType[code] ?? code;
}

export function formatDateFR(valeur) {
  if (!valeur) return "";
  const [annee, mois, jour] = valeur.split("-");
  return `${jour}/${mois}/${annee}`;
}

export function formatPrix(valeur) {
  if (valeur === null || valeur === undefined || valeur === "") {
    return "—";
  }
  return `${Number(valeur).toFixed(2)} €`;
}

export function FormulaireDepot({ onSubmit, erreurs = {} }) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Enregistrer le dépôt</h3>
      <div className="champ">
        <input name="nom" placeholder="Nom" />
        {erreurs.nom && <p className="erreur-champ">{erreurs.nom}</p>}
      </div>
      <div className="champ">
        <input name="prenom" placeholder="Prénom" />
        {erreurs.prenom && <p className="erreur-champ">{erreurs.prenom}</p>}
      </div>
      <div className="champ">
        <input name="date_depot" type="date" />
        {erreurs.date_depot && <p className="erreur-champ">{erreurs.date_depot}</p>}
      </div>
      <div className="champ">
        <input name="telephone" placeholder="Téléphone (optionnel)" />
        {erreurs.telephone && <p className="erreur-champ">{erreurs.telephone}</p>}
      </div>
      <select name="type">
        <option value="boutique">Boutique</option>
        <option value="domicile">Domicile</option>
      </select>
      <button type="submit">Enregistrer le dépôt</button>
      {erreurs.global && <p className="erreur">{erreurs.global}</p>}
    </form>
  );
}

export function FormulaireObjet({ onSubmit, categories, erreurs = {} }) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Ajouter un objet</h3>
      <div className="champ">
        <input name="libelle" placeholder="Nom de l'objet" />
        {erreurs.libelle && <p className="erreur-champ">{erreurs.libelle}</p>}
      </div>

      <div className="champ">
        <select name="categorie_id" defaultValue="">
          <option value="" disabled>-- Catégorie --</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.libelle}
            </option>
          ))}
        </select>
        {erreurs.categorie_id && <p className="erreur-champ">{erreurs.categorie_id}</p>}
      </div>

      <select name="etat_arrivee">
        <option value="bon_etat">Bon état</option>
        <option value="a_reparer">À réparer</option>
        <option value="hors_service">Hors service</option>
      </select>

      <div className="champ">
        <input name="poids_kg" type="number" placeholder="Poids (kg)" step="0.01" min="0" />
        {erreurs.poids_kg && <p className="erreur-champ">{erreurs.poids_kg}</p>}
      </div>

      <div className="champ">
        <input name="prix" type="number" placeholder="Prix (€)" step="0.01" min="0" />
        {erreurs.prix && <p className="erreur-champ">{erreurs.prix}</p>}
      </div>

      <button type="submit">Ajouter l'objet</button>
      {erreurs.global && <p className="erreur">{erreurs.global}</p>}
    </form>
  );
}

function FormulairesDepot() {
  return <></>;
}

export default FormulairesDepot;