import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
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
      <section className="vh-100 bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'}}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: 15}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <Form onFinish={onFinish} layout="vertical">
                      <Form.Item
                        name="name"
                        label="Your Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                      >
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Your Email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                      >
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password size="large" />
                      </Form.Item>
                      <Form.Item
                        name="confirmPassword"
                        label="Repeat your password"
                        rules={[
                          { required: true, message: 'Please repeat your password!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                          }),
                        ]}
                      >
                
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body btn" loading={loading}>
                          Register
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link></p>
                      </Form.Item>
                    </Form>
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

export default Register;
