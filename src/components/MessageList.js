import React, { useState, useRef, useEffect } from 'react';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { AiOutlineDelete } from 'react-icons/ai';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import '../App.css';

export default function MessageList() {
    const firestore = useFirestore();
    const messagesQuery = query(collection(firestore, 'messages'), orderBy('timestamp', 'asc'));

    const { status, data: messages, error } = useFirestoreCollectionData(messagesQuery, {
        idField: 'id',
    });

    const [hoveredRow, setHoveredRow] = useState(null);
    const messagesEndRef = useRef(null);

    const deleteMessage = async (messageId) => {
        try {
            const messageRef = doc(firestore, 'messages', messageId);
            await deleteDoc(messageRef);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'error' || error) {
        return <p>Error: Failed to fetch messages.</p>;
    }

    return (
        <ul className="messageList">
            {messages.map((message, index) => (
                <li
                    key={message.id}
                    className="messageRow"
                    onMouseEnter={() => setHoveredRow(message.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    {hoveredRow === message.id && (
                        <button className="messageDeleteIcon" onClick={() => deleteMessage(message.id)}>
                            <AiOutlineDelete className="messageDeleteIcon" />
                        </button>
                    )}
                    <div className="messageBubble">{message.text}</div>
                    {index === messages.length - 1 && <div ref={messagesEndRef} />}
                </li>
            ))}
        </ul>
    );
}

