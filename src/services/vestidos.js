import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase/firebaseConfig"

const COLLECTION = "dresses"

/**
 * Crear un vestido
 */
export const crearVestido = async ({
  number,
  size,
  price,
  imageUrl = "",
}) => {
  // 1️⃣ Validar número único
  const q = query(
    collection(db, COLLECTION),
    where("number", "==", number)
  )

  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    throw new Error("Ya existe un vestido con ese número")
  }

  // 2️⃣ Crear vestido
  const docRef = await addDoc(collection(db, COLLECTION), {
    number,
    size,
    price,
    imageUrl,
    status: "disponible",
    createdAt: serverTimestamp(),
  })

  return docRef.id
}

/**
 * Listar todos los vestidos
 */
export const obtenerVestidos = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION))

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

/**
 * Actualizar estado del vestido
 */
export const actualizarEstadoVestido = async (id, status) => {
  const ref = doc(db, COLLECTION, id)
  await updateDoc(ref, { status })
}

/**
 * Obtener vestido por ID
 */
export const obtenerVestidoPorId = async (id) => {
  const ref = doc(db, COLLECTION, id)
  const snapshot = await getDoc(ref)

  if (!snapshot.exists()) return null

  return { id: snapshot.id, ...snapshot.data() }
}

/**
 * Actualizar datos del vestido
 */
export const actualizarVestido = async (id, data) => {
  const ref = doc(db, COLLECTION, id)
  await updateDoc(ref, data)
}

/**
 * Eliminar vestido
 */
export const eliminarVestido = async (id) => {
  const ref = doc(db, COLLECTION, id)
  await deleteDoc(ref)
}
