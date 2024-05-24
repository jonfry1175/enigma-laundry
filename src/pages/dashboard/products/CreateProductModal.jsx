import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "sonner";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";

const CreateProductModal = ({ show, handleClose, handleCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
  });
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post("/products/", formData, {
        headers,
      });
      if (response.status === 201) {
        toast.success("Product Created Successfully");
        handleCreate(response.data); // Pass newly created product data to the parent component
        handleClose(); // Close the modal after successful creation
      }

      
    } catch (error) {
      if(error.response.status === 403) {
        toast.error("Wajib Login Menggunakan Akun Admin");
      } else {
        console.log(error.message);
      }
      
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
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
    </Modal>
  );
};

export default CreateProductModal;
