import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Benevoles from './Benevoles.jsx'
import Stats from './Stats.jsx'

function Home() {
  return <h2>Accueil</h2>;
}

function About() {
  return <h2>À propos</h2>;
}

export default function App() {
  const  [ connecte, setConnecte ]  = useState(false);
  const  [ benevoleChoisi, setBenevoleChoisi ]  = useState(0);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/suivi-objet">Suivi Objets</Link>
      </nav>
      <Routes>
        <Route path="/" element={ connecte ? <Home /> : <Benevoles connecte={connecte} setConnecte={setConnecte} benevoleChoisi={benevoleChoisi} setBenevoleChoisi={setBenevoleChoisi} /> } />
        <Route path="/suivi-objet" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}
