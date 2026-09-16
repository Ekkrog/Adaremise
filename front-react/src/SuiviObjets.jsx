import { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { getData, modifier_statut } from './assets/utils.js';
import './SuiviObjets.css';

function SuiviObjets() {
    // Initialiser à null ou un objet vide au lieu d'un tableau []
    const [monObjet, setMonObjet] = useState(null);
    const [newEtat, setNewEtat] = useState('');
    const [newStatut, setNewStatut] = useState('');
    const [newPrix, setNewPrix] = useState('');
    const [refresh, setRefresh] = useState(false)

    const location = useLocation();
    const params = useParams();

    const etat_obj = ['bon_etat', 'a_reparer', 'hors_service'];
    const statut_obj = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];

    useEffect(() => {
        const chargerDonnees = async () => {
            const obj = await getData(location.pathname);
            
            setMonObjet(obj);
            
            setNewEtat(obj.etat_arrivee || '');
            setNewStatut(obj.statut || '');
            setNewPrix(obj.prix || '');
            setRefresh(false);
        };

        chargerDonnees();
    }, [location.pathname], refresh);

    if (!monObjet) {
        return <p>Chargement des données...</p>;
    }

    return (
        <section className='suivi'>
            <h1>Suivi Objet</h1>
            <ul>
                <li><label className='liste'>Numéro : </label><label>{monObjet.id}</label></li>
                <li><label className='liste'>Nom : </label><label>{monObjet.libelle}</label></li>
                <li><label className='liste'>Poids : </label><label>{monObjet.poids_kg} Kg</label></li>
                <li><label className='liste'>Catégorie : </label><label>{monObjet.categorie}</label></li>
                
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
                </li>
            </ul>

            <span className='button' onClick={async () => {
                const data = {
                    etat_arrivee: newEtat || monObjet.etat_arrivee,
                    statut: newStatut || monObjet.statut,
                    prix: newPrix || monObjet.prix
                };

                const path = location.pathname + '/statut/';
                const objUpdated = await getData(path, 'PATCH', data);
                
                setRefresh(true)
            }}>
                Enregistrer
            </span>
        </section>
    );
}

export default SuiviObjets;