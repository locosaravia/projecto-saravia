'use client'
import Link from 'next/link';
import styles from './Menu.module.css'; 

const Menu = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li>
          <Link href="/agregar-series">Menu (Agregar Serie)</Link>
        </li>
        <li>
          <Link href="/crear-usuario">Crear Usuario</Link>
        </li>
        <li>
          <Link href="/tabla">Tabla</Link> {/* Añadir enlace de tabla más tarde */}
        </li>
        <li>
          <Link href="/login">Salir</Link> {}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
