import { Routes, Route, Navigate } from "react-router-dom"
import Vestidos from "./pages/Vestidos"
import Alquileres from "./pages/Alquileres"
import AlquileresActivos from "./pages/AlquileresActivos"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/vestidos" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vestidos"
        element={
          <ProtectedRoute>
            <Vestidos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alquileres"
        element={
          <ProtectedRoute>
            <Alquileres />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alquileres-activos"
        element={
          <ProtectedRoute>
            <AlquileresActivos />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
