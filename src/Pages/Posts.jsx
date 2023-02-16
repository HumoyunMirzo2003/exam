import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import ProfileHeader from "../Components/ProfileHeader";
import axios from "axios";
import { toast } from "react-toastify";

const Posts = () => {

  let [values, setValues] = useState({
    post: "",
  });

  function handleFormSubmit(e) {
    e.preventDefault();

    async function post() {
      let { data } = await axios.post("/posts", { text: values.post });

    }

    toast("Post Sended", { type: "success" });
    post();
    values.post = "";
    values = "";


  }

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }



  const [post, usePost] = useState();
  useEffect(() => {
    async function getMe() {
      try {
        let { data } = await axios.get("/posts");
        usePost(data);
      } catch (error) {
        toast("Error", { type: "error" });
      }
    }
    getMe();
  }, []);


  let [name, setName] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    async function getMe() {
      try {
        let { data } = await axios.get("/auth");

        setName(data._id);
      } catch (error) {
        toast("Error", { type: "error" });
      }
    }
    getMe();
  }, []);
  const meid = name


  function deletePost() {


    async function getMe() {
      try {
        const { data } = await axios.delete(`/posts/${user}`);
      } catch (error) {
        toast("Error delete post", { type: "error" });
      }
    }
    getMe();

  }


  return (
    <div>
      <ProfileHeader />
      <div className="my-5 px-5 mx-5">
        <h1 className="text-info fw-bold my-4">Posts</h1>
        <h3 className="my-4">
          <i className="fa-solid fa-user mx-2"></i>Welcome to the community
        </h3>
        <form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={values.post}
              name="post"
              onChange={handleInputChange}
              as="textarea"
              placeholder="Create a post"
              rows={3}
            />
          </Form.Group>
          <button
            className=" mb-4  text-light btn btn-info  fs-5"
            to="/CreateProfile"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          {post?.map(
            ({ text, name, date, avatar, likes, user, comments, _id }) => (
              <div className="d-flex border-sm w-100 postlist">
                <Link className="w-25 user-img" to={`/viewprofile/${user}`}>
                  <img src={avatar} alt="postuser" />
                  <h4>{name}</h4>
                </Link>
                <div className="textpost">
                  <h5 className="my-2 mb-3 ">{text}</h5>
                  <p>Posted on {date}</p>
                  <button className="btn btn-secondary">
                    <i className=" mx-1 fa-solid fa-thumbs-up"></i>
                    {likes?.length}
                  </button>
                  <button className="btn btn-secondary mx-1">
                    <i className="mx-1 fa-solid fa-thumbs-down"></i>
                  </button>
                  <Link className="btn btn-info" to={`/comments/${_id}`}>
                    Discussion {comments?.length}
                  </Link>

                  {user === meid && (
                    <button
                      onClick={deletePost}
                      className="btn btn-danger mx-1 fw-bold "
                    >
                      <i className=" fs-4   text-light fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
