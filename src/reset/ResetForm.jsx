import React, { useState } from 'react';
import axios from 'axios';
import './ResetForm.css'; // Import the CSS file for your component
import { useNavigate } from 'react-router-dom';

const ResetForm = () => {
  const [email, setEmail] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('https://dollar-wala-server.vercel.app/api/reset', {email},{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        
        navigate(`/login/reset/Confirm/${email}`);
        window.alert("Verification code send to mail");
      })
      .catch(error => {
      });
    
  };

  return (
    <div className="centered-container">
      <h1 style={{ marginBottom: '40px', padding: '20px'}}>Reset Your Password</h1>
    
     
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input"
          />
          <button
            type="submit"
            className={`hovered-button ${isButtonHovered ? 'hovered-button' : ''}`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
         >
            Send Verification Code
          </button>
        </form>
      
    </div>
  );
}

export default ResetForm;
