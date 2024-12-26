'use client'

import { useState } from 'react';
import { registerUser } from '../firebase/promesas'; // Asegúrate de usar la función de registro
import Menu from '../componentes/Menu'; // Importa el menú superior

const CrearUsuario = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!username || !password) {
      setErrorMessage('Por favor, ingresa un nombre de usuario y una contraseña');
      return;
    }


    try {
      const userRegistered = await registerUser(username, password);

      if (userRegistered) {
        setSuccessMessage('Usuario registrado con éxito');
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage('El usuario ya existe o hubo un error al registrar el usuario');
      }
    } catch (error) {
      setErrorMessage('Hubo un error al intentar registrar el usuario');
    }
  };

  return (
    <>
      {}
      <Menu />

      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </>
  );
};

export default CrearUsuario;
