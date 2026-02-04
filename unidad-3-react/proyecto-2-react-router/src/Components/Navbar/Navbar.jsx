import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💻</span>
          <span className="logo-text">IT Services</span>
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Inicio</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services" className="navbar-link">Servicios</Link>
          </li>
          <li className="navbar-item">
            <Link to="/support" className="navbar-link">Soporte</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
