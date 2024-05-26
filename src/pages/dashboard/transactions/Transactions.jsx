import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Button, Table, Modal } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const getTransactions = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/bills", { headers });
      const transactions = response.data.data;

      const newCustomerData = {};

      transactions.forEach((transaction) => {
        const customerId = transaction.customer.id;

        // jika customer belum ada di objek newCustomerData, tambahkan entri baru
        if (!newCustomerData[customerId]) {
          newCustomerData[customerId] = {
            ...transaction.customer, // copy semua properti customer
            transactions: [], // tambahkan properti transactions
            transactionCount: 0, // tambahkan properti transactionCount
          };
        }
        // Tambahkan transaksi ke daftar transaksi pelanggan
        newCustomerData[customerId].transactions.push(transaction);
        // Tingkatkan jumlah transaksi pelanggan
        newCustomerData[customerId].transactionCount += 1;
      });

      setCustomerData(newCustomerData);
      console.log(token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const check = () => {
    console.table(customerData);
  };

  // ambil detail by customer id
  const handleClick = (customerData) => {
    setShowModal(true);
    setSelectedCustomer(customerData);
    console.log(customerData);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto ">
          <Sidebar />
        </div>
        <div className="col">
          <h1 className="text-center"> List Transaksi</h1>
          <Button onClick={check} variant="primary">
            Cek Transaksi
          </Button>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Kode Pelanggan</th>
                <th>Nama Pelanggan</th>
                <th>Label Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(customerData).map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.id}</td>
                  <td>
                    <span className="fw-bold">{customer.name}</span>
                    <br />
                    {customer.transactionCount} Transaksi
                  </td>
                  <td>
                    <Button
                      onClick={() => handleClick(customer)}
                      variant="primary"
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Riwayat Transaksi a.n {selectedCustomer?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Kode Transaksi</th>
                  <th>Tanggal Transaksi</th>
                  <th>QTY</th>
                  <th>Jenis Laundry</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.billDate}</td>
                    <td>
                      {transaction.billDetails.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )} 
                      {/* ambil product.type */}
                      {transaction.billDetails.map((item) => item.product.type)}
                    </td>
                    <td>
                      {transaction.billDetails.map((item) => item.product.name)}
                    </td>
                    <td>
                      {transaction.billDetails.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuth(Transactions);
