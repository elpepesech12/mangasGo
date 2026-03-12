import { useState } from 'react';

export default function Listar() {
  const [items, setItems] = useState([]);

  const handleList = () => {
    const mock = [
      { id: 1, nombre: 'Manga 1' },
      { id: 2, nombre: 'Manga 2' },
      { id: 3, nombre: 'Manga 3' }
    ];
    setItems(mock);
  };

  return (
    <div className="cont-pag">
      <h2>Lista de Mangas</h2>
      <button className="boton" onClick={handleList}>Listar</button>
      {items.length > 0 && (
        <ul className="lista">
          {items.map(i => (
            <li key={i.id}>{i.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
