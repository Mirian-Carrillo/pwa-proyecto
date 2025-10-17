import { openDB } from "idb";
import { collection, addDoc } from "firebase/firestore";
import { db as firebaseDB } from "./firebaseConfig";

export async function getLocalDB() {
  return await openDB("melodywave-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offline-data")) {
        db.createObjectStore("offline-data", { keyPath: "id", autoIncrement: true });
      }
    }
  });
}

// Guarda localmente cuando no hay conexión
export async function saveOfflineData(data) {
  const db = await getLocalDB();
  await db.add("offline-data", data);
  console.log("💾 Datos guardados offline:", data);
}

// Enviar datos a Firestore
export async function sendToFirestore(data) {
  try {
    await addDoc(collection(firebaseDB, "melodywave-entries"), data);
    console.log("✅ Datos sincronizados con Firestore:", data);
  } catch (error) {
    console.error("❌ Error al sincronizar:", error);
  }
}

// Sincroniza datos locales al volver la red
export async function syncOfflineData() {
  const db = await getLocalDB();
  const entries = await db.getAll("offline-data");
  for (const entry of entries) {
    await sendToFirestore(entry);
  }
  await db.clear("offline-data");
}


