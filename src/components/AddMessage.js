import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const MessagesCollection = collection(getFirestore(), 'messages');

export default function AddMessage() {
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