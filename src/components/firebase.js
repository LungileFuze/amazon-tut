import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeP_VW1BO_VA8z4eHm1nQipehmMNImF_s",
  authDomain: "clone-tutorial-56240.firebaseapp.com",
  projectId: "clone-tutorial-56240",
  storageBucket: "clone-tutorial-56240.appspot.com",
  messagingSenderId: "1017491040200",
  appId: "1:1017491040200:web:edac9b0493e65bcda602fd",
  measurementId: "G-Q3FJZBJYJ4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export {db, auth}
