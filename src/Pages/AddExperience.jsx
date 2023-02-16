import React from 'react'
import  { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ProfileHeader from '../Components/ProfileHeader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddExperience = () => {
  let navigate=useNavigate()
  let [values,setValues]=useState({
    title:'',
    company:'',
    from:'',
  });
  function handleFormSubmit(e){
    e.preventDefault();
    console.log(628);
    async function getExperince(){
      try {
        let data=await axios.put('/profile/experience',values)
        toast('Experience Added' , {type:'success'})
        navigate('/dashboard')     
      } catch (error) {
        console.log(error);
        toast("error experience" , {type:'error'})
        
      }
    }
    getExperince();
  }
  function  handleInputChange(e){
    setValues(oldV=>({
      ...oldV,
      title:e.target.value,
    }));
  }
  function  handleinput(e){
    setValues(oldV=>({
      ...oldV,
      company:e.target.value,
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
        <h2 className='devSignLogin'>Add An Experience</h2>
          <div className='d-flex gap-3 mb-3 align-items-center'>
          <span className="material-symbols-outlined display-5">gynecology</span>
            <p className='fs-2'>  Add any developer/programming positions that you have had in the past</p>
          </div>
          <p>* = required field</p>
          <form onSubmit={handleFormSubmit}>
          <div className="form-group">
          <input onChange={handleInputChange} type="text " value={values.title} className=' mb-4 w-100' placeholder='* Job title' required/>

          </div>
          <div className="form-group">
          <input  onChange={handleinput}  value={values.company} type="text " className=' mb-4 w-100' placeholder='* Company' required/>

          </div>
          <div className="form-group ">

          <input type="text " className='mb-4 w-100' placeholder='Location' />
          </div>
          <div className='form-group'>
          <input onChange={handleFrom} type="date" value={values.from} className='mb-4 w-100' name='from'/>
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

export default AddExperience;
