import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from  'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDM6_2nJga6ubT4sYr_AjbYb_I5gbtwrjk",
  authDomain: "products-db-b32e0.firebaseapp.com",
  projectId: "products-db-b32e0",
  storageBucket: "products-db-b32e0.appspot.com",
  messagingSenderId: "78540738906",
  appId: "1:78540738906:web:81cd2a3f9720924d686363"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage}
