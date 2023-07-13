import React from 'react'
import {useState} from 'react'
import { Link, NavLink, useNavigate} from "react-router-dom";
import '../Style/Auth.css';

const Register = () => {
    const navigate = useNavigate();
    let name,value;

    const [admin, setAdmin] = useState({
      name:"", email:"", password:""
    });
  
    const handleInputs = (e) =>{
      console.log(e)
      name = e.target.name;
      value = e.target.value;
      setAdmin({...admin,[name]:value})
    }
  
    const PostData = async(e) =>{
        e.preventDefault();
        const {name, email, password} = admin;
   
        const res = await fetch("/signup",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
        
      });
      
      const data = await res.json();
      if(res.status===422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid Registration")
      }
      else{
        window.alert("Registration Successfull");
        console.log("Registration Successfull");
        navigate("/login");
      }
    
    };
  
  return (
    <section className='signup'>
    <div className='container mt-6'>
        <div className="signup-content">
            <div className="signup-form">
                <h2 className='form-title'>Sign up</h2>
                <form method='POST' className='register-form' id='register-form'>
                    
                    <div className="form-group">
                        <label htmlFor="name">
                        <i class="zmdi zmdi-account material-icons-name"></i>
                        </label>

                        <input type="text" name="name" id="name" autoComplete='off' 
                        value={admin.name}
                        onChange={handleInputs} 
                        placeholder='Your Name'/>   
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">
                        <i class="zmdi zmdi-email material-icons-name"></i>
                        </label>

                        <input type="email" name="email" id="email" autoComplete='off' 
                        value={admin.email}
                        onChange={handleInputs}
                        placeholder='Your Email'/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>

                        <input type="password" name="password" id="password" autoComplete='off' 
                        value={admin.password}
                        onChange={handleInputs}
                        placeholder='Your Password'/>   
                    </div>


                    <div className="form-group">
                        <input type="submit" name='signup' id='signup' className='form-submit' value={"Register"} 
                        onClick={PostData}
                        /> 
                        <p className='login-link my-3'>Already have an account? <Link
                        to='/login'>Login</Link></p>
                    </div>
                    


                </form>
                </div>
            

   
        </div>
    </div>
    </section>
  )
}

export default Register