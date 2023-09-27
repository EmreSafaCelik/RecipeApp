import firebase, { initializeApp } from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD4Wfj-Yc5nA5ok1OiuXSISY6hmvAbgk3g",
  authDomain: "recipeapprn-674c4.firebaseapp.com",
  databaseURL: "https://recipeapprn-674c4.firebaseio.com",
  projectId: "recipeapprn-674c4",
  storageBucket: "recipeapprn-674c4.appspot.com",
  messagingSenderId: "951089532743",
  appId: "1:951089532743:web:1cd5a632331eb1572bc662",
  measurementId: "G-H24KL83S5R"
};

if (firebase.apps.length == 0) {
  const app = initializeApp(firebaseConfig)
}

export { auth }