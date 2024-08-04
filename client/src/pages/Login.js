import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login2.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login success");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: 185 }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Finance Tracker</h4>
                      </div>
                      <Form onFinish={onFinish}>
                        <p>Please login to your account</p>
                        <Form.Item
                          name="email"
                          rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                          <Input placeholder="Phone number or email address" />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                          <Input.Password placeholder="Password" />
                        </Form.Item>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            loading={loading}
                          >
                            Log in
                          </Button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <Link to="/register">
                            Not a user? Click Here to register!
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Keep a track of what you earn and spend</h4>
                      <p className="small mb-0">With our intuitive and secure platform, you can easily monitor your expenses, track your investments, and achieve your financial goals. Log in to access a world of insights and tools designed to empower you on your financial journey. Your path to smarter spending and saving starts here."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
