import './ContactScreen.css'

function ContactScreen() {
  return (
    <div className="contact-screen">
      <header>
        <h1>Contacto</h1>
        <p>Ponte en contacto con nosotros</p>
      </header>

      <section className="contact-form">
        <h2>Envíanos un Mensaje</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input type="text" id="name" name="name" placeholder="Tu nombre" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="tu@email.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" placeholder="+54 11 1234-5678" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <select id="subject" name="subject">
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta General</option>
              <option value="cotizacion">Solicitar Cotización</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </div>

          <button type="submit">Enviar Mensaje</button>
        </form>
      </section>

      <section className="contact-info">
        <h2>Información de Contacto</h2>
        <div className="info-grid">
          <div className="info-item">
            <h3>Dirección</h3>
            <p>Av. Corrientes 1234, CABA<br/>Buenos Aires, Argentina</p>
          </div>
          <div className="info-item">
            <h3>Teléfono</h3>
            <p>+54 11 1234-5678<br/>+54 11 8765-4321</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>info@serviciosinformaticos.com<br/>soporte@serviciosinformaticos.com</p>
          </div>
          <div className="info-item">
            <h3>Horarios</h3>
            <p>Lunes a Viernes: 9:00 - 18:00<br/>Sábados: 9:00 - 13:00</p>
          </div>
        </div>
      </section>

      <section className="map">
        <h2>Nuestra Ubicación</h2>
        <div className="map-placeholder">
          <p>[Mapa de ubicación]</p>
        </div>
      </section>
    </div>
  )
}

export default ContactScreen
