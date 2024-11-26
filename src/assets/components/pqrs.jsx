import "../styles/Forms.style.css"
import React, { useState } from 'react';

const PQRSForm = () => {
  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar el formulario a un servidor
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
  };

  return (
    <div className="pqrs-form">
      <h2>Formulario de PQRS</h2>
      {submitted ? (
        <div className="confirmation">
          <h3>Gracias por enviarnos tu mensaje</h3>
          <p>Te responderemos lo antes posible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo de PQRS:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="pregunta">Pregunta</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default PQRSForm;
