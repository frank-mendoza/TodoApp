// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxOYTO4umZi28oUJbkOx2TqWDvf9sKmMM",
  authDomain: "todoapp-832c7.firebaseapp.com",
  projectId: "todoapp-832c7",
  storageBucket: "todoapp-832c7.appspot.com",
  messagingSenderId: "1058006719156",
  appId: "1:1058006719156:web:d27eab01615fe1929755e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;