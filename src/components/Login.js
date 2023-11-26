import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  setUser } from "../redux/auth.slice";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [loginType, setLoginType] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userType: loginType,
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("...", formData  );

    await axios
      .post(`${BASE_URL}/auth/login`, formData)
      .then((resp) => {
        // console.log("12", );
        console.log("RES", resp?.data);
        toast.success("Successfuly, logged in...");
       
        dispatch(setUser(resp?.data));
        console.log(">>>>>", resp?.data);
        localStorage.setItem("currentUser", JSON.stringify(resp?.data));
        if (resp?.data?.userType === "CUSTOMER") {
          navigate("/vendor");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log("..0", err?.response?.data?.error);
        toast.error(
          err?.response?.data?.error?.error?.error || err?.response?.data?.error
        );
      });
  };
  function handleLoginType(type) {
    setLoginType(type);
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  }

  return (
    <div className="flex items-center justify-center py-12 ">
      <div className="flex md:flex-row flex-col  md:w-[60%] w-[90%]  mx-auto justify-between ">
        <div className="flex-col md:w-[60%] w-[90%] rounded border-2 border-[#673AB7]  text-center py-4">
          <h2 className="md:text-2xl text-xl font-bold my-4 mx-auto text-[#673AB7]">
            Login As
          </h2>
          <div className="flex items-center gap-1 px-6">
            <button
              className={`${
                loginType === "ADMIN"
                  ? "bg-[#673AB7] text-white transition-colors duration-300"
                  : "border transition-colors duration-300"
              } flex-[1] rounded-md py-2 `}
              onClick={() => handleLoginType("ADMIN")}
            >
              Admin
            </button>
            <button
              className={`${
                loginType === "CUSTOMER"
                  ? "bg-[#673AB7] text-white transition-colors duration-300"
                  : "border transition-colors duration-300"
              } flex-[1] rounded-md py-2`}
              onClick={() => handleLoginType("CUSTOMER")}
            >
              Customer
            </button>
          </div>
          {loginType === "" ? (
            <p className="text-sm text-red-500 mt-2 font-medium float-left pl-6">
              Select Login Type
            </p>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex-col mt-14 text-left">
              <div className="px-8 mb-6">
                <label htmlFor="email" className=" labels mb-2 capitalize">
                  Enter Email
                </label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border w-full py-2 outline-none  p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <label htmlFor="password" className="labelsmb-2">
                  Enter Password
                </label>
                <br></br>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border w-full py-2 outline-none p-2"
                />
              </div>
              <div className="px-8 mb-6">
                <input
                  type="checkbox"
                  value=""
                  defaultChecked
                  name="remember"
                />
                <label className="ml-4">Remember</label>
                <span className="float-right font-medium text-[#673AB7]">
                  Forgot Password ?
                </span>
                <br></br>
                <button
                  type="submit"
                  className={`text-white bg-[#673AB7] w-full py-2 mt-16  rounded-xl cursor-pointer ${
                    loginType === "" ? "cursor-not-allowed" : ""
                  } `}
                  disabled={loginType === "" ? true : false}
                >
                  Login
                </button>
              </div>
          

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;




