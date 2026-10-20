/**
 * Al Hashimi Electrical Installation Works LLC
 * Firebase Cloud Sync Configuration
 * 
 * Free Google Cloud Firestore integration for real-time portfolio synchronization
 * across all devices worldwide.
 */

const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

if (typeof window !== 'undefined') {
  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIREBASE_CONFIG };
}
