// ########## 
import "./_main.scss"


// ########## FIREBASE AUTHENTICATION
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink, 
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// 1. Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp8zP2AvhQAde7UbcsSdiKRpaBmJZZ3IY",
  authDomain: "lc-sifresizgiris.firebaseapp.com",
  projectId: "lc-sifresizgiris",
  storageBucket: "lc-sifresizgiris.firebasestorage.app",
  messagingSenderId: "743617013183",
  appId: "1:743617013183:web:c4abab88b9e3c4f9a7ed0a",
  measurementId: "G-13S3SBKV6Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Get DOM elements
const sendLinkBtn = document.getElementById('send-link-btn');
const emailInput = document.getElementById('email');
const msgDiv = document.getElementById('msg');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const settingsBtn = document.getElementById('settings-btn');
const loginModal = document.getElementById('modal-js-example');

// 3. Send Login Link Logic
sendLinkBtn?.addEventListener('click', async () => {
  const email = emailInput.value;
  if (!email) {
    msgDiv.innerHTML = '<p class="has-text-danger">Please enter your email.</p>';
    return;
  }

  const actionCodeSettings = {
    // URL you want to redirect back to.
    // This URL must be in the authorized domains list in the Firebase Console.
    url: window.location.origin, // e.g., http://localhost:5173 or https://pdfchess.com
    handleCodeInApp: true,
  };

  try {
    msgDiv.innerHTML = '<p>Sending link...</p>';
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save the email locally so we can use it to complete sign-in
    window.localStorage.setItem('emailForSignIn', email);
    msgDiv.innerHTML = '<p class="has-text-success">Login link sent! Check your email.</p>';
    emailInput.value = '';
  } catch (error) {
    console.error(error);
    msgDiv.innerHTML = `<p class="has-text-danger">${error.message}</p>`;
  }
});

// 4. Handle Sign-in on Page Load
// Checks if the user clicked a link from their email
async function handleLoginRedirect() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened link on a different device.
      email = window.prompt('Please provide your email to complete sign-in:');
    }

    try {
      // Complete the sign-in
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn'); // Clean up
      // Redirect to the home page to remove the auth link parameters from the URL
      window.history.replaceState(null, '', '/');
    } catch (error) {
      console.error('Login error:', error);
      msgDiv.innerHTML = `<p class="has-text-danger">Error signing in: ${error.message}</p>`;
    }
  }
}
// Run this check as soon as the page loads
handleLoginRedirect();


// 5. Manage Authentication State (UI changes)
// Listens for user login/logout
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-flex';
    settingsBtn.style.display = 'inline-flex'; 

    // Close login modal if it's open
    if (loginModal?.classList.contains('is-active')) {
      loginModal.classList.remove('is-active');
    }
    
    // *** NEW CODE ***
    // Show the page content
    document.body.style.display = 'flex'; 
    
  } else {
    // User is logged out
    loginBtn.style.display = 'inline-flex';
    logoutBtn.style.display = 'none';
    settingsBtn.style.display = 'none'; 

    // *** NEW CODE ***
    // If user is on the settings page and not logged in, redirect to home
    if (window.location.pathname.includes('/settings.html')) {
      window.location.href = '/'; // Redirect to homepage
    } else {
      // On any other page (like index.html), just show the page
      document.body.style.display = 'flex';
    }
  }
});

// 6. Logout Button
logoutBtn?.addEventListener('click', async () => {
  try {
    await signOut(auth);
    // onAuthStateChanged listener will handle the UI update
  } catch (error) {
    console.error('Logout error:', error);
  }
});






// ############ dark mode (ChatGPT)
const darkToggleBtn = document.getElementById('toggle-dark');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('darkmode', dark ? '1' : '0');
}

if (localStorage.getItem('darkmode') === '1') {
  applyTheme(true);
}

darkToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(!isDark);
});

// ############ klavye kısayolları
// H: Home, L: Login

document.addEventListener('keydown', (e) => {
  if (e.key === 'h') window.location.href = '/';
  if (e.key === 'l') window.location.href = '/login.html';
});

// ########## https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });


// ############ https://bulma.io/documentation/components/message/
 function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('siteCookieNotice') === 'dismissed') {
      const el = document.querySelector('.notification.is-info.is-light');
      if (el) el.remove();
      return;
    }

    (document.querySelectorAll('.notification .delete') || []).forEach($delete => {
      const $notification = $delete.parentNode;
      console.log('Found delete button:', $delete);

      $delete.addEventListener('click', () => {
        console.log('Clicked delete');
        setCookie('siteCookieNotice', 'dismissed', 365);
        $notification.remove();
      });
    });
  });

// ############ https://bulma.io/documentation/components/modal/

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

// ############

// ############

// ############