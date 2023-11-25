import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ConfirmReset = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [rewritePassword, setRewritePassword] = useState('');
  const { email } = useParams();
  console.log(email);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const containerStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  const h1Style = {
    textAlign: 'center',
    padding: '40px',
    paddingTop: '60px',
    marginTop: '60px',
  };

  const otpInputsStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '20px',
  };

  const inputOtpStyle = {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    fontSize: '18px',
    margin: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 8px 8px rgba(0.2, 0, 0, 0.3)',
  };

  const passwordInputsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const inputPasswordStyle = { 
    width: "30%",
    height: "40px",
    fontSize: "18px",
    margin: "0 10px",
    padding:" 5px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 8px 8px rgba(0.2, 0, 0, 0.2)",
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    backgroundColor: '#4e4e4e',
    borderRadius: '30px',
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRewritePasswordChange = (e) => {
    setRewritePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !otp) {
      setMessage('Fields cannot be empty');
      return;
    } else setMessage("");

    if (rewritePassword !== password) {
      setMessage('Passwords do not match');
      return;
    } else setMessage("");
    const data = {
      email: email,
      verificationCode: otp.join(''),
      password: password,
    };
    axios.post('http://localhost:5000/api/reset/confirm', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setMessage(response.data.message);
        navigate('../../login');
        window.alert("password changed");
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Enter OTP and Password</h1>
      <form onSubmit={handleSubmit}>
        <div style={otpInputsStyle}>
          {otp.map((value, index) => (
            <input
              className='input-otp'
              style={inputOtpStyle}
              type="text"
              key={index}
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
            />
          ))}
        </div>
        <div style={passwordInputsStyle}>
          <input
            style={inputPasswordStyle}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
          <input
            style={inputPasswordStyle}
            type="password"
            placeholder="Rewrite Password"
            onChange={handleRewritePasswordChange}
            value={rewritePassword}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: '#a5a1a1' }}>
          <button type="submit" style={buttonStyle}>Submit</button>
        </div>
        {message && <p style={{ color: 'red', fontSize: '16px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ConfirmReset;
