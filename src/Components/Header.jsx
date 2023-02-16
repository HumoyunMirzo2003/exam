import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Header = () => {

  return (
    <header>
        <h1>
          <a href="/">
            <i className="fa-solid fa-code"></i>
            DevConnector
          </a>
        </h1>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">
                Developers
              </Link>
            </li>
            <li>
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
