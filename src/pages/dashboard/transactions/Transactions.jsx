import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Button, Table } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [transactionData, setTransactionData] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const getTransactions = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/bills", { headers });
      setTransactionData(response.data.data);
      console.log(token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkTransactionData = () => {
    console.log(transactionData);
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
          <Button onClick={checkTransactionData} variant="primary">
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
              {transactionData.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.customer.id}</td>
                  <td>
                    <span className="fw-bold">{transaction.customer.name}</span>
                    <br />
                    {} Transaksi
                  </td>
                  <td>
                    <Button variant="primary">Detail</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Transactions);
