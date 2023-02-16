import React ,{ useEffect , useState} from 'react'
import ProfileHeader from '../Components/ProfileHeader';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const Profiles = () => {


let token = localStorage.getItem("token");

 const [product, setProduct] = useState();

  useEffect(() => {
    async function getDev() {
      try {
        let  data = await axios.get("/profile?");
 setProduct(data.data)
      } catch (error) {
        toast("Error", { type: "error" });
      }
    }
    getDev();
  }, []);
  
  return (
    <div>
      <ProfileHeader />
      <main className="sign_in container container w-75">
        <form>
          <h2 className="h1 my-4 fw-bolder text-info">Developers</h2>
          <h3 className="h3 my-3">
            <i className=" fab fa-connectdevelop"></i>
            Browse and connect with
          </h3>

          {product?.map(({ user, company, skills }) => (
            <div className="my-3  develop_1 d-flex justify-content-between align-items-center">
              <div className="img my-2">
                <img src={user?.avatar} alt="foto" />
              </div>
              <div className="right_dev w-50">
                <h4>{user?.name}</h4>
                <p>{company}</p>
                <Link to={`/viewprofile/${user?._id}`} className="view">
                  View Profile
                </Link>
              </div>
              <div className="skill">
                <ul>
                  {skills?.map((n) => (
                    <li>
                      <i className="fa-solid fs-7 fa-check"></i>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </form>
      </main>
    </div>
  );
}

export default Profiles;
