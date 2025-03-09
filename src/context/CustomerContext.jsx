import { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const CustomerContext = createContext();

// Provide context
export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState([]);

  // On page load, retrieve stored customer data
  useEffect(() => {
    const storedCustomer = localStorage.getItem("newcustomer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  // Add customer
  const createCustomer = (fullName, nationaId, phoneNumber, emailAddress, homeAddress, employmentStatus, monthlyIncome, guranterName, dateRegistered) => {
    if (!fullName || !nationaId || !phoneNumber || !emailAddress || !homeAddress || !employmentStatus || !monthlyIncome || !guranterName || !dateRegistered)
      return alert('Fill all fields');

    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    if (customers.some((c) => c.fullName === fullName)) {
      return alert("Customer already exists");
    }

    customers.push({ fullName, nationaId, phoneNumber, emailAddress, homeAddress, employmentStatus, monthlyIncome, guranterName, dateRegistered });
    localStorage.setItem("customers", JSON.stringify(customers));
    alert("Customer added successfully");
  };

  // View customer
  const viewCustomer = (fullName) => {
    const storedCustomer = JSON.parse(localStorage.getItem("customers"));
    return storedCustomer?.find((customer) => customer.fullName === fullName);
  };

  // Update customer
  const updateCustomer = (updatedCustomer) => {
    let storedCustomer = JSON.parse(localStorage.getItem("customers")) || [];

    storedCustomer = storedCustomer.map((customer) =>
      customer.fullName === updatedCustomer.fullName ? updatedCustomer : customer
    );

    localStorage.setItem("customers", JSON.stringify(storedCustomer));
    setCustomer(storedCustomer);
  };

  // Delete customer
  const deleteCustomer = () => {
    localStorage.removeItem("newcustomer");
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{ customer, createCustomer, viewCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

// ✅ Corrected useCustomer hook
export const useCustomer = () => useContext(CustomerContext);
