import { messaging } from "../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";

export async function initPush() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.log("Permiso denegado para notificaciones");
    return;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: "BKRvjDN5rI8jDtiDDEXVZqIKKCg_YZbUgdpe-tMBDocU6bak1lE8M27yhNZNMXvL0_VZJxgUcazDaCpbKO672qU",
    });
    console.log("🔑 Token FCM:", token);
  } catch (err) {
    console.error("Error obteniendo token:", err);
  }

  onMessage(messaging, (payload) => {
    console.log("📨 Notificación recibida:", payload);
  });
}




