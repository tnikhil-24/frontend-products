import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function AdminLogin(){

    const navigate = useNavigate();

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [failedLogin,setFailedLogin]=useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const adminDetails={
            "usrName":email,
            "pwd":password,
        }
        try{
            const formData= new FormData();
            formData.append("adminLogin",JSON.stringify(adminDetails));
            const response=await axios.post("https://localhost:9000/api/auth/admin/login",formData);
            if(response.data.message == "Failed to Login"){
                setFailedLogin(true)
            }
            else{
                setCookie('token', await response.data.jwt, { expires: new Date(Date.now() + 604800000), path: '/' });
                setFailedLogin(false)
                navigate("/admin")
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
            <div className='login'>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-indigo-900">
          G Sports   
      </a>
      <div className="w-full rounded-lg   md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-900 md:text-2xl">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Your email</label>
                      <input type="email" name="email" id="email" onChange={event=>setEmail(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="true"/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-indigo-900 ">Password</label>
                      <input type="password" name="password" id="password" onChange={event=>setPassword(event.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="true"/>
                  </div>
                  {failedLogin===true &&
                  <div>
                    <p className='text-md text-red-700'>Username and Password entered do not match</p>
                  </div>
                    }
                  <button type='submit' className="btn-hover color-9 text-center w-full ">Sign In</button>
                 
              </form>
          </div>
      </div>
  </div>

        </div>
    );
}

export default AdminLogin;