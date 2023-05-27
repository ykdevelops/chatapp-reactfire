import React from 'react';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import { createRoot } from 'react-dom/client';
import { firebaseConfig } from './firebase'
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

function App() {
  return (
    <div>
      <h1>Chat App</h1>
      <MessageList />
      <AddMessage />
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirestoreProvider sdk={getFirestore()}>
      <App />
    </FirestoreProvider>
  </FirebaseAppProvider>
);
