import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";
import "./GestionBenevoles.css";

function GestionBenevoles() {
    const [listeBenevoles, setListeBenevoles] = useState([]);
    const [erreur, setErreur] = useState("");

    const chargerBenevoles = async () => {
        const benevoles = await getData("/benevoles/");
        setListeBenevoles(benevoles);
    };

    useEffect(() => {
        chargerBenevoles();
    }, []);

    const supprimerBenevole = async (id) => {
        try {
            await getData(`/benevoles/${id}`, "DELETE");
            setListeBenevoles(listeBenevoles.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
            setErreur("Erreur lors de la suppression");
        }
    };

    return (
        <>
            <h2>Gestion des bénévoles</h2>
            {erreur && <p className="erreur">{erreur}</p>}
            <div className="liste_benevoles">
                {listeBenevoles.map((b) => (
                    <div key={b.id} className="ligne_benevole">
                        <span>{b.nom} {b.prenom}</span>
                        <span
                            className="bouton_supprimer"
                            onClick={() => supprimerBenevole(b.id)}
                        >
                            🗑
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GestionBenevoles;