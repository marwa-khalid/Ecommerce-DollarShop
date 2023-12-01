import React, { useState } from 'react';
import bg from '../images/register.png';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

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

      axios.post('https://dollarwala-server-production.up.railway.app/api/users/register', {
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
        
        axios.post(`https://dollarwala-server-production.up.railway.app/api/authenticate`,{email})
          .then((response)=>{
            console.log("working")
            const token = response.data.token.token;
            const expirationDate = response.data.token.tokenExpiration;
            const email = response.data.token.email;
            navigate(`/Register/Authenticate/${email}/${token}/${expirationDate}`)
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
    <Container className='p-5' >

      <Row>
        <h3 className="mb-4 text-center">Register at DollarWala!</h3>
      </Row>
        
            <Row>
              
              <Col md={6}>
                 
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                      />
                      {nameErr && <p style={{ color: 'red', fontSize: '16px' }}>{nameErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailErr && <p style={{ color: 'red', fontSize: '16px' }}>{emailErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {addressErr && <p style={{ color: 'red', fontSize: '16px' }}>{addressErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {phoneNumberErr && <p style={{ color: 'red', fontSize: '16px' }}>{phoneNumberErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordErr && <p style={{ color: 'red', fontSize: '16px' }}>{passwordErr}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          setImage(selectedFile);
                        }}
                      />
                      {imageErr && <p style={{ color: 'red', fontSize: '16px' }}>{imageErr}</p>}
                    </Form.Group>

                    
                    {error && <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
                  </Form>
              </Col>
              <Col md={6} className='mt-3 text-center'>
                <img src={bg} alt="Registration" className="img-fluid" />
                
                <Button variant="dark" size='md' className='mt-5 ' onClick={handleRegister}>
                  Register
                </Button>
              </Col>
            </Row>
    </Container>
  );
};

export default Register;
