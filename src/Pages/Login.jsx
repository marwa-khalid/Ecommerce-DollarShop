import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice'; 
import { useNavigate } from 'react-router-dom';
import bg from '../images/login.png';  
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

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
  
    <Container className='p-5' >

      <Row>
        <h3 className="mb-4 text-center">Login at DollarWala!</h3>
      </Row>
      
      <Row>

        <Col md={6} >
          <img src={bg} alt="Registration" className="img-fluid" />
        </Col>
        
        <Col md={6}>  
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required autoFocus
              />
              {emailErr && <p style={{ color: 'red', fontSize: '16px' }}>{emailErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required autoFocus
              />
              {passErr && <p style={{ color: 'red', fontSize: '16px' }}>{passErr}</p>}
            </Form.Group>

        
            <Form.Group className="d-flex justify-content-end mb-3">
              <a href="/login/reset" style={{ color: 'black', textDecoration: 'none',fontWeight:"normal",fontSize:'13px'}}>Forgot password?</a>
            </Form.Group>

            <Form.Group className="text-center" >
              <Button type="button" className="btn btn-dark" onClick={handleLogin}>
              Login
              </Button>
            </Form.Group>

            <Form.Group className="d-flex justify-content-center mt-3">
              <a href="/register" style={{ color: 'black', textDecoration: 'none',fontWeight:"normal", fontSize:'12px'}}>Don't have an account? Register now!</a>
            </Form.Group>

            {error && <p style={{ marginTop: '20px', color: 'red', fontSize: '16px' }}>{error}</p>}
          </Form>
          
        </Col>
      </Row>
    </Container>    
  )
}

export default Login
