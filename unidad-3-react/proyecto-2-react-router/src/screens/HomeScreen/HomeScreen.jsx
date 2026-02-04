import './HomeScreen.css'

function HomeScreen() {
  return (
    <div className="home-screen">
      <header>
        <h1>Servicios Informáticos Profesionales</h1>
        <p>Soluciones tecnológicas para tu negocio</p>
      </header>

      <section className="services">
        <h2>Nuestros Servicios</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Desarrollo Web</h3>
            <p>Creamos sitios web modernos y responsive adaptados a tus necesidades</p>
          </div>
          <div className="service-card">
            <h3>Mantenimiento de Equipos</h3>
            <p>Servicio técnico especializado para mantener tus equipos en óptimas condiciones</p>
          </div>
          <div className="service-card">
            <h3>Consultoría IT</h3>
            <p>Asesoramiento profesional para optimizar tu infraestructura tecnológica</p>
          </div>
          <div className="service-card">
            <h3>Seguridad Informática</h3>
            <p>Protegemos tu información y sistemas contra amenazas digitales</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>Más de 10 años de experiencia en el sector</li>
          <li>Equipo profesional certificado</li>
          <li>Atención personalizada 24/7</li>
          <li>Precios competitivos</li>
        </ul>
      </section>
    </div>
  )
}

export default HomeScreen
