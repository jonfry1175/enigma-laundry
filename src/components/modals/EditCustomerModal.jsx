import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCustomerModal = ({ handleClose, customer, handleSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(customer.id, formData);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default EditCustomerModal;
