import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateCustomer } from '../../store/actions/customerActions';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'sonner';

const EditCustomerModal = ({ handleClose, customer }) => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authData.token);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/customers/`, formData, { headers });

      if (result.status === 200) {
        toast.success("Update Success");
        dispatch(updateCustomer(formData));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
    }
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
