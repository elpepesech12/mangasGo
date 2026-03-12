import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/estilo.css'; // crea este fichero si no existe

function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('usuario');
    if (u) setUsuario(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login-registro');
    window.location.reload();
  };

  return (
    <header>
      <nav className="navbar">
        <div className="contenedor-nav">
          <div className="nav-logo" id="logo">
            {/* ajusta la ruta de la imagen a la carpeta public o importa */}
            <img src="/img/logo.png" alt="logo" />
            <h1>U Can Save</h1>
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/listar" className="nav-link">Listar</Link>
            </li>
            <li className="nav-item">
              <Link to="/formulario" className="nav-link">Formulario</Link>
            </li>
            {/* resto de enlaces de ejemplo… */}
          </ul>


        </div>
      </nav>
    </header>
  );
}

export default Navbar;