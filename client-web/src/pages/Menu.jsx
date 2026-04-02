import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="inicio">
      <h2>Menú principal</h2>
      <div className="botones">
        <Link to="/listar">
          <button className="boton">Ir a Listar</button>
        </Link>
        <Link to="/formulario">
          <button className="boton">Ir a Formulario</button>
        </Link>
      </div>
    </div>
  );
}