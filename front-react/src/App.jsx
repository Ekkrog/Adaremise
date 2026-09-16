import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import Benevoles from "./Benevoles.jsx";
import ListeObjets from "./ListeObjets.jsx";
import SuiviObjets from "./SuiviObjets.jsx";
import Stats from "./Stats.jsx";
import Objet from "./Objet.jsx";
import Header from "./Header.jsx";
import Vente from "./Vente.jsx";
import './App.css';
import './variables.css';
import NouveauDepot from "./NouveauDepot.jsx";
import logo from './assets/img/logo-la-remise.png';


function Home({benevoleChoisi}) {
    return (
    <>
        
        <div className="accueil">
            <h2>Bonjour <span> {benevoleChoisi}</span></h2>
            <img src={logo}/>
        </div>
    </>
    );
}

export default function App() {
    const [connecte, setConnecte] = useState(JSON.parse(localStorage.getItem("connecte")) ?? false);
    const [benevoleChoisi, setBenevoleChoisi] = useState(localStorage.getItem("benevoleChoisi") ?? 0);
    

    return (
        
        <BrowserRouter>
        <div className="app-shell">

        {
            JSON.parse(localStorage.getItem("connecte")) && 
                <>
                    <Header />
                    <span className="button deco" onClick={() => {
                        localStorage.removeItem("connecte");
                        localStorage.removeItem("benevoleChoisi");
                        localStorage.clear();
                        setBenevoleChoisi(0);
                        setConnecte(false);
                    }}>Se déconnecter</span>
                </>
                
                
        }
            
            <div className="app-content">
            <Routes>
                {JSON.parse(localStorage.getItem("connecte")) && 
                    <>
                        <Route path="/" element={  <Home benevoleChoisi={benevoleChoisi} />  } />
                        <Route path="/objets" element={  <ListeObjets />  } />
                        <Route path="/objets/:id" element={  <SuiviObjets />  } />
                        <Route path="/depot" element={  <NouveauDepot />  } />
                        <Route path="/stats" element={  <Stats />  } />
                        <Route path="/vente" element={  <Vente />  } />
                    </>
                    
                    
                }
                {!JSON.parse(localStorage.getItem("connecte")) && 
                    <Route path="/*" element={<Benevoles connecte={connecte} setConnecte={setConnecte} benevoleChoisi={benevoleChoisi} setBenevoleChoisi={setBenevoleChoisi} /> } />
                }
            </Routes>
            </div>
        </div>
        </BrowserRouter>

    );
}
