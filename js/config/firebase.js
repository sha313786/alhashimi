/**
 * Al Hashimi Electrical Installation Works LLC
 * Firebase Cloud Sync Configuration
 * 
 * Google Cloud Firestore integration for real-time portfolio synchronization
 * across all devices worldwide.
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAPpu9v3kckjITtmqivKZCcdOby3ebynuo",
  authDomain: "alhashimi-projects.firebaseapp.com",
  projectId: "alhashimi-projects",
  storageBucket: "alhashimi-projects.firebasestorage.app",
  messagingSenderId: "345295345202",
  appId: "1:345295345202:web:0860970322a96671e88e2b"
};

if (typeof window !== 'undefined') {
  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIREBASE_CONFIG };
}
