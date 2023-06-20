// Importing necessary modules and libraries from the packages
import React, { useEffect, useState, useRef } from 'react';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { AiOutlineDelete } from 'react-icons/ai';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

// MessageList function component
export default function MessageList() {
    // Using firestore hook to initialize firebase firestore
    const firestore = useFirestore();

    // Creating a query to get messages collection ordered by timestamp
    const messagesQuery = query(collection(firestore, 'messages'), orderBy('timestamp', 'asc'));

    // Get a live collection of messages data from Firestore, with the document ID attached to each object
    const { status, data: messages, error } = useFirestoreCollectionData(messagesQuery, {
        idField: 'id',
    });

    // State to keep track of the message row that the mouse is currently hovering over
    const [hoveredRow, setHoveredRow] = useState(null);

    // A reference to the last message in the list
    const messagesEndRef = useRef(null);

    // Function to delete a message by its ID
    const deleteMessage = async (messageId) => {
        try {
            // Get a reference to the message document
            const messageRef = doc(firestore, 'messages', messageId);

            // Delete the document
            await deleteDoc(messageRef);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // useEffect hook that automatically scrolls to the end of the messages list whenever a new message is added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    // Show a loading indicator while the data is being fetched
    if (status === 'loading') {
        return (
            <div className="messageList loaderContainer">
                <span className="loader"></span>
            </div>
        );
    }

    // Show an error message if there was an issue fetching the data
    if (status === 'error' || error) {
        return <p className="errorText">Error: Failed to fetch messages.</p>;
    }

    // Render the list of messages
    return (
        <ul className="messageList row">
            {/* Wrap the messages list in AnimatePresence to enable animations when adding/removing messages */}
            <AnimatePresence initial={false}>
                {/* Mapping over each message to render it as a list item */}
                {messages.map((message) => (
                    <motion.li
                        key={message.id}
                        className={`messageRow`}
                        onMouseEnter={() => setHoveredRow(message.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        // Adding animations to the list items
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* If the mouse is hovering over this row, show the delete button */}
                        {hoveredRow === message.id && (
                            <button className="messageDeleteIcon" onClick={() => deleteMessage(message.id)}>
                                {/* Using AiOutlineDelete as the delete button icon */}
                                <AiOutlineDelete className="messageDeleteIcon" />
                            </button>
                        )}
                        {/* Displaying the message text */}
                        <div className="messageBubble">{message.text}</div>
                    </motion.li>
                ))}
            </AnimatePresence>
            {/* Reference point for auto-scrolling to the end of the messages list */}
            <div ref={messagesEndRef} />
        </ul>
    );
}
