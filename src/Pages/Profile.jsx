import React, { useEffect, useState } from 'react'
import ProfileHeader from '../Components/ProfileHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {


  const {id} = useParams()




let [name, setName] = useState();
const navigate = useNavigate();
useEffect(() => {
  let token = localStorage.getItem("token");

  if (!token) return navigate("/login");

  async function getMe() {
    try {
      let { data } = await axios.get(`profile/user/${id}`);

      setName(data);
    } catch (error) {
       toast("Error", { type: "error" });
    }
  }
  getMe();
}, []);



  return (
    <div>
      <ProfileHeader />
      <main className="just-view container container w-75">
        <form>
          <Link to="/developers" className="back_to">
            Back To Profiles
          </Link>
          <div className="user_about text-center ">
            <img className="" width={250} src={name?.user?.avatar} alt="" />
            <h1 className="my-3">{name?.user?.name}</h1>
            <p className="my-3 h3">
              {name?.status} at {name?.company}
            </p>
          </div>
          <div className="bios text-center">
            <h3 className="my-3">
              {name?.user?.name}'s {name?.bio}
            </h3>
            <p className="my-3">{name?.status}</p>
            <hr />
            <h3 className="my-3">Skill Set</h3>
            <ul className="d-flex my-3 justify-content-around">
              {name?.skills?.map((n) => (
                <li>
                  <i className="fa-solid fs-7 fa-check"></i>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="third d-flex">
            <div className="w-50 express">
              <h2 className="text-info fw-bolder">Experience</h2>
              <p>{name?.experience[0]?.title}</p>
            </div>
            <div className=" w-50 edu">
              <h2 className="text-info fw-bolder">Education</h2>
              <p>{name?.education[0]?.fieldofstudy}</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Profile;
