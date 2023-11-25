import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice'; 
import background from "../images/bg.jpg";
import { useNavigate } from 'react-router-dom';

const Login = () => { 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailError] = useState("");
  const [passErr, setPassError] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    const data = {
      email: email,
      password: password,
    };
    if (!email) {
      setEmailError("Email is required");
      return;
    }else setEmailError('');
    if(!email.includes("@") || !email.includes(".com")){
      setEmailError(`Email must include "@" and a ".com"`);
      return;
  }else setEmailError('');  
    if (!password) {
      setPassError("Password is required.");
      return;
    }else setPassError('');

    axios
      .post("http://localhost:5000/api/users/login", data
      , {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("Login Successful");
        localStorage.setItem('userData', JSON.stringify(response.data.user));  //set user data
        dispatch(login(response.data.user));
        setError(response.data.message);
        navigate('/');
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
            setError(error.response.data.message);
        } 
        else if (error.response && error.response.status === 401) {
            setError(error.response.data.message);
        }
        else if (error.response && error.response.status === 402) {
          setError(error.response.data.message);
        }
        else {
          setError('Error:', error.message);
        }
      });
  };

  return (
  
    <div className="vh-100" style={{
      background: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
    
                <h3 className="mb-5">Sign in</h3>
    
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required autoFocus
                  />
                  {emailErr && <p style={{ color: 'red', fontSize: '16px' }}>{emailErr}</p>}
                </div>
    
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required autoFocus
                  />
                  {passErr && <p style={{ color: 'red', fontSize: '16px' }}>{passErr}</p>}
                </div>
    
                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label px-2" htmlFor="form1Example3"> Remember password </label>
                </div>
                <div className="d-flex justify-content-end mb-4">
                    <a href="/login/reset" style={{ color: 'grey', textDecoration: 'none',fontSize:'13px'}}>Forgot password?</a>
                  </div>
                <button type="button" className="btn btn-dark btn-lg" onClick={handleLogin}>
                  Login
                </button>
    
                {error && <p style={{ marginTop: '20px', color: 'red', fontSize: '16px' }}>{error}</p>}
    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
 
  )
}

export default Login
