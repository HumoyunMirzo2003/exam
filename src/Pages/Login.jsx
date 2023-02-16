import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
      let token = localStorage.getItem("token");
      if (token) navigate("/dashboard");
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        try {
          let {
            data: { token, message },
          } = await axios.post("/auth", values);
          localStorage.setItem("token", token);
          axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
          toast(message, { type: "success" });
          navigate("/dashboard");
        } catch (error) {
          toast("Not Found", { type: "error" });
          console.log(error);
        }
    }

    function handleInputChange(e) {
      setValues((oldValues) => ({
        ...oldValues,
        [e.target.name]: e.target.value,
      }));
    }

    return (
    <>
        <Header />
        <section className="LoginPage container">
            <h1 className="large">Sign In</h1>
            <p className="lead">
              <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={handleLogin}>
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" id='email' value={values.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name="password" id='password' minLength="6" value={values.password} onChange={handleInputChange} />
              </div>
              <input type="submit" className="btn btn-secondary" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
    </>
    
    );
};

export default Login;
