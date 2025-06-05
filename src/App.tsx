import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Clients from './pages/Clients'
import Documents from './pages/Documents'
import Reports from './pages/Reports'
import { useStore } from './store/useStore'
import './styles/globals.css'

function App() {
  const { isAuthenticated } = useStore()

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/clientes" element={<Clients />} />
                  <Route path="/documentos" element={<Documents />} />
                  <Route path="/relatorios" element={<Reports />} />
                  <Route path="/configuracoes" element={<div>Configurações</div>} />
                  <Route path="*" element={<div>404 - Página não encontrada</div>} />
                </Routes>
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
