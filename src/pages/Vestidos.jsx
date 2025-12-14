import { useEffect, useState } from "react"
import {
  crearVestido,
  obtenerVestidos,
  actualizarVestido,
  eliminarVestido,
} from "../services/vestidos"
import Layout from "../components/Layout"
import Modal from "../components/Modal"

const initialForm = {
  number: "",
  size: "",
  price: "",
}

function Vestidos() {
  const [form, setForm] = useState(initialForm)
  const [vestidos, setVestidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingVestido, setEditingVestido] = useState(null)
  const [editForm, setEditForm] = useState({
    size: "",
    price: "",
  })

  const cargarVestidos = async () => {
    const data = await obtenerVestidos()
    setVestidos(data)
  }

  const iniciarEdicion = (vestido) => {
    if (vestido.status !== "disponible") {
      alert("Este vestido no se puede editar")
      return
    }

    setEditingVestido(vestido)
    setEditForm({
      size: vestido.size,
      price: vestido.price,
    })
  }

  const guardarEdicion = async () => {
    if (!editForm.size || editForm.price === "") {
      alert("Todos los campos son obligatorios")
      return
    }

    await actualizarVestido(editingVestido.id, {
      size: editForm.size,
      price: parseFloat(editForm.price),
    })

    setEditingVestido(null)
    cargarVestidos()
  }

  const borrar = async (id, status) => {
    if (status !== "disponible") {
      alert("Este vestido no se puede eliminar")
      return
    }

    if (!confirm("¿Eliminar vestido?")) return
    await eliminarVestido(id)
    cargarVestidos()
  }

  useEffect(() => {
    cargarVestidos()
  }, [])

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
      await crearVestido({
        number: form.number,
        size: form.size,
        price: Number(form.price),
      })

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
      <h2>Vestidos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", alignItems: "start" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Número
          </label>
          <input
            name="number"
            placeholder="Número de Etiqueta"
            value={form.number}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "90%"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Talla
          </label>
          <input
            name="size"
            placeholder="Talla"
            value={form.size}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "90%"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Precio
          </label>
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "90%"
            }}
          />
        </div>

        <button type="submit" disabled={loading} style={{gridColumn: "1 / -1", width: "99%", background: "#28a745", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold"}}>
          {loading ? "Guardando..." : "Añadir Vestido"}
        </button>
      </form>

      {/* LISTA */}
      <table border="1" cellPadding="10" style={{ width: "99%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Número</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Talla</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Precio</th>
            <th style={{ borderColor: "#ddd", textAlign: "left" }}>Estado</th>
            <th style={{ borderColor: "#ddd", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vestidos.map((v) => (
            <tr key={v.id} style={{ borderColor: "#ddd" }}>
              <td style={{ borderColor: "#ddd" }}>{v.number}</td>
              <td style={{ borderColor: "#ddd" }}>{v.size}</td>
              <td style={{ borderColor: "#ddd" }}>${v.price}</td>
              <td style={{ borderColor: "#ddd" }}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: v.status === "disponible" ? "#d4edda" : "#f8d7da",
                  color: v.status === "disponible" ? "#155724" : "#856404",
                }}>
                  {v.status}
                </span>
              </td>

              <td style={{ borderColor: "#ddd", textAlign: "center" }}>
                <button
                  onClick={() => iniciarEdicion(v)}
                  disabled={v.status !== "disponible"}
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    cursor: v.status !== "disponible" ? "not-allowed" : "pointer",
                    opacity: v.status !== "disponible" ? 0.5 : 1,
                    marginRight: "5px",
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => borrar(v.id, v.status)}
                  disabled={v.status !== "disponible"}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    cursor: v.status !== "disponible" ? "not-allowed" : "pointer",
                    opacity: v.status !== "disponible" ? 0.5 : 1,
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  {editingVestido && (
    <Modal
      title={`Editar vestido ${editingVestido.number}`}
      onClose={() => setEditingVestido(null)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Talla
          </label>
          <input
            value={editForm.size}
            onChange={(e) =>
              setEditForm({ ...editForm, size: e.target.value })
            }
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
            Precio
          </label>
          <input
            type="number"
            value={editForm.price}
            onChange={(e) =>
              setEditForm({ ...editForm, price: e.target.value })
            }
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" }}
          />
        </div>
        <button
          onClick={guardarEdicion}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Guardar cambios
        </button>
      </div>
    </Modal>
  )}
</Layout>
  )
}

export default Vestidos
