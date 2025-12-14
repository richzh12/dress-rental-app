import { Link, useNavigate } from "react-router-dom"
import { logout } from "../services/auth"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    if (!confirm("¿Cerrar sesión?")) return

    await logout()
    navigate("/login")
  }

  return (
    <nav
      style={{
        background: "black",
        color: "#fff",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "28px" }}>Elegance Event Supplies</div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/vestidos" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
          Vestidos
        </Link>
        <Link to="/alquileres" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
          Crear Alquiler
        </Link>
        <Link to="/alquileres-activos" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
          Alquileres Activos
        </Link>

        <span style={{ fontSize: "14px" }}>{user?.email}</span>

        <button
          onClick={handleLogout}
          style={{
            background: "#c62828",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Salir
        </button>
      </div>
    </nav>
  )
}

export default Navbar
