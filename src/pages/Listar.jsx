import { useState } from 'react';

export default function Listar() {
  const [items, setItems] = useState([]);

  const handleList = () => {
    // datos simulados
    const mock = [
      { id: 1, nombre: 'Elemento 1' },
      { id: 2, nombre: 'Elemento 2' },
      { id: 3, nombre: 'Elemento 3' }
    ];
    setItems(mock);
  };

  return (
    <div>
      <h2>Lista de datos</h2>
      <button onClick={handleList}>Listar</button>
      {items.length > 0 && (
        <ul>
          {items.map(i => (
            <li key={i.id}>{i.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}