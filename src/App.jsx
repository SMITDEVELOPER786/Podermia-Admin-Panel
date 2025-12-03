import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AdminDashboard from "./pages/AdminDashboard";
import ActivityLog from "./OverviewTabs/ActivityLog";
import ManageUsers from "./OverviewTabs/ManageUsers";
import AdminReferrals from "./OverviewTabs/AdminReferrals";

import LoginPage from "./auth/Login";
import TwoFactorPage from "./auth/Twofactorauth";

// Auth checks
const isAuthenticated = () => !!localStorage.getItem("token");
const isTwoFAComplete = () => !!localStorage.getItem("2fa");

// PrivateRoute using children
const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isTwoFAComplete()) return <Navigate to="/2fa" replace />;
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/2fa" element={<TwoFactorPage />} />

      {/* DASHBOARD ROUTES */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <PrivateRoute>
            <ActivityLog />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/referrals"
        element={
          <PrivateRoute>
            <AdminReferrals />
          </PrivateRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
