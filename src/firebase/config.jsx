
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMxuqJ64VX_UswmI5T3DZl2GL6lw9q8Ws",
  authDomain: "miniblog-31650.firebaseapp.com",
  projectId: "miniblog-31650",
  storageBucket: "miniblog-31650.appspot.com",
  messagingSenderId: "720230007746",
  appId: "1:720230007746:web:a7d894e8cc68ab95828c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};