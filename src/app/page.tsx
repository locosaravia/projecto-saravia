// src/app/login/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';

// Función para verificar si el usuario existe y la contraseña es correcta en Firebase
const checkUserExists = async (username: string, password: string) => {
  const usersCollection = collection(db, 'users');  // Asegúrate de que la colección de usuarios se llame 'users' (no 'series')
  const q = query(usersCollection, where('username', '==', username));  // Query para buscar el usuario por nombre

  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];  // Tomamos el primer documento de la consulta

  if (userDoc) {
    const userData = userDoc.data();
    return userData.password === password;  // Compara la contraseña almacenada con la ingresada
  }

  return false;  // Si no se encuentra el usuario
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si el usuario y la contraseña son correctos
    const userExists = await checkUserExists(username, password);

    if (userExists) {
      setErrorMessage('');  // Limpiar el mensaje de error
      router.push('/agregar-serie');  // Redirigir al formulario de agregar serie (verifica que esta ruta sea correcta)
    } else {
      setErrorMessage('No puedes pasar, marrano.');  // Mostrar mensaje de error si el usuario o la contraseña son incorrectos
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
