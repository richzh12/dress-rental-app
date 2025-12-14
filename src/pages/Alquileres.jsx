import { useEffect, useState } from "react"
import { crearAlquiler } from "../services/rentals"
import { obtenerVestidos } from "../services/vestidos"
import Layout from "../components/Layout"

const initialForm = {
  dressId: "",
  event: "",
  startDate: "",
  endDate: "",
  clientName: "",
  clientPhone: "",
  total: "",
  paid: "",
}

function Alquileres() {
  const [vestidos, setVestidos] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    cargarVestidos()
  }, [])

  useEffect(() => {
    if (form.dressId) {
      const vestidoSeleccionado = vestidos.find(v => v.id === form.dressId)
      if (vestidoSeleccionado) {
        setForm({
          ...form,
          total: vestidoSeleccionado.price,
        })
      }
    }
  }, [form.dressId, vestidos])

  const cargarVestidos = async () => {
    const data = await obtenerVestidos()
    // solo disponibles
    setVestidos(data.filter(v => v.status === "disponible"))
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const total = parseFloat(form.total)
      const paid = parseFloat(form.paid)

      await crearAlquiler({
        dressId: form.dressId,
        dressNumber: vestidos.find(v => v.id === form.dressId).number,
        event: form.event,

        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),

        client: {
          name: form.clientName,
          phone: form.clientPhone,
        },

        payment: {
          total,
          paid,
          pending: total - paid,
          type: paid >= total ? "full" : "partial",
        },
      })

      alert("Alquiler creado correctamente")
      setForm(initialForm)
      cargarVestidos()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
    <div style={{ padding: "20px" }}>
      <h2>Nuevo Alquiler</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignItems: "start" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Vestido
          </label>
          <select
            name="dressId"
            value={form.dressId}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "95%" }}
          >
            <option value="">Seleccionar vestido</option>
            {vestidos.map(v => (
              <option key={v.id} value={v.id}>
                {v.number} - Talla {v.size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Evento
          </label>
          <input
            name="event"
            placeholder="Evento"
            value={form.event}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Fecha de inicio
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Fecha de fin
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Nombre del cliente
          </label>
          <input
            name="clientName"
            placeholder="Nombre y Apellido"
            value={form.clientName}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Teléfono
          </label>
          <input
            name="clientPhone"
            placeholder="Número de Teléfono"
            value={form.clientPhone}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Total
          </label>
          <input
            type="number"
            name="total"
            placeholder="Monto Total"
            value={form.total}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Pagado
          </label>
          <input
            type="number"
            name="paid"
            placeholder="Total Pagado"
            value={form.paid}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "90%" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{gridColumn: "1 / -1", width: "97%", background: "green", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer"}}>
          {loading ? "Guardando..." : "Crear Alquiler"}
        </button>
      </form>
    </div>
    </Layout>
  )
}

export default Alquileres
