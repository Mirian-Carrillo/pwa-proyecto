import { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { saveOfflineData, syncOfflineData, sendToFirestore } from "./db";

// 🎧 Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBS4raB5EVWsOO62OQ8e_h7lmgHBKwgJEY",
  authDomain: "melodywave-cd25e.firebaseapp.com",
  projectId: "melodywave-cd25e",
  storageBucket: "melodywave-cd25e.appspot.com",
  messagingSenderId: "541667123139",
  appId: "1:541667123139:web:f3ce910a35458e6759a776",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* === Indicador Online/Offline === */
function OnlineBadge() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      syncOfflineData(); // 🔁 sincroniza cuando vuelve la red
    };
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        padding: "6px 10px",
        borderRadius: 8,
        background: online ? "#1b5e20" : "#7b1fa2",
        color: "#fff",
        fontSize: 12,
      }}
    >
      {online ? "🟢 Online" : "🟣 Offline"}
    </div>
  );
}

/* === Componente principal === */
export default function App() {
  const [likes, setLikes] = useState(0);
  const [formData, setFormData] = useState({ nombre: "", mensaje: "" });

  // Activar notificaciones Push
  const handlePushSubscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("⚠️ Debes permitir las notificaciones para continuar");
        return;
      }

      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey:
          "BKRvjDN5rI8jDtiDDEXVZqIKKCg_YZbUgdpe-tMBDocU6bak1lE8M27yhNZNMXvL0_VZJxgUcazDaCpbKO672qU",
      });

      if (token) {
        console.log("🔑 Token FCM:", token);
        alert("✅ Notificaciones habilitadas correctamente");
      } else {
        alert("No se pudo obtener el token FCM");
      }
    } catch (error: any) {
      console.error("❌ Error al activar notificaciones:", error);
      alert("Error: " + error.message);
    }
  };

  // Escuchar mensajes push en primer plano
  useEffect(() => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      console.log("📨 Notificación recibida:", payload);
      alert(`🎵 ${payload.notification?.title}\n${payload.notification?.body}`);
    });
  }, []);

  // Formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const entry = { ...formData, fecha: new Date().toISOString() };

    if (navigator.onLine) {
      await sendToFirestore(entry);
      alert("☁️ Enviado a Firebase correctamente");
    } else {
      await saveOfflineData(entry);
      alert("💾 Guardado localmente (sin conexión)");
    }

    setFormData({ nombre: "", mensaje: "" });
  };

  return (
    <>
      <header className="app-header">
        <img src="/icons/ponyo.png" alt="MelodyWave Logo" width={60} />
        <h1>MelodyWave</h1>
        <p>Explora tu mundo musical</p>
      </header>

      <main>
        <section className="intro">
          <h2>🎶 Géneros populares</h2>
          <ul className="genres">
            <li>Pop</li>
            <li>Rock</li>
            <li>Jazz</li>
            <li>Clásica</li>
            <li>Electrónica</li>
          </ul>
        </section>

        <section className="featured">
          <h2>🎸 Canciones Más Escuchadas</h2>
          <div className="grid">
            <article className="card">
              <img src="/assets/zoe.jpg" alt="Zoe" />
              <h3>Labios Rotos — Zoe</h3>
              <p>Una de las canciones más icónicas del rock alternativo.</p>
            </article>

            <article className="card">
              <img src="/assets/humbe.jpg" alt="Humbe" />
              <h3>Esencia — Humbe</h3>
              <p>Pop alternativo con estilo y profundidad emocional.</p>
            </article>
            <article className="card">
              <img src="/assets/wavetoheart.jpg" alt="wavetoheart" />
              <h3>season-wave to earth</h3>
              <p>pop y rock indie con influencias de jazz</p>
            </article>
            <article className="card">
              <img src="/assets/SUGA.jpg" alt="SUGA" />
              <h3>agust d-suga(bts)</h3>
              <p>pop y rock indie </p>
            </article>
            <article className="card">
              <img src="/assets/kevinkaarl.jpg" alt="Kevinkaarl" />
              <h3>Es Que Yo Tequiero A Ti-Kevin kaarl)</h3>
              <p>mezcla de folk e indie alternativo, con elementos de bedroom pop y una balada nostálgica</p>
            </article>
            <article className="card">
              <img src="/assets/only.jpg" alt="Lee Hi" />
              <h3>Only — Lee Hi</h3>
              <p>Balada coreana con una voz inolvidable.</p>
            </article>
          </div>
        </section>

        {/* === FORMULARIO AJUSTADO === */}
        <section
          style={{
            backgroundColor: "#fff8f5",
            padding: "3rem 1rem",
            borderTop: "2px solid #e0e0e0",
            borderBottom: "2px solid #e0e0e0",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#3a7f92",
                fontWeight: 700,
                fontSize: "1.8rem",
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              📝 Deja tu comentario
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: "100%",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <label
                  htmlFor="nombre"
                  style={{
                    display: "block",
                    fontWeight: 600,
                    color: "#309f9a",
                    marginBottom: "0.5rem",
                  }}
                >
                  Tu nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Escribe tu nombre..."
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem",
                    borderRadius: "12px",
                    border: "2px solid #b2dfdb",
                    outline: "none",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3a7f92";
                    e.target.style.boxShadow = "0 0 6px rgba(58,127,146,0.3)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#b2dfdb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <label
                  htmlFor="mensaje"
                  style={{
                    display: "block",
                    fontWeight: 600,
                    color: "#309f9a",
                    marginBottom: "0.5rem",
                  }}
                >
                  Tu comentario
                </label>
                <textarea
                  id="mensaje"
                  placeholder="Escribe tu mensaje..."
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem",
                    borderRadius: "12px",
                    border: "2px solid #b2dfdb",
                    outline: "none",
                    fontSize: "1rem",
                    resize: "none",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3a7f92";
                    e.target.style.boxShadow = "0 0 6px rgba(58,127,146,0.3)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#b2dfdb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(90deg, #5192a6, #73d9b3)",
                  color: "white",
                  fontWeight: 600,
                  border: "none",
                  padding: "0.9rem 2.2rem",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 10px rgba(82,182,154,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(82,182,154,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(82,182,154,0.3)";
                }}
              >
                ✨ Enviar comentario
              </button>
            </form>
          </div>
        </section>



        <div className="likes">
          <button onClick={() => setLikes(likes + 1)}>
            ❤️ Me gusta ({likes})
          </button>
          <br />
          <button
            onClick={handlePushSubscribe}
            style={{
              background: "#3a7f92",
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "25px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            🔔 Habilitar Notificaciones
          </button>
        </div>
      </main>

      <footer>
        <p>© 2025 MelodyWave — Tu mundo musical</p>
      </footer>

      <OnlineBadge />
    </>
  );
}
