import React from 'react'
import  {useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import ProfileHeader from '../Components/ProfileHeader'
import axios from 'axios'

const AddEducation = () => {
  let navigate=useNavigate();
  let [values,setValues]=useState({
    school:'',
    degree:'',
    fieldofstudy:'',
    from:'',
  });
  function handleFormSubmit(e){
    e.preventDefault();
    console.log(628);
    async function getExperince(){
      try {
        let data=await axios.put("/profile/education",values)
        toast('Education Added' , {type:'success'})
        navigate('/dashboard')     
      } catch (error) {
        toast("error education" , {type:'error'})
        
      }
    }
    getExperince();
  }
  function  handleInputChange(e){
    setValues(oldV=>({
      ...oldV,
      school:e.target.value,
    }));
  }
  function  handleinput(e){
    setValues(oldV=>({
      ...oldV,
      degree:e.target.value,
    }));
  }
  function  handleFile(e){
    setValues(oldV=>({
      ...oldV,
      fieldofstudy:e.target.value,
    }));
  }
  function  handleFrom(e){
    setValues(oldV=>({
      ...oldV,
      from:e.target.value,
    }));
  }
  console.log(values);

  return (
      <>
        <ProfileHeader />
        <section className="addexperience container">
        <h2 className='devSignLogin'>Add An Education</h2>
          <div className='d-flex gap-3 mb-3 align-items-center'>
          <span className="material-symbols-outlined display-5">gynecology</span>
            <p className='fs-2'>  Add any school or bootcamp that you have attended</p>
          </div>
          <p>* = required field</p>
          <form onSubmit={handleFormSubmit}>
          <div className="form-group">
          <input onChange={handleInputChange} type="text " value={values.school} className=' mb-4 w-100' placeholder='* school or Bootcamp' required/>

          </div>
          <div className="form-group">
          <input  onChange={handleinput}  value={values.degree} type="text " className=' mb-4 w-100' placeholder='* Degree or Sertificate' required/>

          </div>
          <div className="form-group ">

          <input type="text " onChange={handleFile} className='mb-4 w-100' value={values.fieldofstudy} placeholder='*Field of Study' />
          </div>
          <div className='form-group'>
          <input onChange={handleFrom} type="date"  className='mb-4 w-100' name='from'/>
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name='current' className='me-2'/>
              Current Job
            </p>
          </div>
            <textarea  name="text" id="text" className='w-100' cols="100" rows="5" placeholder='Job Description'></textarea>
            <button  type='submit'  className=' signin text-white text-decoration-none me-2 mb-5'>submit</button>
           <Link to='/dashboard' className='networkLink text-dark  text-decoration-none mb-5'>Go Back</Link>
          </form>
        </section>

      </>
  )
}

export default AddEducation;

 
