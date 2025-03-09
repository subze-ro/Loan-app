import React from "react";
import { useForm } from "react-hook-form";
import { useCustomer } from "../context/CustomerContext";

const CustomerPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { customers, addCustomer, deleteCustomer } = useCustomer();

  const onSubmit = (data) => {
    addCustomer(data.name, data.email, data.phone, data.address);
    reset();
  };

  return (
    <div className="flex gap-8 p-8 bg-red-100 min-h-screen">
      {/* Form Section */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-red-600 text-xl font-bold mb-4">Add Customer</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
            Add Customer
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-red-600 text-xl font-bold mb-4">Customer List</h2>
        <table className="w-full border-collapse border border-red-300">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border">
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.phone}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;
