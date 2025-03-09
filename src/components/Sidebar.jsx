import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, DollarSign, BarChart2, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-red-600 text-white h-screen p-6 flex flex-col space-y-6">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/CustomerPage"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <Users className="w-5 h-5" />
          <span>Customers</span>
        </Link>
        <Link
          to="/LoanForm"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <DollarSign className="w-5 h-5" />
          <span>Loans</span>
        </Link>
        <Link
          to="/Dashboard"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <BarChart2 className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          to="/Login"
          className="flex items-center space-x-2 text-red-400 hover:text-red-600"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-white">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
