// src/app/login/page.tsx
'use client'  // Asegúrate de que este archivo esté ejecutándose en el cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Usamos useRouter para redirigir

// Función para simular la verificación del usuario (debería llamarse a Firebase o una base de datos)
const checkUserExists = async (username: string) => {
  // Aquí deberías integrar la lógica para verificar si el usuario existe en tu base de datos
  // En este caso estamos simulando que el usuario 'testUser' existe.
  const existingUsers = ['testUser'];  // Lista simulada de usuarios existentes
  return existingUsers.includes(username);
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si el usuario existe
    const userExists = await checkUserExists(username);

    if (userExists) {
      setErrorMessage('');  // Limpiar cualquier mensaje de error
      router.push('/agregar-serie');  // Redirigir al formulario de agregar serie
    } else {
      setErrorMessage('No puedes pasar, marrano.');  // Mostrar error si el usuario no existe
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
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
