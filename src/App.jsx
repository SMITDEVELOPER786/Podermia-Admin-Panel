import React from "react";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import ActivityLog from "./OverviewTabs/ActivityLog";
import { Routes, Route } from "react-router-dom";
import ManageUsers from "./OverviewTabs/ManageUsers";
import AdminReferrals from "./OverviewTabs/AdminReferrals";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/logs" element={<ActivityLog />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/admin/referrals" element={<AdminReferrals />} />
      </Routes>
    </div>
  );
};

export default App;
