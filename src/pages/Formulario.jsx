import { useState } from 'react';

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

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Formulario enviado', form);
    setEnviado(true);
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
            />
          </label>
        </div>
        <div className="campo">
          <label>
            Cantidad:
            <input
              name="cantidad"
              type="number"
              value={form.cantidad}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="campo">
          <label>
            Precio:
            <input
              name="precio"
              type="number"
              step="0.01"
              value={form.precio}
              onChange={handleChange}
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
              placeholder="ej: Manga, Manhua, Manhwa"
            />
          </label>
        </div>
        <button type="submit" className="boton">Enviar</button>
      </form>
      {enviado && <p className="exito">¡Manga agregado exitosamente!</p>}
    </div>
  );
}