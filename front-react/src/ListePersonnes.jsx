import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";

export function ListePersonnes() {
  const [personnes, setPersonnes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    let annule = false;

    async function charger() {
      setChargement(true);
      const resultat = await getData("/personnes");

      if (annule) return;

      if (resultat) {
        setPersonnes(resultat);
        setErreur(null);
      } else {
        setErreur("Impossible de charger les personnes");
      }
      setChargement(false);
    }

    charger();

    return () => {
      annule = true;
    };
  }, []);

  if (chargement) return <p>Chargement…</p>;
  if (erreur) return <p>{erreur}</p>;

  return (
    <details>
      <summary>Liste des déposants </summary>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Adhérente</th>
          </tr>
        </thead>
        <tbody>
          {personnes.map((personne) => (
            <tr key={personne.id}>
              <td>{personne.nom}</td>
              <td>{personne.prenom}</td>
              <td>{personne.telephone ?? "—"}</td>
              <td>{personne.adherente ? "Oui" : "Non"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

export default ListePersonnes;
