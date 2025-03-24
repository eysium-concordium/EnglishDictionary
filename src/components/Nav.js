import React from 'react';
import { NavLink } from 'react-router';
import './Navbar.css';

const labelstyleLight = {
  fontWeight: "500",
  color:"black"
}
const labelstyleDark = {
  fontWeight: "500",
  color:"white"
}

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm`} style={{ padding: "15px 30px" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/" style={{ fontSize: "1.5rem" }}>English Dictionary</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wordoftheday">Word of the Day</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wordsearch">Search Words</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites-history">Favorites</NavLink>
            </li>
          </ul>
        </div>

        <div className="form-check form-switch d-flex mt-2">
          <input className="form-check-input me-2" type="checkbox" id="customSwitch1" onClick={props.toggleMode} />
          <label className="form-check-label" htmlFor="customSwitch1" style={props.mode==="dark"?labelstyleDark:labelstyleLight}>Enable Dark Mode</label>
        </div>  
      </div>
    </nav>
  );
}
