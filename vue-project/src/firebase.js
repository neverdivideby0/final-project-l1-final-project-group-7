import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANQolcbuTDwrubpvxChcNd30YYJR0j9FI",
  authDomain: "democpp-b9faa.firebaseapp.com",
  projectId: "democpp-b9faa",
  storageBucket: "democpp-b9faa.appspot.com",
  messagingSenderId: "599369132779",
  appId: "1:599369132779:web:f6e95e5d086ff14a102cae"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;