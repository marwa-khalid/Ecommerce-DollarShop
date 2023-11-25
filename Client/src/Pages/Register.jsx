import React, { useState } from 'react';
import bg from '../images/register.jpg';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const [emailErr,setEmailErr] = useState("");
  const [nameErr,setNameErr]  = useState("");
  const [addressErr,setAddressErr] = useState("");
  const [phoneNumberErr,setPhoneNumberErr] = useState("");
  const [passwordErr,setPasswordErr] = useState("");
  const [imageErr, setImageError] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (file) => {
    if (file.files.length > 0) {
      setImage(file.files[0]); 
    }
  }
  
    const handleRegister = async () => {

      if(name.length < 3){
        setNameErr("Name should be at least 3 characters long");
        return;
      }else setNameErr('');
      if(!email){
          setEmailErr("Email is required");
          return;
      }else setEmailErr('');
      if(!email.includes("@") || !email.includes(".com")){
          setEmailErr(`Email must include "@" and a ".com"`);
          return;
      }else setEmailErr('');     
      if(!address){
          setAddressErr("Address is required.");
          return;
      }else setAddressErr('');
      if(phoneNumber.length < 11){
          setPhoneNumberErr("Phone number is incorrect.");
          return;
      }else setPhoneNumberErr('');
      if(!password){
          setPasswordErr("Password is required.");
          return;
      }else setPasswordErr('');
      if(password.length < 8){
        setPasswordErr("Password should be at least 8 characters long");
        return;
      }else setPasswordErr('');
      if(!image) {
        setImageError('Please select a valid image file.'); 
      } else setImageError(''); 
      console.log(image)

      axios.post('http://localhost:5000/api/users/register', {
        name,
        image,
        email,
        password,
        phoneNumber,
        address,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      )
      .then((response) => {
        
        axios.post(`http://localhost:5000/api/authenticate`,{email})
          .then((response)=>{
            console.log("working")
            const token = response.data.token.token;
            const expirationDate = response.data.token.tokenExpiration;
            navigate(`/Register/Authenticate/${token}/${expirationDate}`)
            console.log("working")
            
          })
          .catch((err)=>{
            alert(err.response.data.message)
          })
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
            setError(error.response.data.message);
        } 
        else if (error.response && error.response.status === 400) {
            setError(error.response.data.message);
        }
        else {
            setError('Error:', error);
        }
      })
  }
    
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card shadow rounded-3" style={{ width: '100%' }}> {/* Set card width to 100% */}
              <div className="row g-0">
                <div className="col-md-6 bg-dark text-white d-flex justify-content-center">
                  <img src={bg} alt="Registration" className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <div className="card-body p-4">

                    <h3 className="mb-4">Sign up</h3>

                    <form>
                      <div className="mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          placeholder="Full Name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                          required autoFocus 
                        />
                        {nameErr && <p style={{ color: 'red', fontSize: '16px' }}>{nameErr}</p>}
                      </div>

                      <div className="mb-3">
                        <input 
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailErr && <p style={{ color: 'red', fontSize: '16px' }}>{emailErr}</p>}
                      </div>

                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          id="address"
                          value={address}
                          placeholder="Address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        {addressErr && <p style={{ color: 'red', fontSize: '16px' }}>{addressErr}</p>}
                      </div>

                      <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {phoneNumberErr && <p style={{ color: 'red', fontSize: '16px' }}>{phoneNumberErr}</p>}
                      </div>

                      <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordErr && <p style={{ color: 'red', fontSize: '16px' }}>{passwordErr}</p>}
                      </div>

                      <div className="file mb-3">
                      {/* <label>Choose File</label>
                      <input type="file" id="fileInput" /> */}
                      <label>Choose File</label>
                        <input
                          type="file"
                          id="fileInput"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            setImage(selectedFile);
                          }}
                        />
                        
                        {imageErr && <p style={{ color: 'red', fontSize: '16px' }}>{imageErr}</p>}
                      </div>

                      <div className="d-grid">
                        <button type="button" className="btn btn-dark btn-lg" onClick={handleRegister}>
                            Register
                        </button>
                      </div>
                      {error && <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
