import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProfileHeader = () => {

    const navigate = useNavigate()

    function handleLogOut(){
      localStorage.removeItem("token")
      toast("Logged Out", {type:"info"})
      navigate('/')
    }

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
              <Link className="link" to="/profiles">
                Developers
              </Link>
            </li>
            <li>
              <Link className="link" to="/posts">
                Posts
              </Link>
            </li>
            <li>
              <a onClick={handleLogOut}>
                <i className="fa-solid fa-right-from-bracket"></i><span>Log Out</span></a>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default ProfileHeader;
