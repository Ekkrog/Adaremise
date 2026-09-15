import React, { useEffect } from "react";
import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
    useLocation,
} from "react-router-dom";
import { getData } from "./assets/utils.js";
import "./Vente.css";
import Objet from "./Objet.jsx";

function Vente() {
    const [panier, setPanier] = useState([]);
    const [client, setClient] = useState({});
    const [listeClients, setListeClients] = useState([]);
    const [article, setArticle] = useState();
    const [total, setTotal] = useState(0);
    const [avendre, setAvendre] = useState([{}]);
    const [nouveauPrix, setNouveauPrix] = useState(null);
    const [creer, setCreer] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [modePaiement, setModePaiement] = useState('');

    useEffect(() => {
        const chargerDonnees = async () => {
            const clients = await getData("/personnes/");
            //console.log(clients);
            setListeClients(clients);

            const artAVendre = await getData("/objets?statut=en_rayon");
            setAvendre(await artAVendre);
            panier.forEach(p => {
                setAvendre([...avendre.filter(item => item !== p)])
            })
        };

        chargerDonnees();
    }, [client, panier]);

    return (
        <>
            <div className="layout">
                <div className="contenu">
                    <section className="formulaire">
                        {!creer && (
                            <>
                                <div>
                                    <select className="select" onChange={e => setClient(listeClients[e.target.value - 1])}>
                                        <option value={''}>-- Sélectionner le client --</option>
                                        {listeClients.map((c) => {
                                            return c.id === client.id ? (
                                                <option key={c.id} value={c.id} selected >
                                                    {c.nom + " " + c.prenom}
                                                </option>
                                            ) : (
                                                <option key={c.id} value={ c.id } >
                                                    {c.nom + " " + c.prenom}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    <span
                                        className="button tiny"
                                        onClick={() => {
                                            setCreer(true);
                                        }}
                                    >
                                        ✙
                                    </span>
                                </div>
                            </>
                        )}
                        {creer && (
                            <>
                                <label>Nom : </label>
                                <input placeholder="Nom Requis" onChange={(e) => setNom(e.target.value)} required />
                                <label>Prénom : </label>
                                <input placeholder="Prénom Requis" onChange={(e) => setPrenom(e.target.value)} required />
                                <label>Numéro de téléphone : </label>
                                <input placeholder="Optionnel" onChange={(e) => setTel(e.target.value)} />
                                <span className="button" onClick={
                                        async () => { const newClient = tel != ""  ? { nom: nom, prenom: prenom, telephone: tel, } : { nom: nom, prenom: prenom };
                                        console.log(newClient);
                                        const addClient = await getData("/personnes/", "POST", newClient);
                                        const ajouterClient = (x) => {  setClient(x); };
                                        ajouterClient(addClient);
                                        setCreer(!creer);
                                    }}
                                >
                                    Ajouter nouveau client
                                </span>
                            </>
                        )}
                    </section>
                    <section className="formulaire">
                        <section className="listeArticles">
                            {avendre.map((objet) => {
                                
                                return (
                                    <article
                                        key={objet.id}
                                        className="articleObjet"
                                    >
                                        <h3>{objet.libelle}</h3>
                                        <p>
                                            <label>
                                                Prix actuel : {objet.prix}
                                            </label>
                                        </p>
                                        <p>
                                            <label>Nouveau prix : </label>
                                            <input
                                                placeholder="Petite ristourne ?"
                                                onChange={(e) => {
                                                    setNouveauPrix(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </p>
                                        <span
                                            className="button tiny"
                                            onClick={() => {
                                                const panierTempo = panier;
                                                setPanier([
                                                    ...panierTempo,
                                                    nouveauPrix != null
                                                        ? {
                                                              id: objet.id,
                                                              libelle:
                                                                  objet.libelle,
                                                              prix: nouveauPrix,
                                                            }
                                                        : {
                                                              id: objet.id,
                                                              libelle:
                                                                  objet.libelle,
                                                              prix: objet.prix,
                                                          },
                                                ]);
                                                setAvendre([...avendre.filter(item => item !== objet)])
                                                const nouveauTotal = total;
                                                setTotal(
                                                    nouveauTotal +
                                                        (nouveauPrix != null
                                                            ? Number(
                                                                  nouveauPrix,
                                                              )
                                                            : Number(
                                                                  objet.prix,
                                                              )),
                                                );
                                                setNouveauPrix(null);
                                            }}
                                        >
                                            🧺
                                        </span>
                                    </article>
                                );
                            })}
                        </section>
                    </section>
                </div>

                <section className="panier">
                    <ul className="overflow">
                        {panier.map((p) => {
                            
                            return (
                                <li key={p.id}>
                                    {p.libelle} --- {p.prix} 
                                    <span className="button tiny" onClick={() => {
                                        const totalTempo = total - p.prix;
                                        setTotal(totalTempo);
                                        setPanier([...panier.filter(item => item !== p)]);
                                        setAvendre([...avendre, p])
                                    }}>❌</span>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="bottom">
                        {client.adherente === true ? <li>Réduction adhérent 20%</li> : ''  }
                        <li>
                            Total Panier : {client.adherente === true ? Number.parseFloat(total * 0.8).toFixed(2) : Number.parseFloat(total).toFixed(2)}€
                        </li>
                        <li>
                            <select className="select" onChange={e => setModePaiement(e.target.value)} required>
                                <option value="">-- Sélectionner le mode de paiement --</option>
                                <option value="especes">Espèces</option>
                                <option value="carte">Carte bancaire</option>
                                <option value="cheque">Chèque</option>
                            </select>
                        </li>
                        <li>
                            <span className="button" onClick={() => {
                                const date = new Date().toJSON();

                                const data = {date:date, mode_paiement:modePaiement};
                                const maVente = getData('/ventes', 'POST', data);

                                panier.forEach(p => {
                                    const data = {id:p.id, prix_paye:p.prix, vente_id:maVente.id, statut:'vendu' }

                                    const update = getData('/ventes', 'PATCH', data);
                                })
                                setPanier([]);
                                setTotal(0);
                                setClient({});
                                setCreer(false);

                            }}>Valider achat</span>
                        </li>
                    </ul>
                </section>
            </div>
        </>
    );
}

export default Vente;
