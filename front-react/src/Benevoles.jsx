import { useState } from 'react'
import './Benevoles.css'
import { useEffect } from 'react';

function Benevoles({connecte, setConnecte, benevoleChoisi, setBenevoleChoisi}) {

    const [ listeBenevoles, setListeBenevoles ] = useState([]);
    

    useEffect(() => {
        const chargerDonnees = async () => {
            const benevoles = await getData('/benevoles/');
            console.log(benevoles);
            setListeBenevoles(benevoles);
        }

        getlisteBenevoles();
    }, [])

  return (
    <>
        <select onChange={(e) => {setBenevoleChoisi(e.target.value)}} className='select'>
            <option value=''>Qui êtes-vous ?</option>
            {listeBenevoles.map((b) => {
                return <option key={b.id} value={b.nom + " " + b.prenom}>{b.nom} {b.prenom}</option>
            })}
        </select>

        <button onClick={() => {
            if(benevoleChoisi!=0){
                setConnecte(true);
            }
            
        }}>Me connecter</button>
    </>
  )
}

export default Benevoles
