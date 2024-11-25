import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

// Firebase config
const firebaseConfig = {
    apiKey: "....",
    authDomain: "...",
    projectId: "...",
    storageBucket: ""...",",
    messagingSenderId: ""...",",
    appId: ""...","
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  // Handle form sign-in
  document.getElementById('signInForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign In Successful!');
      window.location.href = 'home.html'; // Redirect to home page
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          alert('No user found with this email.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password. Please try again.');
          break;
        default:
          alert(`Error: ${error.message}`);
      }
    }
  });

  // Handle Google Sign-In
  document.getElementById('googleSignInButton').addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      window.location.href = 'home.html'; // Redirect to home page
    } catch (error) {
      alert(`Google Sign-In Error: ${error.message}`);
    }
  });

  // Forgot password functionality
  document.getElementById('forgotPasswordLink').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = prompt('Please enter your email for password reset:');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link has been sent to your email.');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
});
