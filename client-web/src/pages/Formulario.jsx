import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"; // <-- Importar Auth0

export default function Formulario() {
  const [form, setForm] = useState({
    nombre: '',
    cantidad: '',
    precio: ''
  });
  const [enviado, setEnviado] = useState(false);
  
  const { getAccessTokenSilently } = useAuth0();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const nuevoManga = {
        nombre: form.nombre,
        precio: parseInt(form.precio), 
        stock: parseInt(form.cantidad) 
      };

      const token = await getAccessTokenSilently();
      console.log("Mi token es:", token); //para revisar si el token esta bien

      await axios.post('http://localhost:8081/api/productos', nuevoManga, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Manga guardado en BD:', nuevoManga);
      setEnviado(true);
      
      setForm({ nombre: '', cantidad: '', precio: '' });
      
      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
    }
  }; 

  return (
    <div className="cont-pag">
      <h2>Subir Manga</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>
            Nombre:
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo">
          <label>
            Cantidad (Stock):
            <input
              name="cantidad"
              type="number"
              value={form.cantidad}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo">
          <label>
            Precio:
            <input
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="boton">Enviar</button>
      </form>
      {enviado && <p className="exito">¡Manga agregado exitosamente!</p>}
    </div>
  );
}