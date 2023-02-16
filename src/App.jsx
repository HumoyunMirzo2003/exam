import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/404";
import AddEducation from "./Pages/AddEducation";
import AddExperience from "./Pages/AddExperience";
import CreateProfile from "./Pages/CreateProfile";
import Dashboard from "./Pages/Dashboard";
import EditProfile from "./Pages/EditProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import Profiles from "./Pages/Profiles";
import Register from "./Pages/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/profiles" element={<Profiles />}></Route>
        <Route path="/profile/:Id" element={<Profile />}></Route>
        <Route path="/add-education" element={<AddEducation />}></Route>
        <Route path="/add-experience" element={<AddExperience />}></Route>
        <Route path="/create-profile" element={<CreateProfile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
