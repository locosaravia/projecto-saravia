'use client';  // Directiva para marcar este componente como un componente de cliente

import { useState } from 'react';
import { registerUser } from '../firebase/promesas';

const CrearUsuario = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      await registerUser(username, password);
      setSuccess('Usuario creado con éxito.');
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error inesperado');
    }
  };

  return (
    <div>
      <h2>Crear un nuevo usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
