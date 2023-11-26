// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWgVqc7Va7lE95zyVn1Sz1Pm6u2m6Yah8",
  authDomain: "originhealthtest.firebaseapp.com",
  projectId: "originhealthtest",
  storageBucket: "originhealthtest.appspot.com",
  messagingSenderId: "837592658017",
  appId: "1:837592658017:web:c7cc4cdb9e0fcc0fb43a20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage()

export default storage;

