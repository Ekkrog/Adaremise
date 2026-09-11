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
            <section className='suivi'>
                <h1>Suivi Objet</h1>
                <ul>
                    <li><label className='liste'>Numéro : </label><label>{monObjet.id}</label></li>
                    <li><label className='liste'>Nom : </label><label>{monObjet.libelle}</label></li>
                    <li><label className='liste'>Poids : </label><label>{monObjet.poids_kg + ' Kg'}</label></li>
                    <li><label className='liste'>Catégorie : </label><label>{monObjet.categorie}</label></li>
                    <li><label className='liste'>Etat : </label>
                        <select className='select' onChange={(e) => {setNewEtat(e.target.value)}}>{etat_obj.map((etat) =>
                            {
                                return etat === monObjet.etat_arrivee ? <option value={etat} selected>{etat}</option> : <option value={etat} >{etat}</option>
                            }
                        )}
                        </select></li>
                    <li><label className='liste'>Statut : </label>
                        <select  className='select' onChange={(e) => {setNewStatut(e.target.value)}}>{statut_obj.map((statut) =>
                            {
                                return statut === monObjet.statut ? <option value={statut} selected>{statut}</option> : <option value={statut}>{statut}</option>
                            }
                        )}
                        </select></li>
                    <li><label className='liste'>Prix : </label><input placeholder={monObjet.prix + "€"} onChange={(e) => {setNewPrice(e.target.value)} } /></li>

                    
                </ul>
                <span className='button' onClick={() => {
                        const data = {etat_arrivee:newEtat, statut:newStatut, prix:newPrix};
                        
                        const envoyerDonnees = async () => {
                            const path = location.pathname + '/statut/';
                            
                            const obj = await getData(path, 'PATCH', data);
                            
                            setMonObjet(obj);
                        }
                        envoyerDonnees();

                    }}>Enregistrer</span>
            </section>
            
        </>
    )
}

export default SuiviObjets
