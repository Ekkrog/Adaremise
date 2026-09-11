import { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { getData } from './assets/utils.js'
import './SuiviObjets.css'

function SuiviObjets() {
    
    const [monObjet, setMonObjet] = useState([]);
    const location = useLocation();
    
    const params = useParams();
    const id = params.id;
   

    const etat_obj = ['bon_etat', 'a_reparer', 'hors_service'];
    const statut_obj = ['arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'];

    useEffect(() => {
        
        const chargerDonnees = async () => {
            const obj = await getData(location.pathname);
            
            setMonObjet(obj);
        }
        
        chargerDonnees();
    }, [])
    
    const [newEtat, setNewEtat] = useState(monObjet.etat_arrivee);
    const [newStatut, setNewStatut] = useState(monObjet.statut);
    const [newPrix, setNewPrice] = useState(monObjet.prix);
    return (
        <>

            <h1>Suivi Objet</h1>
            
            <label>Numéro : </label><label>{monObjet.id}</label><br/>
            <label>Nom : </label><label>{monObjet.libelle}</label><br/>
            <label>Poids (Kg) : </label><label>{monObjet.poids_kg}</label><br/>
            <label>Catégorie : </label><label>{monObjet.categorie}</label><br/>
            <label>Etat : </label>
                <select onChange={(e) => {setNewEtat(e.target.value)}}>{etat_obj.map((etat) =>
                    {
                        return etat === monObjet.etat_arrivee ? <option value={etat} selected>{etat}</option> : <option value={etat} >{etat}</option>
                    }
                )}
                </select><br/>
            <label>Statut : </label>
                <select  onChange={(e) => {setNewStatut(e.target.value)}}>{statut_obj.map((statut) =>
                    {
                        return statut === monObjet.statut ? <option value={statut} selected>{statut}</option> : <option value={statut}>{statut}</option>
                    }
                )}
                </select><br/>
            <label>Prix : </label><input placeholder={monObjet.prix} onChange={(e) => {setNewPrice(e.target.value)} } /><br/>

            <button onClick={() => {
                const data = {etat_arrivee:newEtat, statut:newStatut, prix:newPrix};
                
                const envoyerDonnees = async () => {
                    const path = location.pathname + '/statut/';
                    
                    const obj = await getData(path, 'PATCH', data);
                    
                    setMonObjet(obj);
                }
                envoyerDonnees();

            }}>Enregistrer</button>
        </>
    )
}

export default SuiviObjets
