import { useEffect, useState } from "react"
import {
  obtenerAlquileresActivos,
  cerrarAlquiler,
} from "../services/rentals"
import Layout from "../components/Layout"

function AlquileresActivos() {
  const [alquileres, setAlquileres] = useState([])
  const [loading, setLoading] = useState(false)

  const cargar = async () => {
    setLoading(true)
    const data = await obtenerAlquileresActivos()
    setAlquileres(data)
    setLoading(false)
  }

  useEffect(() => {
    cargar()
  }, [])

  const cerrar = async (rental) => {
    if (!confirm("¿Confirmar devolución del vestido?")) return
    await cerrarAlquiler(rental.id, rental.dressId)
    cargar()
  }

  return (
    <Layout>
    <div style={{ padding: "20px" }}>
      <h2>Alquileres Activos</h2>

      {loading && <p>Cargando...</p>}

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Vestido</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Evento</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Entrega</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Devolución</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Cliente</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Pago</th>
            <th style={{ borderColor: "#ddd", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alquileres.map((r) => (
            <tr key={r.id} style={{ borderColor: "#ddd" }}>
              <td style={{ borderColor: "#ddd" }}>{r.dressNumber}</td>
              <td style={{ borderColor: "#ddd" }}>{r.event}</td>
              <td style={{ borderColor: "#ddd" }}>{r.startDate.toDate().toLocaleDateString()}</td>
              <td style={{ borderColor: "#ddd" }}>{r.endDate.toDate().toLocaleDateString()}</td>
              <td style={{ borderColor: "#ddd" }}>
                <strong>{r.client.name}</strong>
                <br />
                <span style={{ fontSize: "13px", color: "#666" }}>{r.client.phone}</span>
              </td>
              <td style={{ borderColor: "#ddd" }}>
                <span style={{ fontWeight: "bold" }}>${r.payment.paid}</span> / ${r.payment.total}
              </td>
              <td style={{ borderColor: "#ddd", textAlign: "center" }}>
                <button 
                  onClick={() => cerrar(r)}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Cerrar
                </button>
              </td>
            </tr>
          ))}

          {!loading && alquileres.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                No hay alquileres activos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </Layout>
  )
}

export default AlquileresActivos
