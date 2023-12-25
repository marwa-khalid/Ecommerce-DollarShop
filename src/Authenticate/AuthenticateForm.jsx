import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AuthenticateForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  const { email,token, expirationDate } = useParams();

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
    console.log(newOtp.join(''),)
  };

 const handleSubmit= (e) => {

  e.preventDefault();

    const data = {

      verificationCode: otp.join(''),
      token:token,
      expirationDate: expirationDate,
      email:email
    };
    console.log(data);

    axios.post('https://dollar-wala-server.vercel.app/api/authenticate/confirm', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(response => {
        console.log("send for approval");
        window.alert(response.data.message);
        navigate('../../../login');
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  
    }
  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Enter OTP for Authentication</h1>
      <form >
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
        
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: '#a5a1a1' }}>
          <button onClick={handleSubmit} type="submit" style={buttonStyle}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticateForm;
