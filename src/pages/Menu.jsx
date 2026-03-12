import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Menú principal</h2>
      <Link to="/listar">
        <button>Ir a Listar</button>
      </Link>{' '}
      <Link to="/formulario">
        <button>Ir a Formulario</button>
      </Link>
    </div>
  );
}