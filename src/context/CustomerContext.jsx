import { createContext, useContext, useState, useEffect } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  // Add Customer
  const addCustomer = (name, email, phone, address) => {
    if (!name || !email || !phone || !address)
      return alert("Fill all the fields");

    const newCustomer = { id: Date.now(), name, email, phone, address };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    alert("Customer added successfully");
  };

  // Update Customer
  const updateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  // Delete Customer
  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  return (
    <CustomerContext.Provider
      value={{ customers, addCustomer, updateCustomer, deleteCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
