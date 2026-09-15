import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GraphiqueHeures = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const chargerHeures = async () => {
      const reponse = await fetch("http://localhost:3000/api/stats/heures");
      const mes_data = await reponse.json();
      setData(mes_data);
    };

    chargerHeures();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="mois_annee" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="nombre_heures" name="Nombre d'heures par mois" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphiqueHeures;