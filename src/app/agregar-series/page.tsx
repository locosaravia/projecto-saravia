'use client';
import { useState } from 'react';
import { addSerie } from '../firebase/promesas';
import Menu from '../componentes/Menu';
import styles from '../componentes/AgregarSerie.module.css'

const AgregarSerie = () => {
  const [nombre, setNombre] = useState('');
  const [capitulos, setCapitulos] = useState('');
  const [fechaEstreno, setFechaEstreno] = useState('');
  const [director, setDirector] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !capitulos || !fechaEstreno || !director) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    const response = await addSerie(nombre, parseInt(capitulos), fechaEstreno, director);
    if (response.success) {
      setMensaje('Serie agregada exitosamente.');
      setNombre('');
      setCapitulos('');
      setFechaEstreno('');
      setDirector('');
    } else {
      setMensaje(`Error: ${response.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Menu />
      <h1 className={styles.title}>Agregar Serie</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la serie"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número de capítulos"
          value={capitulos}
          onChange={(e) => setCapitulos(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha de estreno"
          value={fechaEstreno}
          onChange={(e) => setFechaEstreno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <button type="submit">Agregar Serie</button>
      </form>
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
    </div>
  );
};

export default AgregarSerie;
