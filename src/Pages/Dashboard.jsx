import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileHeader from "../Components/ProfileHeader";
import { addUser } from "../store/slices/user";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [delEx, setDelEx] = useState(true);
  const [delEdu, setDelEdu] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((u) => u.user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getMe() {
      try {
        let { data } = await axios.get("api/profile/me");
        dispatch(addUser(data));
        setUserData(data);
      } catch (error) {
        console.log(error);
        setUserData(error);
      }
    }
    getMe();
  }, [delEx, delEdu]);

  async function handleDeleteExperience(id) {
    try {
      axios.delete(`/profile/experience/${id}`);
      setDelEx(!delEx);
      toast("Experience Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }
  async function handleDeleteEducation(id) {
    try {
      axios.delete(`/profile/education/${id}`);
      setDelEdu(!delEdu);
      toast("Education Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }

  function handleDeleteAcount() {
    let confirmation = confirm(
      "Are You Sure To Delete Your Account? \nYour data cannot be restored!"
    );
    if (confirmation) {
      toast("Your Account Was Deleted", { type: "info" });
      localStorage.removeItem("token");
      axios.delete("/profile");
      navigate("/");
    }
  }
  return (
    <>
      <ProfileHeader />
      <div>
        <h2 className="large">Dashboard</h2>
        {userData?._id ? (
          <>
            <p className="p-3 large">
              <i className="fa-solid fa-user p-3"></i>Welcome,
              {userData?.user?.name}
            </p>
            <div className="d-flex gap-3">
              <Link to="/edit-profile" className="btn bg-gray">
                <i className="pr-2 fa-solid fa-user-pen"></i> Edit Profile
              </Link>
              <Link to="/add-experience" className="btn bg-gray">
                <i className="pr-2 fa-solid fa-briefcase"></i> Add Experience
              </Link>
              <Link to="/add-education" className="btn bg-gray">
                <i className="p-2 fa-solid fa-graduation-cap"></i> Add
                Education
              </Link>
            </div>
            <h3 className="p-5 large">
              Experience Credentials
            </h3>
            <table className="bg-gray">
              <thead className="large border p-3">
                <tr>
                  <th className="p-3">
                    Company
                  </th>
                  <th className="p-3">
                    Title
                  </th>
                  <th className="p-3">
                    Years
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData?.experience?.length > 0
                  ? userData?.experience?.map?.((exp) => (
                      <tr key={crypto.randomUUID()}>
                        <td className="large p-3">
                          {exp?.company ? exp?.company : "No Information"}
                        </td>
                        <td className="large p-3">
                          {exp?.title ? exp?.title : "No Information"}
                        </td>
                        <td className="large p-3">
                          {exp?.from
                            ? moment(exp?.from).utc().format("DD-MM-YYYY")
                            : ""}
                          -
                          {exp?.to
                            ? moment(exp?.to).utc().format("DD-MM-YYYY")
                            : "Now"}
                        </td>
                        <td>
                          {exp?.company ? (
                            <button
                              onClick={() => handleDeleteExperience(exp?._id)}
                              className="btn bg-red text-white"
                            >
                              Delete
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <h3 className="p-5">
              Education Credentials
            </h3>
            <table className="bg-gray">
              <thead className="large">
                <tr>
                  <th className="p-3">
                    School
                  </th>
                  <th className="p-3">
                    Degree
                  </th>
                  <th className="p-3">
                    Years
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData?.education?.length > 0
                  ? userData?.education?.map?.((edu) => {
                      return (
                        <tr key={crypto.randomUUID()}>
                          <td className="large p-3 ">
                            {edu?.school ? edu?.school : "No Information"}
                          </td>
                          <td className="large p-3 ">
                            {edu?.degree ? edu?.degree : "No Information"}
                          </td>
                          <td className="large p-3 ">
                            {edu?.from
                              ? moment(edu?.from).utc().format("DD-MM-YYYY")
                              : " "}
                            -
                            {edu?.to
                              ? moment(edu?.to).utc().format("DD-MM-YYYY")
                              : "Now"}
                          </td>
                          <td>
                            {edu?.school ? (
                              <button
                                onClick={() => handleDeleteEducation(edu?._id)}
                                className="btn bg-red text-white"
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
            <button
              onClick={handleDeleteAcount}
              className="btn bg-red text-white mt-8"
            >
              <i className="fa-solid fa-user-slash"></i> Delete My Account
            </button>
          </>
        ) : (
          <>
            <p className="large">
              No profile found. Do you want to create a profile?
            </p>
            <Link to="/create-profile" className="btn btn-dark">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
