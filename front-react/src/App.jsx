import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import Benevoles from "./Benevoles.jsx";
import ListeObjets from "./ListeObjets.jsx";
import SuiviObjets from "./SuiviObjets.jsx";
import Stats from "./Stats.jsx";


function Home({benevoleChoisi}) {
    return <h2>Bonjour {benevoleChoisi}</h2>;
}

function About() {
    return <h2>À propos</h2>;
}


export default function App() {
    const [connecte, setConnecte] = useState(false);
    const [benevoleChoisi, setBenevoleChoisi] = useState(0);
    
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Accueil</Link> |{" "}
                <Link to="/objets">Liste Objets |{" "}</Link>
                <Link to="/objets/1">Suivi Objets |{" "}</Link>
                <Link to="/stats">Stats</Link>
            </nav>
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
