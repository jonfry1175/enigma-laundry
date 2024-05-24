import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";
import Customer from "./pages/dashboard/customers/Customer";
import Product from "./pages/dashboard/products/Product";
import Transactions from "./pages/dashboard/transactions/Transactions";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard-customers" element={<Customer />} />
        <Route path="/dashboard-products" element={<Product />} />
        <Route path="/dashboard-transaction" element={<Transactions/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
