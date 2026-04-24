import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => document.body.classList.contains('dark-theme'))

  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme')
    setDark(d => !d)
  }

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img className="logo" src="/assets/logo.png" alt="Curelex" />
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#contact">Contact Us</a></li>
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas fa-${dark ? 'sun' : 'moon'}`}></i>
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  )
}