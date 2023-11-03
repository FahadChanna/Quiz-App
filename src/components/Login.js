import React from 'react'
import './Login.css'
import InputControl from './InputControl'
import {Link, useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../firebase'
import { useState } from 'react'

const Login = () => {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [errMsg, setErrMsg] = useState('')
  const [submitBtnDisabled, setsubmitBtnDisabled] = useState(false)

  const handleSubmission= ()=>{
    if(values.email === '' || values.password === ''){
      setErrMsg('Fill all fields')
      return;
    }else{
      setErrMsg('')

      setsubmitBtnDisabled(true)
      signInWithEmailAndPassword(auth, values.email,values.password).then(async(res)=>{
      localStorage.setItem('userEmail', values.email);
      // localStorage.clear();
      setsubmitBtnDisabled(false)
  
        Navigate('/')
        // console.log(res)
      })
      .catch((err) =>{
      setsubmitBtnDisabled(false)
      // console.log("Error: ",err)
      setErrMsg(err.message)
    })
  }
}
  return (
    <div className='container'>
      <div className='innerBox'>
            <h1 className='heading'>Login</h1>

            <InputControl onChange={(e)=>setValues((prev)=>({...prev, email: e.target.value}))} label='Email' placeholder='Enter email address'/>
            <InputControl onChange={(e)=>setValues((prev)=>({...prev, password: e.target.value}))} label='Password' placeholder='Enter password'/>

            <div id='footer'>
                <b style={{color:'red'}}>{errMsg}</b>
                <br/>
                <button onClick={handleSubmission} disabled={submitBtnDisabled} >Login</button><br/><br/>
                <p>
                    Don't Have an Account?{''}
                    <span>
                        <Link to='/Register'>Sign Up</Link>
                    </span>
                </p>
            </div>
      </div>
    </div>
  )
}

export default Login
