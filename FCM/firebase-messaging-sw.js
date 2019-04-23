importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCQxll--7QIxMwQyhjNzgLcbUF1oR3AiKE",
    authDomain: "onesentence-cf232.firebaseapp.com",
    databaseURL: "https://onesentence-cf232.firebaseio.com",
    projectId: "onesentence-cf232",
    storageBucket: "onesentence-cf232.appspot.com",
    messagingSenderId: "500084519426"
  };
  firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message !', payload);
  // Customize notification here
    console.log(payload.data.title+":"+payload.data.description);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.description,
    icon: 'logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});