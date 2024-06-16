import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGunWPVjXoSwZz2EawgWeWvPlrr-jgIIg",
    authDomain: "notekeeper-c2e56.firebaseapp.com",
    projectId: "notekeeper-c2e56",
    storageBucket: "notekeeper-c2e56.appspot.com",
    messagingSenderId: "189289407298",
    appId: "1:189289407298:web:9a61153c3e974ce31c1edb"
  };


const app = initializeApp(firebaseConfig);


export const firestoreDB = getFirestore(app);