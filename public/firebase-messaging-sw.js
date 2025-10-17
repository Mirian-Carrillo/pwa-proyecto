importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBS4raB5EVWsOO62OQ8e_h7lmgHBKwgJEY",
    authDomain: "melodywave-cd25e.firebaseapp.com",
    projectId: "melodywave-cd25e",
    messagingSenderId: "541667123139",
    appId: "1:541667123139:web:f3ce910a35458e6759a776"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/gibli.png",
  });
})