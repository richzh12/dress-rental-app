import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase/firebaseConfig"

const RENTALS_COLLECTION = "rentals"
const DRESSES_COLLECTION = "dresses"

/**
 * Verifica si el vestido está disponible en el rango de fechas
 */
const verificarDisponibilidad = async (dressId, startDate, endDate) => {
  const q = query(
    collection(db, RENTALS_COLLECTION),
    where("dressId", "==", dressId),
    where("status", "==", "active")
  )

  const snapshot = await getDocs(q)

  for (const docu of snapshot.docs) {
    const rental = docu.data()

    const existingStart = rental.startDate.toDate()
    const existingEnd = rental.endDate.toDate()

    // SOLAPAMIENTO
    if (
      existingStart <= endDate &&
      existingEnd >= startDate
    ) {
      return false
    }
  }

  return true
}

/**
 * Crear alquiler
 */
export const crearAlquiler = async ({
  dressId,
  dressNumber,
  event,
  startDate,
  endDate,
  client,
  payment,
}) => {
  // 1️⃣ Verificar disponibilidad
  const disponible = await verificarDisponibilidad(
    dressId,
    startDate,
    endDate
  )

  if (!disponible) {
    throw new Error("El vestido no está disponible en esas fechas")
  }

  // 2️⃣ Crear alquiler
  await addDoc(collection(db, RENTALS_COLLECTION), {
    dressId,
    dressNumber,
    event,

    startDate: Timestamp.fromDate(startDate),
    endDate: Timestamp.fromDate(endDate),

    client,
    payment,

    status: "active",
    createdAt: serverTimestamp(),
  })

  // 3️⃣ Actualizar estado del vestido
  const dressRef = doc(db, DRESSES_COLLECTION, dressId)
  await updateDoc(dressRef, { status: "alquilado" })
}

/**
 * Obtener alquileres activos
 */
export const obtenerAlquileresActivos = async () => {
  const q = query(
    collection(db, RENTALS_COLLECTION),
    where("status", "==", "active")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }))
}

/**
 * Cerrar alquiler (devolución)
 */
export const cerrarAlquiler = async (rentalId, dressId) => {
  // 1️⃣ Cerrar alquiler
  const rentalRef = doc(db, RENTALS_COLLECTION, rentalId)
  await updateDoc(rentalRef, {
    status: "completado",
    completedAt: serverTimestamp(),
  })

  // 2️⃣ Liberar vestido
  const dressRef = doc(db, DRESSES_COLLECTION, dressId)
  await updateDoc(dressRef, {
    status: "disponible",
  })
}