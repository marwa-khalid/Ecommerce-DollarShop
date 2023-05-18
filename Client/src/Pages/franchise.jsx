import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Franchise() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name: name,
      email: email,
      phone: phone,
      location: location,
    });
   
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Sell a Franchise</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Preferred Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter preferred location for the franchise"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Franchise;
