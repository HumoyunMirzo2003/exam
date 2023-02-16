import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Home = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token) navigate('/dashboard')
  },[])
  
  return (
    <div className="home">
        <Header />
        <section>
          <h1>Developer Connector</h1>
          <h2>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </h2>
          <div>
            <Link className="btn btn-primary m-2" to={"/register"}>
              Register
            </Link>
            <Link className="btn btn-light m-2" to={"/login"}>
              Login
            </Link>
          </div>
        </section>
    </div>
  );
};

export default Home;
