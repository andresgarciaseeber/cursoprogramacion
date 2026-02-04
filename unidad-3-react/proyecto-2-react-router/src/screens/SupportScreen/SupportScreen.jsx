import './SupportScreen.css'

function SupportScreen() {
  return (
    <div className="support-screen">
      <header>
        <h1>Soporte Técnico</h1>
        <p>Estamos aquí para ayudarte</p>
      </header>

      <section className="support-options">
        <h2>Opciones de Soporte</h2>
        <div className="support-grid">
          <div className="support-card">
            <h3>Chat en Línea</h3>
            <p>Atención inmediata a través de nuestro chat</p>
            <button>Iniciar Chat</button>
          </div>
          <div className="support-card">
            <h3>Soporte Telefónico</h3>
            <p>Llámanos al: +54 11 1234-5678</p>
            <button>Llamar Ahora</button>
          </div>
          <div className="support-card">
            <h3>Ticket de Soporte</h3>
            <p>Envía un ticket y te responderemos en 24hs</p>
            <button>Crear Ticket</button>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h4>¿Cuál es el horario de atención?</h4>
            <p>Nuestro servicio de soporte está disponible 24/7 los 365 días del año.</p>
          </div>
          <div className="faq-item">
            <h4>¿Cuánto tiempo tardan en responder?</h4>
            <p>Los tickets son respondidos en un máximo de 24 horas hábiles.</p>
          </div>
          <div className="faq-item">
            <h4>¿Ofrecen soporte remoto?</h4>
            <p>Sí, ofrecemos soporte remoto para resolver problemas sin necesidad de visitas presenciales.</p>
          </div>
        </div>
      </section>

      <section className="emergency">
        <h2>¿Emergencia?</h2>
        <p>Para asistencia urgente, contacta nuestro servicio de emergencias</p>
        <button className="emergency-button">Soporte de Emergencia</button>
      </section>
    </div>
  )
}

export default SupportScreen
