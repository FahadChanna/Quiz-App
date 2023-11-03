import React, { useState } from 'react'
import InputControl from './InputControl';
import './Register.css';
import {auth} from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
    const Navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
      });

      const [errMsg, setErrMsg] = useState('')
      const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
 
      const handleSubmission = async () => {
        if (values.name === '' || values.email === '' || values.password === '') {
          setErrMsg('Fill all fields');
          return;
        } else {
          setErrMsg('');
    
          try {
            setSubmitBtnDisabled(true);
            const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = res.user;
    
            await updateProfile(user, {
              displayName: values.name,
            });
            localStorage.clear();
            Navigate('/');
          } catch (err) {
            setSubmitBtnDisabled(false);
            setErrMsg(err.message);
          }
        }
      };
  return (
    <div className='container'>
        <div className='innerBox'>
            <h1 className='heading'>Sign-Up</h1>
        <InputControl
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          label="Name"
          placeholder="Enter your name"
        />
        <InputControl
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          label="Email"
          placeholder="Enter email address"
        />
        <InputControl
          onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          label="Password"
          placeholder="Enter password"
        />

        <div className='footer'>
          <b style={{ color: 'red' }}>{errMsg}</b>
          <br />
          <button onClick={handleSubmission} disabled={submitBtnDisabled}>
            Sign-Up
          </button>
          <br/>
          <br/>
          <p>
            Already Have an Account?{' '}
            <span>
              <Link to="/Login">Login</Link>
            </span>
          </p>
        </div>
        </div>
    </div>
  )
}

export default Register
