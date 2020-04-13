import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const UCLM_LOGO = "https://www.uclm.es/images/logos/Logo_uclm.png";

const Header = () => (
  <div className="Header">
    <div className="Header-line"></div>
    <div className="container">
      <div className="Logo-wrapper">
        <img className="Logo" src={UCLM_LOGO} alt="Logo" />
      </div>
      <div className="Menu">
        <Link to="/">Inicio</Link>
        <Link to="/planificador">Planificador</Link>
        <Link to="/asignaturas">Asignaturas</Link>
      </div>
    </div>
  </div>
);

export default Header;
