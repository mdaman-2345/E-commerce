import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import "./signup.scss";
import validator from "validator";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const[nameerror,setnameerror]=useState(false);
  const[emailerror,setemailerror]=useState(false);
  const[passworderror,setpassworderror]=useState(false);
  const[cpassworderror,setcpassworderror]=useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const register = async () => {
    let namevalid,emailvalid,passwordvalid,cpasswordvalid;
    if(user.name.length<4){
        namevalid=true;
        setnameerror(true);
    }
    else{
        namevalid=false;
        setnameerror(false);
    }
    console.log(nameerror);
    if(!validator.isEmail(user.email)){
        emailvalid=true;
        setemailerror(true);
    }
    else{
        emailvalid=false;
        setemailerror(false);
    }
    if(user.password.length < 8){
        passwordvalid=true;
        setpassworderror(true);
    }
    else{
        passwordvalid=false;
        setpassworderror(false);
    }
    if(user.password !== user.cpassword){
        cpasswordvalid=true;
        setcpassworderror(true);
    }
    else{
        cpasswordvalid=false;
       setcpassworderror(false);
    }
    if(!namevalid&& !emailvalid && !passwordvalid && !cpasswordvalid){
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/person",
          user
        );
        console.log(res.data);
        if (res.data === "Registration Successfull") {
          dispatch({
            type: "REGISTER",
            payload: {
              id: new Date().getTime().toLocaleString(),
              name: user.name,
              username: user.email,
              password: user.password,
              cpassword: user.cpassword,
            },
          });
          navigate("./login");
        } else {
          alert(res.data);
        }
      } catch (e) {
        console.log(e);
        // alert(e)
      }
    }
  };

  const users = useSelector((state) => state.users);

  return (
    <>
      <Navbar />

      <div className="complete-box">
        <div className="signup-box">
          <section className="section-1"></section>

          <section className="section-2">
            <form method="POST" className="register">
              <div className="myinput">
                <label>Name</label>
                <div className="inputwitherror">
                  <input
                    type="text"
                    placeholder="name"
                    value={user.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <div className={!nameerror ? "error":""}>*invalid name</div>
                </div>
              </div>
              <div className="myinput">
                <label>Email</label>
                <div className="inputwitherror">
                <input
                  type="text"
                  placeholder="email"
                  value={user.username}
                  name="email"
                  onChange={handleChange}
                />
                <div className={!emailerror ? "error":""}>*invalid email</div>
                </div>
              </div>
              <div className="myinput">
                <label>Password</label>
                <div className="inputwitherror">
                <input
                  type="password"
                  placeholder="password"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                />
               <div className={!passworderror ? "error":""}>*must be bigger than 8 character</div>
                </div>
                </div>
              <div className="myinput">
                <label>Confirm Password</label>
                <div className="inputwitherror">
                <input
                  type="password"
                  placeholder="confirm password"
                  value={user.cpassword}
                  name="cpassword"
                  onChange={handleChange}
                />
                <div className={!cpassworderror ? "error":""}>* not equal to password</div>
                </div>
              </div>
              
              <div className="mybutton">
                <input
                  type="button"
                  className="button"
                  value="register"
                  onClick={register}
                />
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Signup;
