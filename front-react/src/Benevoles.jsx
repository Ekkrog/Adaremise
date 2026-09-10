import { useState } from 'react'
import './Benevoles.css'
import { useEffect } from 'react';

function Benevoles({connecte, setConnecte, benevoleChoisi, setBenevoleChoisi}) {

    const [ listeBenevoles, setListeBenevoles ] = useState([]);
    

    useEffect(() => {
<<<<<<< HEAD

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
=======
        const chargerDonnees = async () => {
            const benevoles = await getData('/benevoles/');
            console.log(benevoles);
            setListeBenevoles(benevoles);
>>>>>>> cfe2770e9702f532ac3fe47b04f8cfeb62c0f39e
        }

        getlisteBenevoles();
    }, [])

  return (
    <>
        <select onChange={(e) => {setBenevoleChoisi(e.target.value)}} className='select'>
<<<<<<< HEAD
            <option value="">Qui êtes vous ?</option>
=======
            <option value=''>Qui êtes-vous ?</option>
>>>>>>> cfe2770e9702f532ac3fe47b04f8cfeb62c0f39e
            {listeBenevoles.map((b) => {
                return <option key={b.id} value={b.nom + " " + b.prenom}>{b.nom} {b.prenom}</option>
            })}
        </select>

        <button onClick={() => {
<<<<<<< HEAD
            setConnecte(true);
=======
            if(benevoleChoisi!=0){
                setConnecte(true);
            }
>>>>>>> cfe2770e9702f532ac3fe47b04f8cfeb62c0f39e
            
        }}>Me connecter</button>
    </>
  )
}

export default Benevoles
