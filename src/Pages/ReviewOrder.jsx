import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ReviewOrder() {
  const [productId, setProductId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      productId: productId,
      rating: rating,
      comment: comment,
    });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Add a Review</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your productId"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          >
            <option value="">Select a rating</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formComment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
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

export default ReviewOrder;
