import { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { getData, modifier_statut } from './assets/utils.js';
import './SuiviObjets.css';

function SuiviObjets() {
    const [monObjet, setMonObjet] = useState(null);
    const [newEtat, setNewEtat] = useState('');
    const [newStatut, setNewStatut] = useState('');
    const [newPrix, setNewPrix] = useState('');
    const [newCategorie, setNewCategorie] = useState('');
    const [newPoids, setNewPoids] = useState(0);
    const [listeCategories, setListeCategories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [erreurs, setErreurs] = useState({});
    const [messageSucces, setMessageSucces] = useState("");

    const location = useLocation();
    const params = useParams();

    const etat_obj = ['bon_etat', 'a_reparer', 'hors_service'];
    const statut_obj = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];

    useEffect(() => {
        const chargerDonnees = async () => {
            const obj = await getData(location.pathname);
            setMonObjet(obj);
            const cat = await getData("/categories");
            setListeCategories(cat);
            setNewEtat(obj.etat_arrivee || '');
            setNewStatut(obj.statut || '');
            setNewPrix(obj.prix || 0);
            setNewCategorie(obj.categorie_id || '');
            setNewPoids(obj.poids_kg || 0);
            setRefresh(false);
        };

        chargerDonnees();
    }, [location.pathname, refresh]);

    if (!monObjet) {
        return <p>Chargement des données...</p>;
    }

    const enregistrer = async () => {
        const poids = Number(newPoids);
        const prix = Number(newPrix);
        const nouvellesErreurs = {};

        if (isNaN(poids) || poids <= 0) nouvellesErreurs.poids = "Poids invalide (nombre positif attendu)";
        if (isNaN(prix) || prix < 0) nouvellesErreurs.prix = "Prix invalide";

        setErreurs(nouvellesErreurs);
        if (Object.keys(nouvellesErreurs).length > 0) return;

        const data = {
            etat_arrivee: newEtat || monObjet.etat_arrivee,
            poids_kg: poids,
            statut: newStatut || monObjet.statut,
            prix: prix,
            categorie_id: newCategorie || monObjet.categorie_id
        };

        const path = location.pathname + '/statut/';
        await getData(path, 'PATCH', data);
        setErreurs({});
        setMessageSucces("Objet mis à jour avec succès !");
        setTimeout(() => setMessageSucces(""), 3000);
        setRefresh(true);
    };

    return (
        <section className='suivi'>
            <h1>Suivi Objet</h1>
            <ul>
                <li><label className='liste'>Numéro : </label><label>{monObjet.id}</label></li>
                <li><label className='liste'>Nom : </label><label>{monObjet.libelle}</label></li>
                <li>
                    <label className='liste'>Poids : </label>
                    <input
                        type="text"
                        value={newPoids}
                        placeholder={monObjet.poids_kg + "Kg"}
                        onChange={(e) => setNewPoids(e.target.value)}
                    />
                    {erreurs.poids && <p className="erreur-champ">{erreurs.poids}</p>}
                </li>
                <li><label className='liste'>Catégorie : </label>
                    <select className='select' value={newCategorie} onChange={(e) => setNewCategorie(e.target.value)}>
                        {listeCategories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.libelle}
                            </option>
                        ))}
                    </select></li>

                <li>
                    <label className='liste'>Etat : </label>
                    <select className='select' value={newEtat} onChange={(e) => setNewEtat(e.target.value)}>
                        {etat_obj.map((etat) => (
                            <option key={etat} value={etat}>
                                {modifier_statut(etat)}
                            </option>
                        ))}
                    </select>
                </li>

                <li>
                    <label className='liste'>Statut : </label>
                    <select className='select' value={newStatut} onChange={(e) => setNewStatut(e.target.value)}>
                        {statut_obj.map((statut) => (
                            <option key={statut} value={statut}>
                                {modifier_statut(statut)}
                            </option>
                        ))}
                    </select>
                </li>

                <li>
                    <label className='liste'>Prix : </label>
                    <input
                        type="text"
                        value={newPrix}
                        placeholder={monObjet.prix + "€"}
                        onChange={(e) => setNewPrix(e.target.value)}
                    />
                    {erreurs.prix && <p className="erreur-champ">{erreurs.prix}</p>}
                </li>
            </ul>

            {messageSucces && <p className="succes">{messageSucces}</p>}

            <span className='button' onClick={enregistrer}>
                Enregistrer
            </span>
        </section>
    );
}

export default SuiviObjets;