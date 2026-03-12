import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/estilo.css';

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
      <nav className="barra-nav">
        <div className="cont-barra">
          <div className="logo">
            <img src="/img/image.png" alt="logo" />
            <h1>MangasGo</h1>
          </div>

          <ul className="enlaces-nav">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/listar">Listar</Link>
            </li>
            <li>
              <Link to="/formulario">Formulario</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;