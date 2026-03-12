import { useState } from 'react';
import axios from 'axios';

export default function Formulario() {
  const [form, setForm] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    categoria: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Armamos el objeto tal como lo espera Producto.java
      const nuevoManga = {
        nombre: form.nombre,
        categoria: form.categoria,
        precio: parseInt(form.precio), // Tu Java espera un int
        stock: parseInt(form.cantidad) // "cantidad" del React viaja como "stock" al backend
      };

      // POST al backend en el puerto 8081
      await axios.post('http://localhost:8081/api/productos', nuevoManga);
      
      console.log('Manga guardado en BD:', nuevoManga);
      setEnviado(true);
      
      // Limpiamos el formulario
      setForm({ nombre: '', cantidad: '', precio: '', categoria: '' });
      
      // Ocultamos el mensaje después de 3 segundos
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
        <div className="campo">
          <label>
            Categoría:
            <input
              name="categoria"
              type="text"
              value={form.categoria}
              onChange={handleChange}
              placeholder="ej: Shonen, Seinen, Manhwa"
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