import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useNavigation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './login.scss'
import axios from 'axios'

const Login = () => {
    const[username,setUsername]=useState('')
    const [password, setPassword] = useState("")
    const dispatch=useDispatch();
    const users=useSelector(state=>state.users);
    const navigate=useNavigate();
     const[iswrongcredentials,setiswrongcredentials]=useState(false);

   
    const login= async()=>{

        try{
        const res = await axios.post('http://localhost:8080/login', ({
            email:username,
            password:password

        }))
            console.log(res.data)
            if(res.data){
                dispatch({
                    type:"LOGIN",
                    payload:res.data
                })
                // alert("Login Successfully");
                navigate('/product');
            }
            else{
                setiswrongcredentials(true);
                // alert("Wrong Credentials");
            }
          } catch (e) {
            console.log(e);
            alert(e)
          }

    }



  return (
    <>
    <Navbar/>
    <div className='complete-box'>
    <div className='signinbox'>
    <div className='section-2'>
    <form className='login'>
        <div className='myinput'><label>Email</label><input type="text" placeholder='email' value={username} onChange={(e)=>setUsername(e.target.value)}/></div>
        <div className='myinput'><label>Password</label><input type="password" placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/></div>
        <div  className={!iswrongcredentials?"error":"red"}>*Wrong Credentials</div>
        <div className='mybutton'><input type="button" className='button' value="Signin" onClick={login}/></div>
    </form>
    </div>
    <section className='section-1'></section>
    </div>
    </div>
    </>
  )
}

export default Login