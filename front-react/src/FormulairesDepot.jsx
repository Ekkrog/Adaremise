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

export function FormulaireDepot({ onSubmit, erreur }) {
  return (
    <form onSubmit={onSubmit}>
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

export function FormulaireObjet({ onSubmit, categories, erreur }) {
  return (
    <form onSubmit={onSubmit}>
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
  );
}

function FormulairesDepot() {
  return <></>;
}

export default FormulairesDepot;