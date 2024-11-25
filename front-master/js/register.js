// Import the functions you need from the SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

// Firebase configuration
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
const auth = getAuth(app); // Auth instance

// Function to handle form submission
function signUp(event) {
  event.preventDefault(); // Prevent default form submission

  const firstName = document.getElementById('signUpFirstName').value.trim();
  const lastName = document.getElementById('signUpLastName').value.trim();
  const email = document.getElementById('signUpEmail').value.trim();
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Input validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('All fields are required.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Disable the button to prevent multiple submissions
  const submitButton = document.getElementById('submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Creating your account...';

  // Create user with Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // User signed up successfully
      alert(`Welcome, ${firstName}! Your account has been created.`);
      window.location.href = 'home.html'; // Redirect to home page
    })
    .catch(error => {
      // Handle errors
      alert(`Error: ${error.message}`);
    })
    .finally(() => {
      // Re-enable the button
      submitButton.disabled = false;
      submitButton.textContent = 'Sign Up';
    });
}

// Attach event listener to the form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signUpForm');
  form.addEventListener('submit', signUp);
});
