import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await register(values.name, values.email, values.password);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
        </div>
        <Formik initialValues={{ name: "", email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <div>
              <Field name="name" type="text" placeholder="Full Name" className="w-full p-3 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="email" type="email" placeholder="Email" className="w-full p-3 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </Form>
        </Formik>
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
