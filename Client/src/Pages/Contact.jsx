import { Form, Button } from 'react-bootstrap';

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
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
       <Form.Control type="text" name="name" placeholder="Enter your name" required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formEmail">
       <Form.Label>Email</Form.Label>
       <Form.Control type="email" name="email" placeholder="Enter your email" required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formSubject">
       <Form.Label>Subject</Form.Label>
       <Form.Control type="text" name="subject" placeholder="Enter the subject" required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formMessage">
       <Form.Label>Message</Form.Label>
       <Form.Control as="textarea" rows={2} name="message" placeholder="Enter your message" required />
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
