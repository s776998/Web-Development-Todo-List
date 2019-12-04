import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA_iEdY3-Z8sxphD0p0UCv8oT2tOutanLg",
  authDomain: "todos-aa1cb.firebaseapp.com",
  databaseURL: "https://todos-aa1cb.firebaseio.com",
  projectId: "todos-aa1cb",
  storageBucket: "todos-aa1cb.appspot.com",
  messagingSenderId: "920381303712",
  appId: "1:920381303712:web:48ee3b29a258b3ab9d52c5",
  measurementId: "G-EKS36HMTJQ"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos");
