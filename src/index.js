import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, getFirestore, doc } from 'firebase/firestore';

import { FirebaseAppProvider, useFirestore, useFirestoreCollectionData, FirestoreProvider } from 'reactfire';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_L0EwOnpVH4PUTkzUSpryQd-Kts2awPw",
  authDomain: "chatapp-159ec.firebaseapp.com",
  projectId: "chatapp-159ec",
  storageBucket: "chatapp-159ec.appspot.com",
  messagingSenderId: "39942104696",
  appId: "1:39942104696:web:aedea9f37e365ed933af8d",
  measurementId: "G-TCYTLGPD4T",
};

initializeApp(firebaseConfig); // Initialize the Firebase app

const MessagesCollection = collection(getFirestore(), 'messages');

function MessageList() {
  const firestore = useFirestore();
  const messagesQuery = collection(firestore, "messages")

  const { status, data: messages, error } = useFirestoreCollectionData(messagesQuery, { idField: 'id' });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error' || error) {
    return <p>Error: Failed to fetch messages.</p>;
  }

  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(firestore, 'messages', messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <ul>
      {messages.map(message => (
        <li key={message.id}>
          {message.text}
          <button onClick={() => deleteMessage(message.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}



function AddMessage() {
  const [newMessage, setNewMessage] = useState('');

  const addMessage = async () => {
    await addDoc(MessagesCollection, {
      text: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage('');
  };

  return (
    <div>
      <input
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
      <button onClick={addMessage}>
        Send
      </button>
    </div>
  );
}

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
