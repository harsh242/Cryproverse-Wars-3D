import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/analytics";
import "firebase/firebase-database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2_MEZ1UiVBb78_hnVLlVkx9LP-hdYCtI",
  authDomain: "cryptoverse-wars-3d.firebaseapp.com",
  databaseURL: "https://cryptoverse-wars-3d.firebaseio.com",
  projectId: "cryptoverse-wars-3d",
  storageBucket: "cryptoverse-wars-3d.appspot.com",
  messagingSenderId: "933146221156",
  appId: "1:933146221156:web:228ebd2260f77c68f71d71",
  measurementId: "G-C0EBV3YVVZ",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    //this.auth = app.auth()
    app.analytics();
  }
}

export default new Firebase();
