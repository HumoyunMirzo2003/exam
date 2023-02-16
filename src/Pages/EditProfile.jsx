import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
let [createVal,setCreateval]=useState({
      status:'',
      skills:'',
      website:'',
      location:'',
      youtube:'',
      bio:'',
      github:'',
      twitter:'',
      instagram:'',
      linkedin:'',
      facebook:'',
  })
let [links,setLinks]=useState(true)
let navigate=useNavigate();

useEffect(()=>{
      async function get() {
        try {
          let data  = await axios.get("/profile/me");
          console.log(data.data);
          setCreateval({
            status:data.data.status,
            skills:data.data.skills,
            website:data.data.website,
            location:data.data.location,
            company:data.data.company,
            youtube:data.data.social.youtube,
            twitter:data.data.social.twitter,
            instagram:data.data.social.twitter,
            linkedin:data.data.social.linkedin,
            facebook:data.data.social.facebook,
            bio:data.bio,
            githubusername:data.data.githubusername,
          })
          console.log(data.data.social);
        } catch (error) {
          toast(error)
        }
      }
      get();
      
    },[])

  function handleSelector(e){
      setCreateval(oldV=>({
        ...oldV,
        status:e.target.value,
      }));
    }  
  function handleInputChange(e){
    setCreateval(oldV=>({
      ...oldV,
      skills:e.target.value,
    }));
  }
  function  handleTwiter(e){
    setCreateval(oldV=>({
      ...oldV,
      twitter:e.target.value,
    }));
  }
  function  handleYoutube(e){
    setCreateval(oldV=>({
      ...oldV,
      youtube:e.target.value,
    }));
  }
  function  handleInstagram(e){
    setCreateval(oldV=>({
      ...oldV,
      instagram:e.target.value,
    }));
  }
  function  handleLinkedin(e){
    setCreateval(oldV=>({
      ...oldV,
      linkedin:e.target.value,
    }));
  }
  function  handleFacebook(e){
    setCreateval(oldV=>({
      ...oldV,
      facebook:e.target.value,
    }));
  }
  function  handleCompany(e){
    setCreateval(oldV=>({
      ...oldV,
      company:e.target.value,
    }));
  }
  function  handleWebsite(e){
    setCreateval(oldV=>({
      ...oldV,
      website:e.target.value,
    }));
  }
  function  handleLocation(e){
    setCreateval(oldV=>({
      ...oldV,
      location:e.target.value,
    }));
  }
  function  handleGuthub(e){
    setCreateval(oldV=>({
      ...oldV,
      githubusername:e.target.value,
    }));
  }
  function  handleBio(e){
    setCreateval(oldV=>({
      ...oldV,
      bio:e.target.value,
    }));
  }
  
  function handleLink(){
    setLinks(!links);
  }

  async function handleCreateProfileNew(e){
     e.preventDefault();
    try {  
      let data=await axios.post('/profile' , createVal)
      console.log('keldi malumot', data);
      let dataId=data.data._id;
      toast('profile created successfuly' , {type:'success'})
      navigate('/dashboard')

    } catch (error) { 
      toast(error.response.data.errors?.[0]?.msg, {type:'error'})
      toast(error.response.data.errors?.[1]?.msg, {type:'error'})
    }
  }
  
return (
<>
<ProfileHeader/>
   <div className='container createProfile'>
        <h2 className='devSignLogin'>Edit Your Profile</h2>
        <div className='d-flex gap-3 mb-1'>  
          <span className="material-symbols-outlined display-6">person</span>
          <p className='fs-2'>Let's get some information to make your</p>
        </div>
        <p>* = required field</p>
        <form onSubmit={handleCreateProfileNew}>
        <select onChange={(e)=>handleSelector(e)} required class="form-select" aria-label="Default select example" >
            <option selected>Open this select menu</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor or Teacher">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
        </select>
        <p className='emailparagrf'>Give us an idea of where you are at in your career</p>
        <input type="text" onChange={ handleCompany}  value={createVal.company} className='form-control' placeholder='Company'  />
        <p className='emailparagrf'>Could be your own company or one you work for</p>
        <input type="text" onChange={ handleWebsite}  value={createVal.website}   className='form-control'  placeholder='Website'/>
        <p className='emailparagrf' >Could be your own or a company website</p>
        <input type="text" onChange={ handleLocation}  value={createVal.location}   className='form-control'  placeholder='Location'/>
        <p className='emailparagrf'>City & state suggested (eg. Boston, MA)</p>
        <input onChange={handleInputChange} required min={1} type="text"  value={createVal.skills} className='form-control' placeholder='*Skills'/>
        <p className='emailparagrf'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</p>
        <input type="text"  onChange={ handleGuthub}  value={createVal.githubusername}  className='form-control' placeholder='Github Username'/>
        <p className='emailparagrf'>If you want your latest repos and a Github link, include your username</p>
        <div className="form-floating mb-4">
        
        <textarea onChange={ handleBio}  value={createVal.bio}   placeholder="A short bio of yourself"  rows="4" cols="50" className='d-flex w-100'>{createVal.bio}</textarea>
            
        </div>
        <p className='emailparagrf' >Tell us a little about yourself</p>
        <span className='d-flex align-items-center mb-3'>
         <p type='text' onClick={handleLink} className='networkLink'>Add Social  Network  Links</p>
         <p className='mt-2 ms-2'>Optional</p>
        </span>
        <div className={(links)? "d-none" : 'd-block'}>
        <div className='d-flex mb-3 gap-3'>
            <div className='url-img'><img src="/twiter.png" alt="" /></div>
            <input type="text" onChange={handleTwiter} value={createVal.twitter} className='form-control' placeholder='Twiter URL'/>
        </div>
        <div className='d-flex mb-3 gap-3'>
            <div className='url-img'><img src="/facebook.png" alt="" /></div>
            <input type="text" onChange={handleFacebook} value={createVal.facebook} className='form-control' placeholder='Facebook URL'/>
        </div>
        <div className='d-flex mb-3 gap-3'>
            <div className='url-img'><img src="/youtube.png" alt="" /></div>
            <input type="text" onChange={handleYoutube} value={createVal.youtube} className='form-control' placeholder='Youtube URL'/>
        </div>
        <div className='d-flex mb-3 gap-3'>
            <div className='url-img'><img src="/linkedin.png" alt="" /></div>
            <input type="text" onChange={handleLinkedin} value={createVal.linkedin} className='form-control'  placeholder='Linkedin URL'/>
        </div>
        <div className='d-flex mb-3 gap-3'>
            <div className='url-img'><img src="/insta.png" alt="" /></div>
            <input type="text" onChange={handleInstagram} value={createVal.instagram} className='form-control' placeholder='Instagram URL'/>
        </div>
        </div>

        <button  type='submit'  className=' signin text-white text-decoration-none me-2 mb-5'>submit</button>
        <Link to='/' className='networkLink text-dark  text-decoration-none mb-5'>Go Back</Link>
        
        </form>

      </div>

</>
  )
}

export default EditProfile;

