import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"; 

export default function Listar() {
  const [items, setItems] = useState([]);
  
  const { getAccessTokenSilently } = useAuth0(); 

  const cargarMangas = async () => {
    try {
      // se obtiene el token de forma silenciosa
      const token = await getAccessTokenSilently();
      
      const res = await axios.get('http://localhost:8081/api/productos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(res.data);
    } catch (error) {
      console.error('Error al obtener los mangas:', error);
    }
  };

  useEffect(() => {
    cargarMangas();
  }, []);

  const handleVenta = async (id) => {
    try {
      
      const token = await getAccessTokenSilently();

      await axios.post(`http://localhost:8081/api/ventas/${id}/1`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('¡Venta procesada! Evento enviado a Kafka.');

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
                <strong>{i.nombre}</strong>
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