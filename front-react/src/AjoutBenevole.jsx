import { useState } from "react";
import { getData } from "./assets/utils.js";
import "./AjoutBenevole.css";

function AjoutBenevole({ onBenevoleAjoute }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [erreur, setErreur] = useState("");

    const sendBenevole = async () => {
        if (!nom || !prenom) {
            setErreur("Nom et prénom sont requis");
            return;
        }

        try {
            const data = { nom:nom, prenom:prenom, telephone:telephone || undefined };
            const nouveauBenevole = await getData("/benevoles", "POST", data);
            console.log(data)
            setNom("");
            setPrenom("");
            setTelephone("");
            setErreur("");

            if (onBenevoleAjoute) {
                onBenevoleAjoute(nouveauBenevole);
            }
        } catch (err) {
            console.error(err);
            setErreur("Erreur lors de la création du bénévole");
        }
    };

    return (
        <>
            <div className="ajout_benevole">
                <div className="champ">
                    <label>Nom : </label>
                    <input
                        placeholder="Nom requis"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="champ">
                    <label>Prénom : </label>
                    <input
                        placeholder="Prénom requis"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="champ">
                    <label>Téléphone : </label>
                    <input
                        placeholder="Optionnel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </div>
                {erreur && <p className="erreur">{erreur}</p>}
                <span className="button" onClick={sendBenevole}>
                    Ajouter le bénévole
                </span>
            </div>
        </>
    );
}

export default AjoutBenevole;