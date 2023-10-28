import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCBb1dj52Q5THokup69Ziu3LurEVydssRs",
  authDomain: "getfitt-c55d2.firebaseapp.com",
  projectId: "getfitt-c55d2",
  storageBucket: "getfitt-c55d2.appspot.com",
  messagingSenderId: "529542135825",
  appId: "1:529542135825:web:5e68c5f8a95d36d8a7b1b0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp