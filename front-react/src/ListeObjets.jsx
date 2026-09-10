import { useEffect, useState } from "react";
<<<<<<< HEAD

function ListeObjets() {
  const [objet, setObjet] = useState([]);


  useEffect(() => {
    const chargerObjets = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/objets");
      const objets = await reponse.json();
=======
import { useSearchParams, useLocation } from "react-router-dom";
import Objet from "./Objet.jsx";
import Filtres from "./Filtres.jsx";
import {getData} from "./assets/utils.js"

function ListeObjets() {
  const [searchParams] = useSearchParams();
  const [objets, setObjets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const chargerObjets = async () => {
      setObjets(await getData(location.pathname))
    };
>>>>>>> cfe2770e9702f532ac3fe47b04f8cfeb62c0f39e

      setObjet(objets);
      console.log(objet);
      
    } catch (erreur) {
      console.error("Erreur de chargement :", erreur.message);
    }
  };
  
  chargerObjets();
  }, [])
  

  return (
    <>
      <section className="afficherObjets">
        {objet.map((item) => (
          <ul className="ListeObjets">
            <li key={item.id} objet={item}>
              <p> nom : {item.libelle}</p>
              <p> prix : {item.prix}</p>
              <p> statut : {item.statut} </p>
            </li>
          </ul>
        ))}
      </section>
    </>
  );
};

export default ListeObjets;