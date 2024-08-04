import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../store/actions/customerActions";

const CreateCustomer = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const token = useSelector((state) => state.auth.authData.token);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post("/customers/", formData, {
        headers,
      });
      if (response.status === 201) {
        toast.success("Customer Created Successfully");
        dispatch(addCustomer(response.data.data));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("server error");
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Customer</Modal.Title>
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
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
      </>
  );
};

export default CreateCustomer;
