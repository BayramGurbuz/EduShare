import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZLKtvxoKis67l3tSchewo_Bl6kVBr0tk",
    authDomain: "edushare-2839e.firebaseapp.com",
    projectId: "edushare-2839e",
    storageBucket: "edushare-2839e.firebasestorage.app",
    messagingSenderId: "88830203425",
    appId: "1:88830203425:web:3e1c3a5dea246292e2f560"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('userName').textContent = user.displayName || "User";
        document.getElementById('userEmail').textContent = user.email || "No Email";
    } 
});

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert("You have been logged out.");
                window.location.href = 'sign-in.html';
            })
            .catch((error) => {
                alert("Logout Error: " + error.message);
            });
    });
});
