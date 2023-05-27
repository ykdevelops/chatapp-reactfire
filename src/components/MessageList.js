import React from 'react';
import { collection, deleteDoc, doc } from 'firebase/firestore';

import { useFirestore, useFirestoreCollectionData } from 'reactfire';
export default function MessageList() {
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