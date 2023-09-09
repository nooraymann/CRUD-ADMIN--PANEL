import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <a className="navbar-brand text-success" href="/">Orders</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="dashboard">Dashboard</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="settings"><i className="fa-solid fa-gear fa-2xl"></i></Link>
        </li>
        <li className="nav-item me-4">
          <Link className="nav-link" to="logout">Logout</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li> */}
      </ul>
    </div>
  </div>
</nav>
  )
}
