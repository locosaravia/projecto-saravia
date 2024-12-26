'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Menu from '../componentes/Menu';

const Tabla = () => {
  const [series, setSeries] = useState([]);
  const [editingSerie, setEditingSerie] = useState(null);

  const seriesCollection = collection(db, 'series');

  const fetchSeries = async () => {
    const snapshot = await getDocs(seriesCollection);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSeries(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'series', id));
    setSeries(series.filter((serie) => serie.id !== id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'series', editingSerie.id);
    await updateDoc(docRef, {
      nombre: editingSerie.nombre,
      capitulos: editingSerie.capitulos,
      fechaEstreno: editingSerie.fechaEstreno,
      director: editingSerie.director,
    });
    setEditingSerie(null);
    fetchSeries();
  };

  const handleChange = (e) => {
    setEditingSerie({
      ...editingSerie,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div>
      <Menu />
      <h2>Tabla de Series</h2>
      {editingSerie && (
        <form onSubmit={handleUpdate}>
          <h3>Actualizar Serie</h3>
          <input
            type="text"
            name="nombre"
            value={editingSerie.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="number"
            name="capitulos"
            value={editingSerie.capitulos}
            onChange={handleChange}
            placeholder="Capítulos"
            required
          />
          <input
            type="date"
            name="fechaEstreno"
            value={editingSerie.fechaEstreno}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="director"
            value={editingSerie.director}
            onChange={handleChange}
            placeholder="Director"
            required
          />
          <button type="submit" style={{ backgroundColor: 'green', color: 'white', margin: '5px' }}>
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setEditingSerie(null)}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancelar
          </button>
        </form>
      )}
      <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capítulos</th>
            <th>Fecha de Estreno</th>
            <th>Director</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {series.map((serie) => (
            <tr key={serie.id}>
              <td>{serie.nombre}</td>
              <td>{serie.capitulos}</td>
              <td>{serie.fechaEstreno}</td>
              <td>{serie.director}</td>
              <td>
                <button
                  style={{ backgroundColor: 'pink', margin: '5px' }}
                  onClick={() => handleDelete(serie.id)}
                >
                  Eliminar
                </button>
                <button
                  style={{ backgroundColor: 'green', color: 'white', margin: '5px' }}
                  onClick={() => setEditingSerie(serie)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
