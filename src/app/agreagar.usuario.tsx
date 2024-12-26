// crear-usuario.tsx
import CrearUsuario from "./componentes/CrearUsuario";
import Menu from "./componentes/Menu";

const CrearUsuarioPage = () => {
  return (
    <div>
      <Menu /> {/* Incluir el menú en esta página */}
      <h1>Formulario de Crear Usuario</h1>
      <CrearUsuario />
    </div>
  );
};

export default CrearUsuarioPage;
