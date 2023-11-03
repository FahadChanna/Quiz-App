import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDyvrFylolrpvla2eVacOZpkR2j2sDxKRY",
  authDomain: "quizapp-bd295.firebaseapp.com",
  projectId: "quizapp-bd295",
  storageBucket: "quizapp-bd295.appspot.com",
  messagingSenderId: "393421811229",
  appId: "1:393421811229:web:4de147b42de90e441be0f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)