// src/utils/sync.js
import { collection, addDoc } from "firebase/firestore";
import { db as firebaseDB } from "../firebaseConfig";
import { getAllOfflineEntries, clearOfflineEntries } from "../db";

export async function syncOfflineEntries() {
  try {
    const entries = await getAllOfflineEntries();
    if (!entries.length) return;

    for (const entry of entries) {
      await addDoc(collection(firebaseDB, "entries"), entry);
      console.log("☁️ Sincronizado con Firebase:", entry);
    }

    await clearOfflineEntries();
    console.log("✅ Sincronización completada");
  } catch (err) {
    console.error("❌ Error en la sincronización:", err);
  }
}
