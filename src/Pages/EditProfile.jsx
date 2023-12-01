import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const EditProfile = () => {

  const [imagePreview,setImagePreview] = useState('');
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    image: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    try {
      // Make a request to get user data based on user ID
      const response = await axios.get(`http://localhost:5000/api/users/${user.id}`);

      // Update the state with the fetched user data
      setEditedUser({
        name: response.data.name,
        email: response.data.email,
        address: response.data.address || '',
        phoneNumber: response.data.phoneNumber || '',
        image: response.data.image || '',
      });

      setImagePreview(`http://localhost:5000/${response.data.image}`);

      console.log(user.id)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview with the base64 representation of the selected image
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read the selected image as a data URL
      setEditedUser({
        ...editedUser,
        image: file,
      });
    } else {
      setImagePreview(''); // Clear the image preview if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(editedUser)
      // Send a request to update the user's profile
      await axios.put('http://localhost:5000/api/users/edit', editedUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const user = JSON.parse(localStorage.getItem('userData'));
      localStorage.setItem('userData', JSON.stringify({ ...editedUser ,  image: editedUser.image && typeof editedUser.image === 'string'
          ? (editedUser.image).startsWith('uploads/') ? editedUser.image : 'uploads/' + editedUser.image
          : 'uploads/' + editedUser.image.name,
        id: user.id}));
      alert('Profile updated successfully!');
      fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container>
      <h5 className='text-center mt-5 mb-3'>Edit Personal Information</h5>
      <Form onSubmit={handleSubmit}>
        <Row className="text-center mb-3">
          <Form.Group>
            {editedUser.image && (
              <img src={imagePreview} style={{ maxWidth: '100px', marginBottom: '10px' }} />
            )}
          </Form.Group>
          <Col>
            <Form.Control type="file" accept="image/*" onChange={(e) =>handleImageChange(e.target.files[0])} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={editedUser.email} readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" name="address" value={editedUser.address} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={editedUser.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className=" text-center mt-4 mb-4">
          <Button variant="secondary" type="submit">
            Save Changes
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default EditProfile;
