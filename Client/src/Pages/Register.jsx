import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
  });

  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/register', userData);
      console.log(response.data);
      navigate('/Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vh-100 " style={{ backgroundColor: 'coral' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign up</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="FName"
                    className="form-control"
                    placeholder="First Name"
                    required
                    autoFocus
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="LName"
                    className="form-control"
                    placeholder="Last Name"
                    required
                    autoFocus
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email"
                    required
                    autoFocus
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="inputpass"
                    className="form-control"
                    placeholder="Password"
                    required
                    autoFocus
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label px-2" htmlFor="form1Example3">
                    Subscribe to our Newsletter
                  </label>
                </div>

                <div className="buttons">
                  <button className="btn btn-outline-dark btn-lg" onClick={handleRegister}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
