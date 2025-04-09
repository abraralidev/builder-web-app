importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyB7Xq5YTe7lai95PksJlb6MHP88cJ2OHyI",
    authDomain: "flex-builder-cf235.firebaseapp.com",
    projectId: "flex-builder-cf235",
    storageBucket: "flex-builder-cf235.appspot.com",
    messagingSenderId: "349895177086",
    appId: "1:349895177086:web:077d5b9a9f495dd135792f",
    measurementId: "G-N50B9JTB1Z"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
            };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
    console.log('notification received: ', event)
});