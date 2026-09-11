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

    chargerObjets();
  }, []);

  const categoriesActives = searchParams.getAll("categorie");
  const statutActif = searchParams.get("statut") || "tous";

  const objetsFiltres = objets.filter((item) => {
    
    const aucuneCategorieSelectionnee = categoriesActives.length === 0
    const categorieSelectionnee = categoriesActives.includes(item.categorie);
    const matchCategorie = aucuneCategorieSelectionnee || categorieSelectionnee
    
    const matchStatut = statutActif === "tous" || item.statut === statutActif; 
    return matchCategorie && matchStatut;
  });

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