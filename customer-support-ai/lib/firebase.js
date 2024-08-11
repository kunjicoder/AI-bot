import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpKdmjd8OpHUsIqKRclr3kf599TdSXVeQ",
  authDomain: "pantree-e214f.firebaseapp.com",
  projectId: "pantree-e214f",
  storageBucket: "pantree-e214f.appspot.com",
  messagingSenderId: "29062360412",
  appId: "1:29062360412:web:25d0b0ab88bd7b12d5e599",
  measurementId: "G-DP5RL7L0TD"
};

// Initialize Firebase
let app;
let auth;
let db;
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app); // Initialize Firestore instance
}

const handleSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;   


    // Store email in Firestore (assuming a collection named 'users')
    const handleAddEmail = async (userId, newEmail) => {
      try {
        const userRef = doc(db, "users", userId);
    
        // Check if the document exists
        const docSnap = await getDoc(userRef);
    
        if (docSnap.exists()) {
          // Document exists, update the emails array
          await updateDoc(userRef, {
            emails: arrayUnion(newEmail)
          });
        } else {
          // Document doesn't exist, create it with an initial emails array
          await setDoc(userRef, {
            emails: [newEmail]
          });
        }
    
        console.log("Email added successfully");
      } catch (error) {
        console.error("Error adding email:", error);
      }
    }; // Set the email field in the document

    console.log("User signed in:", user);
    // Handle successful sign-in logic here (e.g., redirect to protected routes)
  } catch (error) {
    console.error("Sign-in error:", error);
    // Handle sign-in errors here (e.g., display error messages)
  }
};


export { auth, handleSignIn };

