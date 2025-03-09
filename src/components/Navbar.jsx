import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-red-600">Loan App</div>
      <div className="space-x-6">
        {user && (
          <>
            <Link to="/Dashboard" className="text-gray-700 hover:text-red-600">
              Dashboard
            </Link>
            <Link
              to="/CustomerPage"
              className="text-gray-700 hover:text-red-600"
            >
              Customers
            </Link>
            <Link to="/LoanForm" className="text-gray-700 hover:text-red-600">
              Loans
            </Link>
          </>
        )}
      </div>
      {user ? (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/Login"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
