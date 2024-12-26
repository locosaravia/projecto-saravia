
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../firebase/promesas';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userExists = await loginUser(username, password);

      if (userExists) {
        router.push('/agregar-series');
      } else {
        setErrorMessage('No puedes pasar, marrano');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus datos.');
    }
  };

  return (
    <>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar sesión</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default Login;
