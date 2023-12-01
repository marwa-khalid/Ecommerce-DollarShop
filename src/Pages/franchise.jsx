import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Franchise = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [preferredLocation, setLocation] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      preferredLocation: preferredLocation
    }
    axios
    .post("https://dollarwala-server-production.up.railway.app/api/franchise", data
    , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("data entered Successful");
      setSuccess(response.data.message);
      setError('');
    })
    .catch((error) => {
        setError(error.response.data.message);
        setSuccess('');
        
    });

  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-3">Sell a Franchise</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            value={phoneNumber}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Preferred Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter preferred location for the franchise"
            value={preferredLocation}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </Form.Group>
        <Button style={{marginTop: 10}} variant="primary" type="submit">
          Submit
        </Button>
        {
      success && <p style={{ color: 'green', fontSize: '16px', marginTop: 10, textAlign: 'center'}}>{success}</p>}
      {error && <p style={{ color: 'red', fontSize: '16px', marginTop: 10, textAlign: 'center' }}>{error}</p>}
      </Form>
     

    </Container>
  );
}

export default Franchise;
