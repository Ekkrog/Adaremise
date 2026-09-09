import { useEffect, useState } from "react";
import Objet from "./Objet.jsx"

function ListeObjets() {
  const [objet, setObjet] = useState([]);

  useEffect(() => {
    const chargerObjets = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/objets");
      const objets = await reponse.json();

      setObjet(objets);
      console.log(objet);
    } catch (erreur) {
      console.error("Erreur de chargement :", erreur.message);
    }
  };
  
  chargerObjets();
  }, [])



  return (
      <Objet objets={objet}/>
  );
}

export default ListeObjets;
