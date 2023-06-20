// Import necessary modules and libraries
import React from 'react';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import { createRoot } from 'react-dom/client';
import { firebaseConfig } from './firebase';
import App from './App';

// Get a reference to the root DOM element, which is the entry point for the React app
const rootElement = document.getElementById('root');

// Create a root for the React application
const root = createRoot(rootElement);

// Render the React application
root.render(
  // FirebaseAppProvider is a context provider that makes the Firebase SDKs available to child components
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    {/* FirestoreProvider is a context provider that makes Firestore available to child components */}
    <FirestoreProvider sdk={getFirestore()}>
      <App />
    </FirestoreProvider>
  </FirebaseAppProvider>
);
