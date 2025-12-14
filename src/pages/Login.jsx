import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/auth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      navigate("/vestidos")
    } catch (err) {
      setError("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f4f4",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "360px",
        background: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "94%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "94%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "12px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  </div>
)}

export default Login
