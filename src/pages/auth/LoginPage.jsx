import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { login } from "../../store/actions/authActions";
import { NotAuth } from "../../hoc/checkAuth";
import { jwtDecode } from "jwt-decode";

const validateForm = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { isValid } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
    mode: "onChange",
  });

  const LoginUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const token = response.data.data.token;
      const decoded = jwtDecode(token);
      const combined = { ...decoded, token };

      if (response.data.status.code === 201) {
        toast.success("Login Success");
        setTimeout(() => {
          dispatch(login(combined));
        }, 1000);
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      if (error?.response?.data?.status) {
        toast.error("invalid username or password");
      } else {
        toast.error("server error");
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    toast.info("Akun Demo Role Admin, Username: admin, Password: password");
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="login-form-container">
            <div className="text-center mb-4">
              <h2>Masuk Dashboard</h2>
            </div>
            <Form onSubmit={handleSubmit(LoginUser)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter username"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>
              <span className="disabled-cursor">
                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={!isValid}>
                  Masuk
                </Button>
              </span>

              <div className="text-center">
                <a href="#" className="d-block mb-2">
                  Lupa kata sandi?
                </a>
                <Link to={"/register"} className="d-block">
                  Belum punya akun? Daftar
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotAuth(LoginPage);
