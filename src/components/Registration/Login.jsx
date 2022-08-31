/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {auth}=useSelector((store)=>store)
  const token = localStorage.getItem("token");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputData))
 };
 

 //dispatch current user if user already signup
 useEffect(() => {
  
  if (token) dispatch(currentUser(token))
  
 }, [token])
 

 //redirect to main page if register success
 useEffect(() => {
  if (auth.reqUser) {
   navigate("/")
  }
 },[auth.reqUser])
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-[30%] p-10  shadow-md bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2">Email</p>
            <input
              className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
              type="text"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={inputData.email}
            />
          </div>
          <div>
            <p className="mb-2">Password</p>
            <input
              className="py-2 px-2 outline outline-green-600 w-full rounded-md border-1"
              type="text"
              placeholder="Enter your Password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={inputData.password}
            />
          </div>
          <div>
            <input
              className="py-[0.7rem] px-3 w-full rounded-md bg-green-600 text-white mt-3"
              type="Submit"
              placeholder="Enter your Password"
              value={"Login"}
              readOnly
            />
          </div>
        </form>
        <div className="flex space-x-3 item-center mt-5">
          <p className="">Create New Account</p>
          <p
            onClick={() => navigate("/Signup")}
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
          >
            signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
