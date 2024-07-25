import React from "react";
import { useState } from "react";
//useForm is being used to create react hook form
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/action';

const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  //isLoggedIn and isSigningUp setting up state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState('');
  //Using dispatch
  const dispatch =useDispatch();
  //Navigate will be useful redirect user from one link to another
  const navigate = useNavigate();

  const onLogin = (data) => {

    //setUsername(data.username);
    //If user logged in so changing state to true
    //setIsLoggedIn(true)
    //Navigate the particular user to  all pokeon page
    
    dispatch(login(data.username));
    navigate(`/allpokemon/${data.username}`);
  }

  const onSignup = (data) => {
      // setUsername(data.username);
      // setIsLoggedIn(true);
    //On successfull signup
    dispatch(login(data.username))
    navigate(`/allpokemon/${data.username}`)
  }

  const handleLogout = () => {
    //Changing the state of isLoggedIn to logout the user
   // setIsLoggedIn(false);
    //Emptying the username
    //setUsername('');
    //Now for logout bring user back to login page
    dispatch(logout());
    navigate('/login');
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {isLoggedIn ? (
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="p-8 bg-white rounded shadow-md">
        {isSigningUp ? (
          <form onSubmit={handleSubmit(onSignup)}>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                {...register('username', { required: true })}
                type="text"
                className="mt-1 p-2 w-full border rounded"
              />
              {errors.username && <span className="text-red-500">Username is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="mt-1 p-2 w-full border rounded"
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
            <button 
              type="button" 
              onClick={() => setIsSigningUp(false)}
              className="w-full py-2 mt-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Switch to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onLogin)}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                {...register('username', { required: true })}
                type="text"
                className="mt-1 p-2 w-full border rounded"
              />
              {errors.username && <span className="text-red-500">Username is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="mt-1 p-2 w-full border rounded"
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={() => setIsSigningUp(true)}
              className="w-full py-2 mt-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Switch to Sign Up
            </button>
          </form>
        )}
      </div>
    )}
  </div>
);
};

export default AuthForm;
