// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOFcZ4aa37T8ho8pNvUOPZplFDRFybHRg",
    authDomain: "hotel-booking-b6bc8.firebaseapp.com",
    projectId: "hotel-booking-b6bc8",
    storageBucket: "hotel-booking-b6bc8.appspot.com",
    messagingSenderId: "685627222151",
    appId: "1:685627222151:web:408c7c8a38d5d0df66b022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);