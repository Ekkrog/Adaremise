function Objet({ objet }) {
  return (
    <li>
      <p>nom : {objet.libelle}</p>
      <p>prix : {objet.prix}</p>
      <p>statut : {objet.statut}</p>
    </li>
  );
}

export default Objet;