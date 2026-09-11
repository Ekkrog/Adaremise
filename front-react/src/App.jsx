import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import Benevoles from "./Benevoles.jsx";
import ListeObjets from "./ListeObjets.jsx";
import SuiviObjets from "./SuiviObjets.jsx";
import Stats from "./Stats.jsx";
import Objet from "./Objet.jsx";
import Header from "./Header.jsx";
import './App.css';
import './variables.css';


function Home({benevoleChoisi}) {
    return <div className="accueil"><h2>Bonjour <span> {benevoleChoisi}</span></h2></div>;
}

export default function App() {
    const [connecte, setConnecte] = useState(false);
    const [benevoleChoisi, setBenevoleChoisi] = useState(0);
    
    return (
        
        <BrowserRouter>

        {
            connecte && 
                <Header />
        }
            
            <Routes>
                {connecte && 
                    <>
                        <Route path="/" element={  <Home benevoleChoisi={benevoleChoisi} />  } />
                        <Route path="/objets" element={  <ListeObjets />  } />
                        <Route path="/objets/:id" element={  <SuiviObjets />  } />
                        <Route path="/stats" element={  <Stats />  } />
                    </>
                    
                    
                }
                {!connecte && 
                    <Route path="/*" element={<Benevoles connecte={connecte} setConnecte={setConnecte} benevoleChoisi={benevoleChoisi} setBenevoleChoisi={setBenevoleChoisi} /> } />
                }
            </Routes>
        </BrowserRouter>

    );
}
