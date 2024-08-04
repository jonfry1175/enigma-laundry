import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { IsAuth } from "../../hoc/checkAuth";
import { setCustomers } from "../../store/actions/customerActions";
import { useDispatch } from "react-redux";
import CreateCustomer from "../../components/modals/CreateCustomerModal";
import EditCustomerModal from "../../components/modals/EditCustomerModal";

const Customer = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // State to control the visibility of the Create Customer modal

  const token = useSelector((state) => state.auth.authData.token);

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

  const deleteCustomer = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.delete(`/customers/${id}`, { headers });

      if (result.status === 204) {
        toast.success("Delete Success");
        getCustomers();
      }
    } catch (error) {
      toast.error("Delete Failed");
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
          onClick: () => { }
        }
      ]
    });
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  }

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const fetchCustomers = () => {
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
          <div >
            <h1 className="text-center">Customer List</h1>
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
                {customers.map((customer, index) => (
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
                      <span className="disabled-cursor">
                      <Button
                        onClick={() => handleDeleteClick(customer.id)}
                        variant="danger"
                        className="mx-2"
                        disabled={index === 0 || index === 1}
                      >
                        Delete
                      </Button>
                      </span>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>

     {/* Edit Customer Modal */}
      {selectedCustomer && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <EditCustomerModal 
          customer={selectedCustomer} 
          handleClose={() => setShowEditModal(false)}/>
        </Modal>
      )}

      {/* Create Customer Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
      <CreateCustomer handleClose={() => setShowCreateModal(false)}/>
      </Modal>
    </div>
  );
};

export default IsAuth(Customer);
