import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const CreateRide = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    pickupLocation: Yup.string().required("Required"),
    dropoffLocation: Yup.string().required("Required"),
    date: Yup.date().required("Required").min(new Date(), "Date must be in the future"),
    time: Yup.string().required("Required"),
    seats: Yup.number().required("Required").min(1, "At least 1 seat").max(8, "Maximum 8 seats"),
    price: Yup.number().required("Required").min(0, "Price must be positive"),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/rides", values);
      toast.success("Ride created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create ride");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Offer a Ride</h1>
        
        <Formik
          initialValues={{
            pickupLocation: "",
            dropoffLocation: "",
            date: "",
            time: "",
            seats: 1,
            price: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <Field
                  name="pickupLocation"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter pickup location"
                />
                <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Location
                </label>
                <Field
                  name="dropoffLocation"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter dropoff location"
                />
                <ErrorMessage name="dropoffLocation" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <Field
                  name="date"
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <Field
                  name="time"
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats
                </label>
                <Field
                  name="seats"
                  type="number"
                  min="1"
                  max="8"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="seats" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Seat ($)
                </label>
                <Field
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <Field
                name="description"
                as="textarea"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional details about the ride..."
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Ride"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateRide;
