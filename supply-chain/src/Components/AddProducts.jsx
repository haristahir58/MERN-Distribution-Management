import React from 'react'
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import '../Style/New.css'

const AddProducts = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState("");
    let name,value;
    const [product, setProduct] = useState({
        name:"", brand:"", modelNumber:"", price:"", specifications :""
    });

    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setProduct({...product, [name]:value})
    }

    const PostData = async(e) =>{
        e.preventDefault();
        const {name, brand, modelNumber, price, specifications} = product;
   
        const res = await fetch("/products/new",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name, brand, modelNumber, price, specifications
        })
        
      });
      
      const data = await res.json();
      if(res.status===422 || !data){
        window.alert("Invalid Products");
        console.log("Invalid Products")
      }
      else{
        window.alert("Product Submission Successfull");
        console.log("Product Submission Successfull");
        navigate("/");
      }
    
    };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
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
                  <input type="text" placeholder='Enter Name' name="name" id="name" autoComplete='off' value={product.name}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Brand</label>
                  <input type="text" placeholder='Enter Brand' name="brand" id="brand" autoComplete='off' value={product.brand}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Model Number</label>
                  <input type="text" placeholder='Enter model number' name="modelNumber" id="modelNumber" autoComplete='off' value={product.modelNumber}  onChange={handleInputs}/>
                </div>
              
                
                <div className="formInput">
                  <label>Price</label>
                  <input type="number" placeholder='Enter Price' name="price" id="price" autoComplete='off' value={product.price}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Specifications</label>
                  <input type="text" placeholder='Enter specifications' name="specifications" id="specifications" autoComplete='off' value={product.specifications}  onChange={handleInputs}/>
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

export default AddProducts