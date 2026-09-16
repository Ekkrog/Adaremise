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
    const [newCategorie, setNewCategorie] = useState('');
    const [newPoids, setNewPoids] = useState(0);
    const [listeCategories, setListeCategories] = useState([])
    const [refresh, setRefresh] = useState(false)

    const location = useLocation();
    const params = useParams();

    const etat_obj = ['bon_etat', 'a_reparer', 'hors_service'];
    const statut_obj = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];
    

    useEffect(() => {
        const chargerDonnees = async () => {
            const obj = await getData(location.pathname);
            console.log(obj)
            setMonObjet(obj);
            const cat = await getData("/categories")
            console.log(cat)
            setListeCategories(cat)
            setNewEtat(obj.etat_arrivee || '');
            setNewStatut(obj.statut || '');
            setNewPrix(obj.prix || 0);
            setNewCategorie(obj.categorie_id || '');
            setNewPoids(obj.poids_kg || 0);
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
                <li><label className='liste'>Poids : </label><input 
                        type="text" 
                        value={newPoids} 
                        placeholder={monObjet.poids_kg + "Kg"} 
                        onChange={(e) => setNewPoids(e.target.value)} 
                    /></li>
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
                </li>
            </ul>

            <span className='button' onClick={async () => {
                const data = {
                    etat_arrivee: newEtat || monObjet.etat_arrivee,
                    poids_kg: newPoids || monObjet.poids_kg,
                    statut: newStatut || monObjet.statut,
                    prix: newPrix || monObjet.prix,
                    categorie_id: newCategorie || monObjet.categorie_id
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