import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getData } from './assets/utils.js';
import './SuiviObjets.css'

function SuiviObjets() {
    
    const [monObjet, setMonObjet] = useState([]);
    const location = useLocation();
    console.log(location.pathname);
    const params = useParams();
    const id = params.id;
    console.log(id);
    useEffect(() => {
        
        const chargerDonnees = async () => {
            const obj = await getData(`objets/${id}`);
            
            setMonObjet(obj);
        }
        
        chargerDonnees();
    }, [])

    return (
        <>
            <h1>Suivi Objet {monObjet.libelle}</h1>
        </>
    )
}

export default SuiviObjets
