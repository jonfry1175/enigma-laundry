import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/actions/productActions';
import { toast } from 'sonner';
import { axiosInstance } from '../../lib/axios';

const EditProductModal = ({ handleClose, product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authData.token);
  
  const [formData, setFormData] = useState({
    id: "",
    name: '',
    price: '',
    type: ''
  });

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/products/`, formData, {
        headers,
      });
      if (result.status === 200) {
        toast.success("Update Success");
        dispatch(updateProduct(formData));
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Update Failed");
    }
  };

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type
      });
    }
  }, [ product ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

 

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveChanges}>
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
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

export default EditProductModal;
