import { Button, TextField } from "@mui/material";
import './Login.css';
import React, { useState } from 'react';
import Registration from "../Registration/Registration";
import ServiceProviderRegistration from "../Registration/ServiceProviderRegistration";

import DeleteIcon from '@mui/icons-material/Delete';

export const Login: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false); // State to toggle between forms
  const [isServiceRegistration , setServiceregistration] = useState(false);

  const handleSignUpClick = () => {
    setIsRegistration(true); // Show Register component when the button is clicked
  };

  const handleBackToLogin = (e : any) => {
    setIsRegistration(false); // Switch back to Login form
  };


  const handleSignUpClickServiceProvider = () =>{
    setServiceregistration(true)
  }

  const handleProviderBackToLogin = (e:any) =>{
    setServiceregistration(false)
  }


  return (
    <>
    <div className={`h-[80%] w-screen flex justify-center items-center dark:bg-gray-900 parent-box ${
      isServiceRegistration ? 'top-[10%]' :
      isRegistration ? 'top-[30%]' :
      'top-[7%]'
    }`}>
        <div className="m-0">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-0"
          >
            <div
              className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-8 md:p-6 sm:p-4 p-2 m-0"
            >
              {isRegistration ? (
                <Registration onBackToLogin={(e) => handleBackToLogin(e)} />
              ) :
              isServiceRegistration ? (
                <ServiceProviderRegistration onBackToLogin={(e) => handleProviderBackToLogin(e)}/>
              ):
               (
                <>
                  <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                    Log in
                  </h1>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">Email</label>
                      <input
                        id="email"
                        className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
                      <input
                        id="password"
                        className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                        <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                          Forget your password?
                        </span>
                      </a>
                    </div>
                    <button
                      className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                      type="submit"
                    >
                      LOG IN
                    </button>
                  </form>
                  <div className="flex flex-col mt-4 items-center justify-center text-sm">
                    <h3 className="dark:text-gray-300">
                      Don't have an account? 
                    </h3>
                    <button
                        onClick={handleSignUpClick}
                        className="text-blue-400 ml-2 underline"
                      >
                        Sign Up As User
                      </button>
                      <button
                        onClick={handleSignUpClickServiceProvider}
                        className="text-blue-400 ml-2 underline"
                      >
                        Sign Up As Service Provider
                      </button>
                  </div>
                </>
              )}
              {!isRegistration && !isServiceRegistration && 
              <div id="third-party-auth" className="flex items-center justify-center mt-5 flex-wrap">
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px]" src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/" alt="Google" />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px]" src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/" alt="Linkedin" />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px] filter dark:invert" src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/" alt="Github" />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px]" src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/" alt="Facebook" />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px] dark:gray-100" src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/" alt="twitter" />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img className="max-w-[25px]" src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/" alt="apple" />
              </button>
            </div>}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
