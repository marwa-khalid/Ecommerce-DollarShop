import { Container, Table, Button, Form } from 'react-bootstrap';

function pay() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Checkout</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product 1</td>
            <td>2</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>Product 2</td>
            <td>1</td>
            <td>$20.00</td>
          </tr>
          <tr>
            <td>Product 3</td>
            <td>3</td>
            <td>$5.00</td>
          </tr>
        </tbody>
      </Table>
      <h2 className="my-4">Shipping Information</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter your city" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="Enter your state" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Enter your zip code" required />
        </Form.Group>
        <h2 className="my-4">Payment Information</h2>
        <Form.Group className="mb-3" controlId="formCard">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="text" placeholder="Enter your credit card number" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formExp">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control type="text" placeholder="Enter expiration date (MM/YY)" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="Enter CVV" required />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary">Back to Cart</Button>
          <Button variant="primary">Place Order</Button>
        </div>
      </Form>
    </Container>
  );
}

export default pay;
