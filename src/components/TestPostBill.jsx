import React from 'react'
import { axiosInstance } from "../lib/axios";
import { Button } from 'react-bootstrap';
import { toast } from "sonner";
import axios from "axios";

const token = localStorage.getItem("token");

const testPostBill = () => {
    const createTransaction = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const payload = {
            customerId: "b32eed7d-052a-4711-bcad-0bc577654883",
            billDetails: [
              {
                product: {
                  id: "e2f7be9c-0b63-4064-bf53-6830b40fd63b",
                },
                qty: 9,
              },
            ],
          };
          // localhost:8888/api/v1/bills
          await axiosInstance.post("/bills", payload, { headers });
          // const response = await axios.post("http://localhost:8010/api/v1/bills", payload, { headers });
          if(response.status === 201) {
            toast.success("Transaction Created Successfully");
          } else {
            toast.error("Transaction Failed");
          }
          console.log(response.data.data);
          console.log(payload);
        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <div>
        <Button onClick={createTransaction}>test</Button>
    </div>
  )
}

export default testPostBill