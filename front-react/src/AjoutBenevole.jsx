import { useState } from "react";
import { getData } from "./assets/utils.js";
import "./AjoutBenevole.css";

function AjoutBenevole({ onBenevoleAjoute }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [erreurs, setErreurs] = useState({});
    const [messageSucces, setMessageSucces] = useState("");

    const sendBenevole = async () => {
        const nouvellesErreurs = {};

        if (!nom.trim()) nouvellesErreurs.nom = "Nom requis";
        if (!prenom.trim()) nouvellesErreurs.prenom = "Prénom requis";
        if (telephone && !/^[0-9+ .-]{6,20}$/.test(telephone.trim())) {
            nouvellesErreurs.telephone = "Téléphone invalide";
        }

        setErreurs(nouvellesErreurs);
        if (Object.keys(nouvellesErreurs).length > 0) return;

        try {
            const data = { nom: nom.trim(), prenom: prenom.trim(), telephone: telephone.trim() || undefined };
            const nouveauBenevole = await getData("/benevoles", "POST", data);

            setNom("");
            setPrenom("");
            setTelephone("");
            setErreurs({});
            setMessageSucces("Bénévole ajouté avec succès !");
            setTimeout(() => setMessageSucces(""), 3000);

            if (onBenevoleAjoute) {
                onBenevoleAjoute(nouveauBenevole);
            }
        } catch (err) {
            console.error(err);
            setErreurs({ global: "Erreur lors de la création du bénévole" });
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
                    {erreurs.nom && <p className="erreur-champ">{erreurs.nom}</p>}
                </div>
                <div className="champ">
                    <label>Prénom : </label>
                    <input
                        placeholder="Prénom requis"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                    {erreurs.prenom && <p className="erreur-champ">{erreurs.prenom}</p>}
                </div>
                <div className="champ">
                    <label>Téléphone : </label>
                    <input
                        placeholder="Optionnel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                    {erreurs.telephone && <p className="erreur-champ">{erreurs.telephone}</p>}
                </div>
                {erreurs.global && <p className="erreur">{erreurs.global}</p>}
                {messageSucces && <p className="succes">{messageSucces}</p>}
                <span className="button" onClick={sendBenevole}>
                    Ajouter le bénévole
                </span>
            </div>
        </>
    );
}

export default AjoutBenevole;