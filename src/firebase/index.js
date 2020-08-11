import firebase from "firebase/app";
import "firebase/storage";
require("dotenv").config();

var firebaseConfig = {
       
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "texting--dp.firebaseapp.com",
  databaseURL: "https://texting--dp.firebaseio.com",
  projectId: "texting--dp",
  storageBucket: "texting--dp.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_M_ID
  };


  
    firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage()

    export {storage , firebase as default};