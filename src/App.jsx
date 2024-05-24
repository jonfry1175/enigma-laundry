import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const Customer = lazy(() => import("./pages/dashboard/customers/Customer"));
const Product = lazy(() => import("./pages/dashboard/products/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Transactions = lazy(() =>
  import("./pages/dashboard/transactions/Transactions")
);

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard-customers" element={<Customer />} />
          <Route path="/dashboard-products" element={<Product />} />
          <Route path="/dashboard-transaction" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
