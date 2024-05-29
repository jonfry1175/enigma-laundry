import React, { useState } from "react";
import "./sidebar.css";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { confirmAlert} from 'react-confirm-alert'
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Success");
    navigate("/");

  };

  const handleDeleteClick = () => {
    confirmAlert({
      title: 'Confirm to Logout',
      message: 'Apakah kamu yakin untuk keluar?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleLogout()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  return (
    <div
      className={`bg-dark min-vh-100 d-flex flex-column justify-content-between sidebar ${
        isOpen ? "open" : "closed"
      }`}
    >
      <div>
        <button
          className="btn btn-primary my-3"
          type="button"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
        <a
          className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2 dashboard-link"
          href="#"
        >
          <i className="text-light fs-4 bi bi-speedometer2"></i>
          <span className="ms-1 fs-4">Dashboard</span>
        </a>
        <hr className="text-secondary d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link 
            to={"/dashboard-customers"}
            className="nav-link text-white fs-5">
              <i className="bi bi-people"></i>
              <span className="ms-3">Customers</span>
            </Link>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link 
            to={"/dashboard-products"}
            className="nav-link text-white fs-5">
              <i className="bi bi-bar-chart"></i>
              <span className="ms-3">Products</span>
            </Link>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link 
            to={"/dashboard-transaction"}
            className="nav-link text-white fs-5">
              <i className="bi bi-credit-card"></i>
              <span className="ms-3">Transactions</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown open p-3">
        <a
          className="text-decoration-none text-white d-flex align-items-center dropdown-toggle"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          role="button"
          href="#"
        >
          <i className="bi bi-person-circle"></i>
          <span className="ms-2">User</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <Link to={"/"} className="dropdown-item">
            Home
          </Link>
          <Button 
          onClick={handleDeleteClick}
          className="dropdown-item">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

