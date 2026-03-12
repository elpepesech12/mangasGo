import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Listar() {
  const [items, setItems] = useState([]);

  // Petición GET para traer todos los mangas de la BD
  const cargarMangas = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/productos');
      setItems(res.data);
    } catch (error) {
      console.error('Error al obtener los mangas:', error);
    }
  };

  // Se ejecuta al entrar a la página
  useEffect(() => {
    cargarMangas();
  }, []);

  // Petición POST a la venta para disparar el evento Kafka
  const handleVenta = async (id) => {
    try {
      // Se descuenta 1 unidad por cada clic
      await axios.post(`http://localhost:8081/api/venta/${id}/1`);
      
      // Opcional: una alerta amigable
      alert('¡Venta procesada! Evento enviado a Kafka.');

      // Le damos 1 segundo al ServicioKafka para que reste el stock y recargamos
      setTimeout(() => {
        cargarMangas();
      }, 1000);
    } catch (error) {
      console.error('Error al realizar la venta:', error);
    }
  };

  return (
    <div className="cont-pag">
      <h2>Lista de Mangas en Inventario</h2>
      <button className="boton" onClick={cargarMangas} style={{ marginBottom: '20px' }}>
        Refrescar Inventario
      </button>
      
      {items.length > 0 ? (
        <ul className="lista">
          {items.map(i => (
            <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <strong>{i.nombre}</strong> <span style={{ color: '#666', fontSize: '0.9em' }}>({i.categoria})</span>
                <br />
                Precio: ${i.precio} | Stock: {i.stock}
              </div>
              <button 
                className="boton" 
                onClick={() => handleVenta(i.id)}
                disabled={i.stock <= 0}
              >
                {i.stock > 0 ? 'Vender 1' : 'Agotado'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay mangas registrados en la base de datos.</p>
      )}
    </div>
  );
}