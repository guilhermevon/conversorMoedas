import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">💱 ConVersor</div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#">Empresa</a>
          <a href="#">Plataforma</a>
          <a href="#">Preços</a>
          <a href="#">Ajuda</a>
        </nav>

        <div className="nav-actions">
          <button className="btn">Entrar</button>
          <button className="btn-outline">Criar conta</button>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
