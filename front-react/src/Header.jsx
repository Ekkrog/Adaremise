import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './Header.css';
import './variables.css';
import logo from './assets/img/logo-la-remise.png';


export default function App() {
    
    return (
        <>
            <nav>
                <img className="logo" src={logo} />
                <Link className="link" to="/">Accueil</Link>
                <Link className="link" to="/objets">Liste Objets</Link>
                <Link className="link" to="/depot">Effectuer un Dépôt</Link>
                <Link className="link" to="/stats">Stats</Link>
                <Link className="link red" to="/vente">Vente</Link>
                <Link className="link" to="/benevoles/gestion">Bénévoles</Link>
            </nav>
        </>
            

    );
}
