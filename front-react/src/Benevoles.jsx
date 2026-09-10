import { useState } from 'react'
import './Benevoles.css'
import { useEffect } from 'react';

function Benevoles({connecte, setConnecte, benevoleChoisi, setBenevoleChoisi}) {

    const [ listeBenevoles, setListeBenevoles ] = useState([]);
    

    useEffect(() => {

        const getlisteBenevoles = async () => {
            try{
                const response = await fetch("http://localhost:3000/api/benevoles");
                const maRep = await response.json();
                
                setListeBenevoles(maRep);
                console.log(listeBenevoles)
            }
            catch(error){
                console.error("ça marche pas", error);
            }
        }

        getlisteBenevoles();
    }, [])

  return (
    <>
        <select onChange={(e) => {setBenevoleChoisi(e.target.value)}} className='select'>
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
