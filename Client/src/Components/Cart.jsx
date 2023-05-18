import { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Your Cart</h1>
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
      <div className="d-flex justify-content-between">
        <Button variant="secondary">Edit Order</Button>
       
        <Button variant="primary">proceed to pay</Button>
      
      </div>
    </Container>
  );
};

export default Cart;
