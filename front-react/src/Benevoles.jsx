import { useState, useEffect } from 'react'
import './Benevoles.css'
import { getData } from './assets/utils.js';
import { useLocation, useParams } from 'react-router-dom';
import './variables.css';
import logo from './assets/img/logo-la-remise.png';
import AjoutBenevole from './AjoutBenevole.jsx';

function Benevoles({connecte, setConnecte, benevoleChoisi, setBenevoleChoisi}) {

    const [ listeBenevoles, setListeBenevoles ] = useState([]);
    const [ creer, setCreer ] = useState(false);
    const location = useLocation();

    const chargerDonnees = async () => {
        const benevoles = await getData('/benevoles/');
        setListeBenevoles(benevoles);
    }

    useEffect(() => {
        chargerDonnees();
    }, [])

  return (
    <>
        <img className='logo-connect' src={logo} />
        <section className='benevoles'>
            {!creer && (
                <>
                    <select onChange={(e) => {
                        setBenevoleChoisi(e.target.value);
                    }} className='select'>
                        <option value=''>Qui êtes-vous ?</option>
                        {listeBenevoles.map((b) => {
                            return <option key={b.id} value={b.nom + " " + b.prenom}>{b.nom} {b.prenom}</option>
                        })}
                    </select>

                    <span className='button tiny' onClick={() => {
                        setCreer(true);
                    }}>
                        ✙
                    </span>

                    <span className='button' onClick={() => {
                        if(benevoleChoisi!=0){
                            setConnecte(true);
                            localStorage.setItem("connecte","true");
                            localStorage.setItem("benevoleChoisi", benevoleChoisi)
                        }
                    }}>Me connecter</span>
                </>
            )}

            {creer && (
                <>
                    <AjoutBenevole onBenevoleAjoute={(nouveau) => {
                        chargerDonnees();
                        setBenevoleChoisi(nouveau.nom + " " + nouveau.prenom);
                        setCreer(false);
                    }} />

                    <span className='button tiny' onClick={() => {
                        setCreer(false);
                    }}>
                        Annuler
                    </span>
                </>
            )}
        </section>

    </>
  )
}

export default Benevoles