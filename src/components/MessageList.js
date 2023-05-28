import React, { useEffect, useState, useRef } from 'react';
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
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    if (status === 'loading') {
        return (
            <div className="messageList loaderContainer">
                <span className="loader"></span>
            </div>
        );
    }

    if (status === 'error' || error) {
        return <p className="errorText">Error: Failed to fetch messages.</p>;
    }

    return (

        <ul className="messageList row">
            <AnimatePresence initial={false}>
                {messages.map((message) => (
                    <motion.li
                        key={message.id}
                        className={`messageRow`}
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
                    </motion.li>
                ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </ul>

    );
}
