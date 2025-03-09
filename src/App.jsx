import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoanProvider } from "./context/LoanContext";
import { CustomerProvider } from "./context/CustomerContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoanForm from "./pages/LoanForm";
import CustomerPage from "./pages/CustomerPage";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  return user ? (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-grow">{children}</main>
      </div>
    </div>
  ) : (
    children
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LoanProvider>
        <CustomerProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loanform"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <LoanForm />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customerpage"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <CustomerPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </CustomerProvider>
      </LoanProvider>
    </AuthProvider>
  );
};

export default App;
