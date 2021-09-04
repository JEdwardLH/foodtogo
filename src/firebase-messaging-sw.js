importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyClb37XZPeXTAav0coj3-40pBLuoxSbflI",
  authDomain: "hungry-now-customer.firebaseapp.com",
  databaseURL: "https://hungry-now-customer.firebaseio.com",
  projectId: "hungry-now-customer",
  storageBucket: "hungry-now-customer.appspot.com",
  messagingSenderId: "314178984888",
  appId: "1:314178984888:web:299716a8e65b75cad18d4d",
  measurementId: "G-CXP65TNDQJ"

  });

const messaging = firebase.messaging();
