// import React, { useState } from "react";
// import "./sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div
//           className={`bg-dark col-auto col-md-3 min-vh-100 d-flex flex-column justify-content-between sidebar ${
//             isOpen ? "open" : "closed"
//           }`}
//         >
//           <div>
//             <button
//               className="btn btn-primary my-3"
//               type="button"
//               onClick={toggleSidebar}
//             >
//               <i className="bi bi-list"></i>
//             </button>
//             <a
//               className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2 dashboard-link"
//               href="#"
//             >
//               <i className="text-light fs-4 bi bi-speedometer2"></i>
//               <span className="ms-1 fs-4">Dashboard</span>
//             </a>
//             <hr className="text-secondary d-none d-sm-block" />
//             <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
//               <li className="nav-item text-white fs-4 my-1">
//                 <a href="#" className="nav-link text-white fs-5">
//                   <i className="bi bi-house"></i>
//                   <span className="ms-3">Home</span>
//                 </a>
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a href="#" className="nav-link text-white fs-5">
//                   <i className="bi bi-people"></i>
//                   <span className="ms-3">Customers</span>
//                 </a>
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a href="#" className="nav-link text-white fs-5">
//                   <i className="bi bi-bar-chart"></i>
//                   <span className="ms-3">Products</span>
//                 </a>
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a href="#" className="nav-link text-white fs-5">
//                   <i className="bi bi-credit-card"></i>
//                   <span className="ms-3">Transactions</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="dropdown open p-3">
//             <a
//               className="text-decoration-none text-white d-flex align-items-center dropdown-toggle"
//               id="triggerId"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//               role="button"
//               href="#"
//             >
//               <i className="bi bi-person-circle"></i>
//               <span className="ms-2">User</span>
//             </a>
//             <div className="dropdown-menu" aria-labelledby="triggerId">
//               <a href="#" className="dropdown-item">
//                 Profile
//               </a>
//               <a href="#" className="dropdown-item">
//                 Settings
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
            <a href="#" className="nav-link text-white fs-5">
              <i className="bi bi-people"></i>
              <span className="ms-3">Customers</span>
            </a>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <a href="#" className="nav-link text-white fs-5">
              <i className="bi bi-bar-chart"></i>
              <span className="ms-3">Products</span>
            </a>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <a href="#" className="nav-link text-white fs-5">
              <i className="bi bi-credit-card"></i>
              <span className="ms-3">Transactions</span>
            </a>
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
          <a href="#" className="dropdown-item">
            Profile
          </a>
          <a href="#" className="dropdown-item">
            Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

