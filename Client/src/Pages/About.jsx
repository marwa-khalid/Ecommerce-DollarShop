import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <div className="vh-100 " style={{backgroundColor: "coral"}}>
    <Container>
      <h1>About Us</h1>
      <Row>
        <Col>
          <h2>Our Story</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel placerat elit. Suspendisse non gravida est, quis vestibulum nulla. Maecenas posuere ante velit, quis pharetra sem finibus vel. Sed euismod sem vel est dictum, at bibendum lacus tincidunt. Integer vehicula magna vel neque ultricies, id dignissim mi consequat. Fusce dictum velit sit amet nisi interdum fringilla. Praesent commodo, dolor vitae aliquam pharetra, eros nisl dignissim massa, vel laoreet nisi sapien in dolor. Suspendisse lacinia, odio quis egestas volutpat, sapien sapien varius nulla, sed finibus lectus nulla ut ante. Sed bibendum rhoncus ex, sed suscipit libero ultrices non. Suspendisse eget lectus ex.</p>
        </Col>
        <Col>
          <h2>Our Mission</h2>
          <p>Our mission is as simple as one could only think of , that is Reducing the retailer's Margins to the maximum and transferring the maximum benefits to our valued customers. We believe in making the impossible things possible. In this era of high inflation & high transportation cost our objective is to provide the quality products @ 1$ to our Customers at their door steps. Many organizations providing the 1$ items in the market by reducing the quality of products in this era of Inflation. But our mission is to provide the quality products to our customers by cutting down our margins @ the most economical price of 1$ only.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Our Approach</h2>
          <p>We deal in Cosmetics, Jewelry, Crockery, Mobile accessories, Men accessories, Decoration, Birthday Items, Toys, Kitchen Items, House hold products, Perfumes, Birthday Items, Stylish Stationery, Sun glasses, Key chains, Ladies undergarments & much more. we have a wide range of more than 1500 products of all the above categories and unique thing is that all above items are only for 1$. We Feel satisfied when customers curiously asks, Is this product is really for 1$ Only?</p>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default About;
