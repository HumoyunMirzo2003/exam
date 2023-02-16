import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Header from '../Components/Header';
import axios from "axios";

const Register = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
    
        if (values.password !== values.confirmedPassword) {
          return toast("Password don't match", { type: "error" });
        }
    
        try {
          let {
            data: { token, message },
          } = await axios.post("/users", values);
    
          localStorage.setItem("token", token);
          axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
    
          toast(message, { type: "success" });
    
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
          toast(error.message, { type: "error" });
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
        <section className="container">
          <h1 className="large">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
          <form className="form" onSubmit={handleRegister}>
            <div className="form-group">
              <input type="text" placeholder="Name" name="name" required value={values.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" name="email" required value={values.email} onChange={handleInputChange} />
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" name="password" id='password' required min={6} value={values.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" name="confirmedPassword" id='confirmedPassword' min={6} onChange={handleInputChange} />
            </div>
            <input type="submit" className="btn btn-secondary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
    </>
  );
};


export default Register;
