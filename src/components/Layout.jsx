import Navbar from "./Navbar"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>
        {children}
      </main>
    </>
  )
}

export default Layout
