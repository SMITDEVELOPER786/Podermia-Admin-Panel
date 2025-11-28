import React from 'react'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import ActivityLog from './TabPages/ActivityLog'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  return (
       <div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/logs" element={<ActivityLog />} />
      </Routes>
    </div>
  )
}

export default App
