import React, { useState, useRef, useEffect } from 'react';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { AiOutlineDelete } from 'react-icons/ai';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

export default function MessageList() {
    const firestore = useFirestore();
    const messagesQuery = query(collection(firestore, 'messages'), orderBy('timestamp', 'asc'));

    const { status, data: messages, error } = useFirestoreCollectionData(messagesQuery, {
        idField: 'id',
    });

    const [hoveredRow, setHoveredRow] = useState(null);
    const messagesEndRef = useRef(null);
    const [newMessageId, setNewMessageId] = useState(null); // <-- Define newMessageId state

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

    const handleNewMessage = (messageId) => {
        setNewMessageId(messageId); // <-- Set newMessageId state
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'error' || error) {
        return <p>Error: Failed to fetch messages.</p>;
    }

    return (
        <ul className="messageList">
            <AnimatePresence>
                {messages.map((message) => (
                    <motion.li
                        key={message.id}
                        className={`messageRow ${message.id === newMessageId ? 'newMessage' : ''}`}
                        onMouseEnter={() => setHoveredRow(message.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >

                        {hoveredRow === message.id && (
                            <button className="messageDeleteIcon" onClick={() => deleteMessage(message.id)}>
                                <AiOutlineDelete className="messageDeleteIcon" />
                            </button>
                        )}
                        <div className="messageBubble">{message.text}</div>
                        {message.id === newMessageId && <div ref={messagesEndRef} />}
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    );
}
