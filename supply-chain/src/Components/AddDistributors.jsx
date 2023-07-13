import React from 'react'
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import '../Style/New.css'

const AddDistributors = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState("");
    let name,value;
    const [distributor, setDistributor] = useState({
        name:"", address:"", contactInfo :""
    });

    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setDistributor({...distributor, [name]:value})
    }

    const PostData = async(e) =>{
        e.preventDefault();
        const {name, address, contactInfo} = distributor;
   
        const res = await fetch("/distributors/new",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,address, contactInfo
        })
        
      });
      
      const data = await res.json();
      if(res.status===422 || !data){
        window.alert("Invalid distributors");
        console.log("Invalid distributors")
      }
      else{
        window.alert("distributor Submission Successfull");
        console.log("distributor Submission Successfull");
        navigate("/");
      }
    
    };

  return (
    <div className="new">
    <div className="newContainer">
      <div className="top">
        <h1>Add New Distributors</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
        </div>

        <div className="right">
          
          <form method='POST'>
              <div className="formInput">
                <label htmlFor='file'>
                  {/* Image:<DriveFolderUploadOutlinedIcon className='icon'/> */}
                </label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
              </div>

              
              <div className="formInput">
                <label>Name</label>
                <input type="text" placeholder='Enter Name' name="name" id="name" autoComplete='off' value={distributor.name}  onChange={handleInputs} />
              </div>
              
              <div className="formInput">
                <label>Address</label>
                <input type="text" placeholder='Enter Address' name="address" id="address" autoComplete='off' value={distributor.address}  onChange={handleInputs} />
              </div>
              
              <div className="formInput">
                <label>Contact Info</label>
                <input type="text" placeholder='Enter Contact Info' name="contactInfo" id="contactInfo" autoComplete='off' value={distributor.contactInfo}  onChange={handleInputs}/>
              </div>
              
                                      
              <input type="submit" name='send' id='send' value={"Send"} className="button"
                          onClick={PostData}
                          /> 


          </form>

        </div>
      </div>
    </div>
  </div>
  )
}

export default AddDistributors