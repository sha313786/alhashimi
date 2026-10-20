/**
 * Al Hashimi Electrical Installation Works LLC
 * Firebase Cloud Sync & Email Dispatch Configuration
 * 
 * Google Cloud Firestore integration for real-time portfolio synchronization
 * and Web3Forms Free Email Dispatch (Zero recurring costs forever).
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAPpu9v3kckjITtmqivKZCcdOby3ebynuo",
  authDomain: "alhashimi-projects.firebaseapp.com",
  projectId: "alhashimi-projects",
  storageBucket: "alhashimi-projects.firebasestorage.app",
  messagingSenderId: "345295345202",
  appId: "1:345295345202:web:0860970322a96671e88e2b"
};

const EMAIL_CONFIG = {
  // Web3Forms Access Key: Free tier (250 submissions/month, 100% free forever)
  // When an access key is set, all website submissions are instantly emailed to info@alhashimillc.com
  web3FormsAccessKey: ""
};

if (typeof window !== 'undefined') {
  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
  window.EMAIL_CONFIG = EMAIL_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIREBASE_CONFIG, EMAIL_CONFIG };
}
