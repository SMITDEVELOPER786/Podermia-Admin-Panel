import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AdminDashboard from "./pages/AdminDashboard";
import ActivityLog from "./OverviewTabs/ActivityLog";
import ManageUsers from "./OverviewTabs/ManageUsers";
import AdminReferrals from "./OverviewTabs/AdminReferrals";
import LoansPage from "../src/pages/Loans";
import AdminPanel from "./adminDashboardTabs/AdminPanel";
import LoginPage from "./auth/Login";
import TwoFactorPage from "./auth/Twofactorauth";
import Notifications from "./adminDashboardTabs/Notifications";
import AllTransactions from "./adminDashboardTabs/AllTransactions";
const isAuthenticated = () => !!localStorage.getItem("token");
const isTwoFAComplete = () => !!localStorage.getItem("2fa");

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isTwoFAComplete()) return <Navigate to="/2fa" replace />;
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/2fa" element={<TwoFactorPage />} />

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
      <Route
        path="/loans"
        element={
          <PrivateRoute>
            <LoansPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-panel"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/all-transactions"
        element={
          <PrivateRoute>
            <AllTransactions />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
