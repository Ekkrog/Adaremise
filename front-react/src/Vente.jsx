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
    const [total, setTotal] = useState(0);
    const [avendre, setAvendre] = useState([{}]);
    const [nouveauPrix, setNouveauPrix] = useState(null);
    const [creer, setCreer] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [modePaiement, setModePaiement] = useState('');
    const [erreurs, setErreurs] = useState({});
    const [messageSucces, setMessageSucces] = useState("");

    useEffect(() => {
        const chargerDonnees = async () => {
            const clients = await getData("/personnes/");
            setListeClients(clients);

            const artAVendre = await getData("/objets?statut=en_rayon");
            setAvendre(await artAVendre);
            panier.forEach(p => {
                setAvendre([...avendre.filter(item => item !== p)])
            })
        };

        chargerDonnees();
    }, [client, panier]);

    const ajouterClient = async () => {
        const nouvellesErreurs = {};

        if (!nom.trim()) nouvellesErreurs.nom = "Nom requis";
        if (!prenom.trim()) nouvellesErreurs.prenom = "Prénom requis";
        if (tel && !/^[0-9+ .-]{6,20}$/.test(tel.trim())) {
            nouvellesErreurs.tel = "Téléphone invalide";
        }

        setErreurs(nouvellesErreurs);
        if (Object.keys(nouvellesErreurs).length > 0) return;

        const newClient = tel.trim() !== ""
            ? { nom: nom.trim(), prenom: prenom.trim(), telephone: tel.trim() }
            : { nom: nom.trim(), prenom: prenom.trim() };

        const addClient = await getData("/personnes/", "POST", newClient);
        setClient(addClient);
        setCreer(false);
        setErreurs({});
    };

    const ajouterAuPanier = (objet) => {
        const nouvellesErreurs = {};

        if (nouveauPrix !== null && nouveauPrix !== "" && (isNaN(Number(nouveauPrix)) || Number(nouveauPrix) < 0)) {
            nouvellesErreurs.prix = "Prix invalide";
        }

        setErreurs(nouvellesErreurs);
        if (Object.keys(nouvellesErreurs).length > 0) return;

        const prixFinal = nouveauPrix !== null && nouveauPrix !== ""
            ? Number(nouveauPrix)
            : Number(objet.prix);

        const panierTempo = panier;
        setPanier([
            ...panierTempo,
            { id: objet.id, libelle: objet.libelle, prix: prixFinal },
        ]);
        setAvendre([...avendre.filter(item => item !== objet)]);
        setTotal(total + prixFinal);
        setNouveauPrix(null);
        setErreurs({});
    };

    const validerAchat = () => {
        const nouvellesErreurs = {};

        if (!client.id) nouvellesErreurs.client = "Sélectionnez un client";
        if (!modePaiement) nouvellesErreurs.modePaiement = "Sélectionnez un mode de paiement";
        if (panier.length === 0) nouvellesErreurs.panier = "Le panier est vide";

        setErreurs(nouvellesErreurs);
        if (Object.keys(nouvellesErreurs).length > 0) return;

        const date = new Date().toJSON();
        const data = { date: date, mode_paiement: modePaiement };
        const maVente = getData('/ventes', 'POST', data);

        panier.forEach(p => {
            const data = { id: p.id, prix_paye: p.prix, vente_id: maVente.id, statut: 'vendu' };
            getData('/ventes', 'PATCH', data);
        });

        setPanier([]);
        setTotal(0);
        setClient({});
        setCreer(false);
        setErreurs({});
        setMessageSucces("Vente finalisée avec succès !");
        setTimeout(() => setMessageSucces(""), 3000);
    };

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
                                                <option key={c.id} value={c.id} >
                                                    {c.nom + " " + c.prenom}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {erreurs.client && <p className="erreur-champ">{erreurs.client}</p>}

                                    <span
                                        className="button tiny"
                                        onClick={() => {
                                            setCreer(true);
                                            setErreurs({});
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
                                <input placeholder="Nom Requis" value={nom} onChange={(e) => setNom(e.target.value)} />
                                {erreurs.nom && <p className="erreur-champ">{erreurs.nom}</p>}

                                <label>Prénom : </label>
                                <input placeholder="Prénom Requis" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                {erreurs.prenom && <p className="erreur-champ">{erreurs.prenom}</p>}

                                <label>Numéro de téléphone : </label>
                                <input placeholder="Optionnel" value={tel} onChange={(e) => setTel(e.target.value)} />
                                {erreurs.tel && <p className="erreur-champ">{erreurs.tel}</p>}

                                <span className="button" onClick={ajouterClient}>
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
                                                    setNouveauPrix(e.target.value);
                                                }}
                                            />
                                            {erreurs.prix && <p className="erreur-champ">{erreurs.prix}</p>}
                                        </p>
                                        <span
                                            className="button tiny"
                                            onClick={() => ajouterAuPanier(objet)}
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
                    {erreurs.panier && <p className="erreur-champ">{erreurs.panier}</p>}
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
                        {client.adherente === true ? <li>Réduction adhérent 20%</li> : ''}
                        <li>
                            Total Panier : {client.adherente === true ? Number.parseFloat(total * 0.8).toFixed(2) : Number.parseFloat(total).toFixed(2)}€
                        </li>
                        <li>
                            <select className="select" value={modePaiement} onChange={e => setModePaiement(e.target.value)}>
                                <option value="">-- Sélectionner le mode de paiement --</option>
                                <option value="especes">Espèces</option>
                                <option value="carte">Carte bancaire</option>
                                <option value="cheque">Chèque</option>
                            </select>
                            {erreurs.modePaiement && <p className="erreur-champ">{erreurs.modePaiement}</p>}
                        </li>
                        <li>
                            {messageSucces && <p className="succes">{messageSucces}</p>}
                            <span className="button" onClick={validerAchat}>Valider achat</span>
                        </li>

                    </ul>
                </section>
            </div>
        </>
    );
}

export default Vente;