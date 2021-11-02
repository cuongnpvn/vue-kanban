import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCuRjZIZ-An94IFCk8KvQ0jy4eOJeZFIk0",
  authDomain: "kanban-app-17ce2.firebaseapp.com",
  projectId: "kanban-app-17ce2",
  storageBucket: "kanban-app-17ce2.appspot.com",
  messagingSenderId: "882857104014",
  appId: "1:882857104014:web:66a24dc162193683e4afdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
