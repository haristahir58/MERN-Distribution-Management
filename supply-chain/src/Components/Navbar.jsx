import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../Style/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-nav">
    <li className="nav-item">
        <NavLink to={"/register"} className="nav-link">
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/login"} className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/"} className="nav-link">
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to={"/products"} className="nav-link">
          Products
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/distributors"} className="nav-link">
          Distributors
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/distributors/assign"} className="nav-link">
          Assign Products
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar
