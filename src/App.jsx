import "./App.css";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const Customer = lazy(() => import("./pages/dashboard/Customer"));
const Product = lazy(() => import("./pages/dashboard/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Transactions = lazy(() => import("./pages/dashboard/Transactions"));

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { refreshToken } from "./store/actions/authActions";

function App() {
  const dataAuth = useSelector((state) => state.auth?.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataAuth?.token) {
      const timeoutId = setTimeout(() => {
        dispatch(refreshToken());
      }, 1000 * 60 * 30); // refresh token setelah 30 menit
      // Membersihkan timeout saat komponen dibongkar atau token berubah
      return () => clearTimeout(timeoutId);
    }
  }, [dataAuth?.token, dispatch]);

  return (
    <>
      <Toaster position="top-center" richColors/>
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
