import './ServicesScreen.css'

function ServicesScreen() {
  return (
    <div className="services-screen">
      <header>
        <h1>Nuestros Servicios de Desarrollo</h1>
        <p>Soluciones tecnológicas a medida para tu negocio</p>
      </header>

      <section className="services-intro">
        <h2>¿Qué ofrecemos?</h2>
        <p>Desarrollamos soluciones tecnológicas personalizadas utilizando las últimas tecnologías y mejores prácticas del mercado. Nuestro equipo de expertos está listo para llevar tu proyecto al siguiente nivel.</p>
      </section>

      <section className="services-list">
        <div className="service-detail">
          <div className="service-icon">🌐</div>
          <h3>Desarrollo Web Frontend</h3>
          <p>Creamos interfaces de usuario modernas, responsive y optimizadas utilizando React, Vue.js, Angular y las últimas tecnologías web.</p>
          <ul className="tech-stack">
            <li>React.js / Next.js</li>
            <li>Vue.js / Nuxt.js</li>
            <li>TypeScript</li>
            <li>HTML5 / CSS3 / SASS</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>

        <div className="service-detail">
          <div className="service-icon">⚙️</div>
          <h3>Desarrollo Backend</h3>
          <p>Construcción de APIs robustas y escalables, microservicios y arquitecturas cloud-native para aplicaciones de alto rendimiento.</p>
          <ul className="tech-stack">
            <li>Node.js / Express</li>
            <li>Python / Django / FastAPI</li>
            <li>Java / Spring Boot</li>
            <li>REST / GraphQL APIs</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>

        <div className="service-detail">
          <div className="service-icon">📱</div>
          <h3>Desarrollo de Apps Móviles</h3>
          <p>Aplicaciones móviles nativas e híbridas para iOS y Android con interfaces intuitivas y rendimiento excepcional.</p>
          <ul className="tech-stack">
            <li>React Native</li>
            <li>Flutter</li>
            <li>iOS / Swift</li>
            <li>Android / Kotlin</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>

        <div className="service-detail">
          <div className="service-icon">🗄️</div>
          <h3>Bases de Datos y Cloud</h3>
          <p>Diseño e implementación de bases de datos relacionales y NoSQL, migración y optimización en la nube.</p>
          <ul className="tech-stack">
            <li>PostgreSQL / MySQL</li>
            <li>MongoDB / Redis</li>
            <li>AWS / Azure / GCP</li>
            <li>Docker / Kubernetes</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>

        <div className="service-detail">
          <div className="service-icon">🔒</div>
          <h3>DevOps y CI/CD</h3>
          <p>Automatización de despliegues, integración continua y monitoreo para garantizar la estabilidad de tus aplicaciones.</p>
          <ul className="tech-stack">
            <li>Git / GitHub / GitLab</li>
            <li>Jenkins / GitHub Actions</li>
            <li>Terraform / Ansible</li>
            <li>Monitoring / Logging</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>

        <div className="service-detail">
          <div className="service-icon">🤖</div>
          <h3>Inteligencia Artificial y ML</h3>
          <p>Implementación de soluciones de Machine Learning, procesamiento de lenguaje natural y análisis predictivo.</p>
          <ul className="tech-stack">
            <li>Python / TensorFlow</li>
            <li>PyTorch / Scikit-learn</li>
            <li>NLP / Computer Vision</li>
            <li>AI APIs Integration</li>
          </ul>
          <button className="service-btn">Consultar</button>
        </div>
      </section>

      <section className="process">
        <h2>Nuestro Proceso de Trabajo</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h4>Análisis</h4>
            <p>Entendemos tus necesidades y objetivos</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h4>Planificación</h4>
            <p>Diseñamos la arquitectura y estrategia</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h4>Desarrollo</h4>
            <p>Construimos tu solución con calidad</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h4>Testing</h4>
            <p>Probamos exhaustivamente cada funcionalidad</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h4>Deployment</h4>
            <p>Desplegamos en producción</p>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h4>Soporte</h4>
            <p>Mantenimiento y actualizaciones continuas</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>¿Listo para comenzar tu proyecto?</h2>
        <p>Contáctanos hoy y obtén una consulta gratuita</p>
        <button className="cta-button">Solicitar Cotización</button>
      </section>
    </div>
  )
}

export default ServicesScreen
