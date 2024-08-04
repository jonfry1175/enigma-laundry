import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../store/actions/customerActions";
import { setProducts } from "../../store/actions/productActions";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import { Modal, Button, Form } from "react-bootstrap";
import { addTransaction } from "../../store/actions/transactionActions.js";

const CreateTransactionModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const customers = useSelector((state) => state.customer.customers);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [quantity, setQuantity] = useState(0);
    const token = useSelector((state) => state.auth.authData.token);

    // TODO: create Transaction
    const createTransaction = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const payload = {
                customerId: selectedCustomerId,
                billDetails: [
                    {
                        product: {
                            id: selectedProduct,
                        },
                        qty: quantity,
                    },
                ],
            };
            const response = await axiosInstance.post("/bills", payload, { headers });
            if (response.status === 201) {
                toast.success("Transaction Created Successfully");
                dispatch(addTransaction(response.data.data));
                setTimeout(() => {
                    handleClose();
                }, 500);
            } else {
                toast.error("Transaction Failed");
            }
            console.log(response.data.data);
            console.log(payload);
        } catch (error) {
            if (error?.response?.data?.status?.description) {
                toast.error("Data Tidak Valid");
            } else {
                console.log(error.message);
                toast.error("Create Transaction Failed");
            }
        }
    };

    // get product data
    const getProducts = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/products", { headers });
            dispatch(setProducts(response.data.data));
        } catch (error) {
            console.log(error.message);
        }
    };

    // get customer data
    const getCustomers = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/customers", { headers });
            dispatch(setCustomers(response.data.data));
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getProducts();
        getCustomers();
    }, []);
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Konsumen</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCustomerId}
                            onChange={(e) => setSelectedCustomerId(e.target.value)}
                        >
                            <option value="">Pilih Nama Konsumen</option>
                            {customers.map((customer, index) => (
                                <option key={customer.id} value={customer.id} disabled={index > 1}>
                                    {customer.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pilih Paket Laundry</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option value="">Pilih Paket Laundry</option>
                            {products.map((product, index) => (
                                <option key={product.id} value={product.id} disabled={index > 1}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Qty (Kg)</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createTransaction}>
                    Submit
                </Button>
            </Modal.Footer>
        </>
    )
}

export default CreateTransactionModal