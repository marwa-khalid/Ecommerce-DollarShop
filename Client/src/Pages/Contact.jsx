import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name:name,
      email: email,
      subject: subject,
      message: message
    }
    axios
    .post("http://localhost:5000/api/contact", data
    , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("data entered Successful");
      window.alert(response.data.message);
    
    })
    .catch((error) => {
      window.alert(error.response.data.message);
        
        
    });

  };

  return (
<div className="vh-100 " style={{backgroundColor: "coral"}}>
    <div className="container py-5 h-100"  >
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-6 col-md-8">
      <div className="card p-5" style={{borderRadius:"1rem"}} >
   <h1>Contact Us</h1>
   <Form onSubmit={handleSubmit}>
     <Form.Group className="mb-3" controlId="formName">
       <Form.Label>Name</Form.Label>
       <Form.Control 
          type="text" 
          name="name" 
          placeholder="Enter your name"  
          value={name}
          onChange={(event) => setName(event.target.value)} required />
     </Form.Group>


     <Form.Group className="mb-3" controlId="formEmail">
       <Form.Label>Email</Form.Label>
       <Form.Control 
            type="email"
            name="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)} required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formSubject">
       <Form.Label>Subject</Form.Label>
       <Form.Control type="text" 
       name="subject" 
       placeholder="Enter the subject" 
        value={subject}
    onChange={(event) => setSubject(event.target.value)} required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formMessage">
       <Form.Label>Message</Form.Label>
       <Form.Control as="textarea" rows={2} name="message" placeholder="Enter your message"  value={message}
    onChange={(event) => setMessage(event.target.value)} required />
     </Form.Group>

     <Button variant="primary" type="submit">
       Submit
     </Button>
   </Form>

 </div>
 </div>
 </div>
 </div>
 </div>
   
  );
}


export default Contact;
