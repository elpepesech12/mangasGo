import { useState } from 'react';

export default function Formulario() {
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Formulario enviado', form);
    setEnviado(true);
    // aquí pondrás el fetch/axios POST cuando conectes la API
  };

  return (
    <div>
      <h2>Formulario de creación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {enviado && <p>Datos enviados. Mira la consola.</p>}
    </div>
  );
}