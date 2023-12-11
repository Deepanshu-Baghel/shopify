

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgoOtTcm5tW6R2ZenBMiR-zIcF2jogjN8",
  authDomain: "faltushop-a14d7.firebaseapp.com",
  projectId: "faltushop-a14d7",
  storageBucket: "faltushop-a14d7.appspot.com",
  messagingSenderId: "274298604126",
  appId: "1:274298604126:web:73a9c7e135ff73166542cf"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider,signInWithPopup };