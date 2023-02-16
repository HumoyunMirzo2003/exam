import React from 'react'
import ProfileHeader from '../Components/ProfileHeader';
import { Link , useMatch, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import  axios  from 'axios';
import { toast } from 'react-toastify';

const CreateProfile = () => {
  
  const creatingProfile = useMatch("/Create-profile");
 const navigate = useNavigate();
 const [values, setValues] = useState({
   company:"",
   website:"",
   location:"",
   status:"",
   skills:"",
   githubusername:"",
   bio:"",
   twitter:"",
   facebook:"",
   linkedin:"",
   youtube:"",
   instagram:"",
 });

 async function handleCreate(e) {
   e.preventDefault(); 
   try {
     let {
       data
     } = await axios.post("/profile", values);
     toast("Profile Created", { type: "success" });
   
     navigate("/dashboard");

   } catch (error) {
      toast("Error", { type: "error" });   
   }
 }

function handleInputChange(e) {
  setValues((oldValues) => ({
    ...oldValues,
    [e.target.name]: e.target.value,
  }));
}
 








 const [open, setOpen] = useState(false);
 function handleToggleSidebar() {
   setOpen(!open);
 }
  return (
    <div>
      <ProfileHeader />
      <main className="min-vh-100 d-flex align-items-center">
        <form onSubmit={handleCreate} className="w-75 mx-auto  p-5">
          <h1 className="display-2 fw-3 fw-bolder text-info ">
            {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
          </h1>
          <p className=" fw-3 text-dark fs-3 ">
            <i className="fa-solid fa-user mx-2"></i>Let's get some information
            to make your
          </p>

          <p className="small disable">* = required field</p>

          <div className="form-group">
            <select
              className="w-100 p-2 "
              name="status"
              required
              value={values.status}
              onChange={handleInputChange}
            >
              <option selected disabled>
                * Select Professional Status
              </option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>

          <div className="my-1">
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company"
              className="form-control"
              value={values.company}
              onChange={handleInputChange}
            />
            <p className="small disable">
              Could be your own company or one you work for
            </p>
          </div>

          <div className="my-1">
            <input
              type="text"
              name="website"
              id="website"
              placeholder="Website"
              className="form-control"
              value={values.website}
              onChange={handleInputChange}
            />
            <p className="small disable">
              Could be your own or a company website
            </p>
          </div>

          <div className="my-1 location">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="form-control"
              value={values.location}
              onChange={handleInputChange}
            />
            <p className="small disable">
              City state suggested (eg. Boston, MA)
            </p>
          </div>

          <div className="my-1 skills">
            <input
              type="text"
              name="skills"
              id="skills"
              placeholder="* Skills"
              className="form-control"
              required
              value={values.skills}
              onChange={handleInputChange}
            />
            <p className="small disable">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP
            </p>
          </div>

          <div className="my-1 ">
            <input
              type="text"
              name="githubusername"
              id="githubusername"
              placeholder="Github Username"
              className="form-control"
              value={values.githubusername}
              onChange={handleInputChange}
            />
            <p className="small disable">
              If you want your latest repos and a Github link, include your
              username
            </p>
          </div>

          <div className="my-1">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                name="bio"
                value={values.bio}
                onChange={handleInputChange}
                as="textarea"
                placeholder="Create a post"
                rows={3}
              />
            </Form.Group>

            <p className="small disable">Tell us a little about yourself</p>
          </div>

          <div>
            <button
              type="button"
              className="opens btn btn-light"
              onClick={handleToggleSidebar}
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {open && (
            <aside>
              <div className="my-3 d-flex social-input">
                <i className="fab  text-info fa-twitter fa-2x" />
                <input
                  type="text"
                  placeholder="Twitter UR L"
                  name="twitter"
                  className="form-control mx-3"
                  value={values.twitter}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3 d-flex social-input">
                <i className="fab text-primary  fa-facebook fa-2x" />
                <input
                  type="text"
                  placeholder="Facebook U RL"
                  name="facebook"
                  className="form-control mx-3"
                  value={values.facebook}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3 d-flex social-input">
                <i className="fab text-danger  fa-youtube fa-2x" />
                <input
                  type="text"
                  placeholder="YouTube UR L"
                  name="youtube"
                  className="form-control mx-3"
                  value={values.youtube}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3 d-flex social-input">
                <i className="fab text-info fa-linkedin fa-2x" />
                <input
                  type="text"
                  className="form-control mx-3"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={values.linkedin}
                  onChange={handleInputChange}
                />
              </div>

              <div className="my-3 d-flex social-input">
                <i className="fab text-primary fa-instagram fa-2x" />
                <input
                  type="text"
                  className="form-control mx-3 "
                  placeholder="Instagram URL"
                  name="instagram"
                  value={values.instagram}
                  onChange={handleInputChange}
                />
              </div>
            </aside>
          )}

          <button className="my-2 mx-2 btn  btn-info">Jo'natish</button>
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </main>
    </div>
  );
}

export default CreateProfile;
