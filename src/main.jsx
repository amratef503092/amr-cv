import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import App from './App'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import './index.css'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F0F23',
        color: '#FFFFFF'
      }}>
        <div style={{ fontSize: '20px' }}>Loading...</div>
      </div>
    )
  }

  return user ? children : <Navigate to="/admin/login" replace />
}

function Root() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public CV */}
          <Route path="/" element={<App />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Dashboard */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any other /admin/* to login */}
          <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
