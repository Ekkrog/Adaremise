import { useState, useEffect } from "react";
import { getData } from "./assets/utils.js";
import "./GestionBenevoles.css";
import AjoutBenevole from './AjoutBenevole.jsx';

function GestionBenevoles() {
    const [listeBenevoles, setListeBenevoles] = useState([]);
    const [erreur, setErreur] = useState("");
    const [idAConfirmer, setIdAConfirmer] = useState(null);
    const [creer, setCreer] = useState(false);

    const chargerBenevoles = async () => {
        const benevoles = await getData("/benevoles/");
        setListeBenevoles(benevoles);
    };

    useEffect(() => {
        chargerBenevoles();
    }, []);

    const confirmerSuppression = async (id) => {
        try {
            await getData(`/benevoles/${id}`, "DELETE");
            setListeBenevoles(listeBenevoles.filter((b) => b.id !== id));
            setIdAConfirmer(null);
        } catch (err) {
            console.error(err);
            setErreur("Erreur lors de la suppression");
        }
    };

    return (
        <>
            <h2>Gestion des bénévoles</h2>
            {erreur && <p className="erreur">{erreur}</p>}

            {!creer && (
                <span className="button tiny" onClick={() => setCreer(true)}>
                    ✙ Ajouter un bénévole
                </span>
            )}

            {creer && (
                <AjoutBenevole onBenevoleAjoute={() => {
                    chargerBenevoles();
                    setCreer(false);
                }} />
            )}
            {creer && (
                <span className="button tiny" onClick={() => setCreer(false)}>
                    Annuler
                </span>
            )}

            <div className="liste_benevoles">
                {listeBenevoles.map((b) => (
                    <div key={b.id} className="ligne_benevole">
                        {idAConfirmer === b.id ? (
                            <div className="confirmation_suppression">
                                <span>Supprimer {b.nom} {b.prenom} ?</span>
                                <div className="boutons_confirmation">
                                    <span
                                        className="bouton_annuler"
                                        onClick={() => setIdAConfirmer(null)}
                                    >
                                        Annuler
                                    </span>
                                    <span
                                        className="bouton_confirmer"
                                        onClick={() => confirmerSuppression(b.id)}
                                    >
                                        Confirmer
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span>{b.nom} {b.prenom}</span>
                                <span
                                    className="bouton_supprimer"
                                    onClick={() => setIdAConfirmer(b.id)}
                                >
                                    🗑
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default GestionBenevoles;