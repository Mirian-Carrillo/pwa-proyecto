importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js");


firebase.initializeApp({
  apiKey: "AIzaSyBS4raB5EVWsOO62OQ8e_h7lmgHBKwgJEY",
  authDomain: "melodywave-cd25e.firebaseapp.com",
  projectId: "melodywave-cd25e",
});


const firestore = firebase.firestore();

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icons/fantasma.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== STATIC_CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => caches.match("/App.tsx")))
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-likes") {
    event.waitUntil(syncOfflineLikes());
  }
});

async function syncOfflineLikes() {
  const dbReq = await openDB("melodywave-db", 1);
  const entries = await dbReq.getAll("offline-likes");

  for (const e of entries) {
    await firestore.collection("likes").add(e);
  }

  await dbReq.clear("offline-likes");
}
