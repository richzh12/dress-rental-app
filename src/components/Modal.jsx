function Modal({ title, children, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <header style={{ marginBottom: "10px" }}>
          <h3>{title}</h3>
        </header>

        {children}

        <footer style={{ marginTop: "15px", textAlign: "right" }}>
          <button onClick={onClose} style={{background: "red", color: "#fff", border: "none", padding: "10px", borderRadius: "4px"}}>Cerrar</button>
        </footer>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
}

const modalStyle = {
  background: "#fff",
  padding: "24px 28px",
  width: "380px",
  borderRadius: "8px",
}

export default Modal
