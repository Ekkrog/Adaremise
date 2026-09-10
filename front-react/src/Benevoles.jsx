import { useState, useEffect } from 'react'
import './Benevoles.css'
import { getData } from './assets/utils.js';
import { useLocation, useParams } from 'react-router-dom';

function Benevoles({connecte, setConnecte, benevoleChoisi, setBenevoleChoisi}) {

    const [ listeBenevoles, setListeBenevoles ] = useState([]);
    const location = useLocation();
    console.log(location.pathname);

    
    useEffect(() => {
        const chargerDonnees = async () => {
            const benevoles = await getData('benevoles/');
            console.log(benevoles);
            setListeBenevoles(benevoles);
        }
        
        chargerDonnees();
    }, [])

  return (
    <>
        <select onChange={(e) => {setBenevoleChoisi(e.target.value)}} className='select'>
            <option value="">Qui êtes vous ?</option>
            {listeBenevoles.map((b) => {
                return <option key={b.id} value={b.nom + " " + b.prenom}>{b.nom} {b.prenom}</option>
            })}
        </select>

        <button onClick={() => {
            setConnecte(true);
            
        }}>Me connecter</button>
    </>
  )
}

export default Benevoles
