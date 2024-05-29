import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import EditCustomerModal from "./EditCustomerModal"; 
import CreateCustomerModal from "./CreateCustomerModal";
import Sidebar from "../../../components/Sidebar";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // State to control the visibility of the Create Customer modal

  const token = useSelector((state) => state.auth.token);
  // const token = localStorage.getItem("token");


  const getCustomers = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/customers", { headers });
      setCustomerData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.delete(`/customers/${id}`, { headers });
      
      if(result.status === 204) {
        toast.success("Delete Success");
        getCustomers();
      }
    } catch (error) {
        console.log(error.message)
    }
  }

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Apakah kamu yakin untuk menghapus?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCustomer(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  }

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/customers/`, updatedData, { headers });
      
      if (result.status === 200) {
        toast.success("Update Success");
        getCustomers();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateCustomer = (newCustomer) => {
    setCustomerData([...customerData, newCustomer]); // Add the newly created customer to the customerData array
    getCustomers();
  };


  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="text-center">
            <h1>List Pelanggan</h1>
            <Button variant="primary" onClick={handleCreateClick}>Create Customer</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>
                      <Button 
                        onClick={() => handleEditClick(customer)}
                        variant="success"
                        className="mx-2">Edit</Button>
                      <Button 
                        onClick={() => handleDeleteClick(customer.id)}
                        variant="danger"
                        className="mx-2">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <EditCustomerModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          customer={selectedCustomer}
          handleSave={handleSaveChanges}
        />
      )}

       <CreateCustomerModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        handleCreate={handleCreateCustomer}
      />
    </div>
  );
};

export default withAuth(Customer);
