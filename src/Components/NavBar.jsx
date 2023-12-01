import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout, login } from '../redux/UserSlice';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log("User Data:", user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = localStorage.getItem('userData');

  useEffect(() => {
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(login(parsedUserData));
    }
  }, [userData]);

  const handleLogout = () => {
    toggleDropdown();
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle the state when this function is called
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-npm bold fw-15" to="/">Dollar Wala</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">Product</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Reviews">Reviews</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Franchise">Franchise</NavLink>
              </li>
            </ul>
          </div>
          <div className="buttons">
            {user ? (
              <>
                <div className="user-dropdown" >
                  <NavLink to="/cart" className="btn mx-2" >
                      <i className="fa fa-lg fa-shopping-cart me-1"></i>
                  </NavLink>
                    <img className='rounded-circle' src={`http://localhost:5000/${user.image}`}  style={{ width: '40px', height: '40px' }}  alt="" onClick={toggleDropdown}/>
                    {showDropdown && (
                      <div className="dropdown-menu dropdown-menu-end show">
                        <div className="d-flex flex-column align-items-center">
                          <img
                            className='rounded-circle mb-2'
                            src={`http://localhost:5000/${user.image}`}
                            style={{ width: '80px', height: '80px' }}
                            alt={user.name}
                          />
                          <span className="fw-bold">{user.name}</span>
                        </div>
                        <hr />
                        <button onClick={() => {toggleDropdown(); navigate('/EditProfile')}} className="dropdown-item">Edit Profile</button>
                        <button onClick={() => {toggleDropdown(); navigate('/orders')}} className="dropdown-item">My Orders</button>
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/cart" className="btn mx-2" >
                    <i className="fa fa-lg fa-shopping-cart me-1"></i>
                </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark ">
                  <i className="fa fa-sign-in me-1"></i>Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-user-plus me-1"></i>Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
