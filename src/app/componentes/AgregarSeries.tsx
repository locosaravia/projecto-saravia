'use client'
import { useState } from 'react';
import { addSeries } from '../firebase/promesas'; // Asegúrate de que esta función esté definida en 'promesas.ts'

const AgregarSerie = () => {
  const [nombre, setNombre] = useState('');
  const [capitulos, setCapitulos] = useState<number | string>(''); // Número de capítulos
  const [fechaEstreno, setFechaEstreno] = useState('');
  const [director, setDirector] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica para asegurarse de que todos los campos estén llenos
    if (!nombre || !capitulos || !fechaEstreno || !director) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Llamamos a la función para agregar la serie a Firestore
      await addSeries(nombre, capitulos, fechaEstreno, director);
      setSuccess('Serie agregada exitosamente.');
      // Limpiar los campos después de enviar
      setNombre('');
      setCapitulos('');
      setFechaEstreno('');
      setDirector('');
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error al agregar la serie.');
    }
  };

  return (
    <div>
      <h2>Agregar Serie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="capitulos">Capítulos:</label>
          <input
            type="number"
            id="capitulos"
            value={capitulos}
            onChange={(e) => setCapitulos(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fechaEstreno">Fecha de Estreno:</label>
          <input
            type="date"
            id="fechaEstreno"
            value={fechaEstreno}
            onChange={(e) => setFechaEstreno(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Serie</button>
      </form>
    </div>
  );
};

export default AgregarSerie;
