import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        </div>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <div>
              <Field name="email" type="email" placeholder="Email" className="w-full p-3 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </Form>
        </Formik>
        <p className="text-center">
          Dont have an account? <Link to="/register" className="text-blue-600">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
