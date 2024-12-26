// src/app/componentes/Menu.tsx
'use client'
// src/app/componentes/Menu.tsx
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // Para obtener la ruta actual
import styles from './Menu.module.css'; 

const Menu = () => {
  const pathname = usePathname();

  // Si estamos en la página de login, no mostrar el menú
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li>
          <Link href="/agregar-serie">Menu (Agregar Serie)</Link>
        </li>
        <li>
          <Link href="/crear-usuario">Crear Usuario</Link>
        </li>
        <li>
          <Link href="/tabla">Tabla</Link>
        </li>
        <li>
          <Link href="/login">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
