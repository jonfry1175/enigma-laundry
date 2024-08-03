import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button } from "react-bootstrap";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import { useSelector } from "react-redux";
import { IsAuth } from "../../../hoc/checkAuth";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../store/actions/dataActions";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = useSelector((state) => state.auth.authData.token);
  const role = useSelector((state) => state.auth.authData.role);

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

  const deleteProduct = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const result = await axiosInstance.delete(`/products/${id}`, { headers });
      if (result.status === 204) {
        toast.success("Delete Success");
        getProducts();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Delete Failed");
    }
  };

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Apakah kamu yakin untuk menghapus?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateProduct = (newProduct) => {
    getProducts();
  };

  const handleEditClick = (customer) => {
    setSelectedProduct(customer);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/products/`, updatedData, {
        headers,
      });
      if (result.status === 200) {
        toast.success("Update Success");
        getProducts();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Update Failed");
    }
  };

  useEffect(() => {
    getProducts();
    console.log(role);
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <h1 className="text-center">Product</h1>
          <Button onClick={handleCreateClick} variant="primary" className={role === "admin" ? "" : "d-none"}>
            Add Product
          </Button>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.type}</td>
                  <td>
                    <Button 
                    onClick={() => handleEditClick(product)}
                    variant="success" className="mx-2">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(product.id)}
                      variant="danger"
                      className="mx-2"
                      disabled={index === 0 || index === 1}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <CreateProductModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        handleCreate={handleCreateProduct}
      />

      {setSelectedProduct && (
        <EditProductModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          product={selectedProduct}
          handleSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default IsAuth(Product);
