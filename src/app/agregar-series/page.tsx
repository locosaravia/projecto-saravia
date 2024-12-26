// src/app/agregar-series/page.tsx
'use client'

import { useState } from 'react';

const AgregarSeries = () => {
  const [nombre, setNombre] = useState('');
  const [capitulos, setCapitulos] = useState('');
  const [fechaEstreno, setFechaEstreno] = useState('');
  const [director, setDirector] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar la serie en Firestore
    console.log({ nombre, capitulos, fechaEstreno, director });
  };

  return (
    <div>
      <h2>Agregar Serie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capítulos:</label>
          <input
            type="number"
            value={capitulos}
            onChange={(e) => setCapitulos(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Estreno:</label>
          <input
            type="date"
            value={fechaEstreno}
            onChange={(e) => setFechaEstreno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarSeries;
