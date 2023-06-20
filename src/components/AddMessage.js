// Importing necessary modules and libraries from the packages
import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BsEmojiSmile } from 'react-icons/bs';
import { BsFillSendFill } from 'react-icons/bs';
import '../App.css';
import Picker from 'emoji-picker-react';

// Creating a Firestore collection reference to the 'messages' collection
const MessagesCollection = collection(getFirestore(), 'messages');

// Creating variants for framer motion animations
const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
};

const bubbleVariants = {
    initial: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
};

// AddMessage function component
export default function AddMessage() {
    // State to store the new message input
    const [newMessage, setNewMessage] = useState('');

    // State to control whether the emoji picker is displayed
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Function to send a new message when called
    const handleSend = async () => {
        // Don't send the message if it's just whitespace
        if (newMessage.trim() !== '') {
            // Add a new document to the Firestore 'messages' collection
            await addDoc(MessagesCollection, {
                text: newMessage,
                timestamp: Date.now(),
            });

            // Clear the message input field
            setNewMessage('');
        }
    };

    // Function to handle when the Enter key is pressed in the message input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    // Function to handle when an emoji is selected from the emoji picker
    const handleEmojiClick = (emojiObject) => {
        const emoji = emojiObject.emoji;
        const modifiedEmoji = emoji;

        // Add the selected emoji to the end of the current message
        setNewMessage((prevMessage) => prevMessage + modifiedEmoji);

        // Close the emoji picker
        setShowEmojiPicker(false);
    };

    // Render the component
    return (
        <div className="addBoxRow row">
            <div className="addBox">
                {/* Emoji picker toggle button */}
                <motion.button variants={iconVariants}
                    initial="initial"
                    whileHover="hover" className="messageInputButton" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <BsEmojiSmile className="messageInputIcon" />
                </motion.button>

                {/* Message input field */}
                <input
                    className="addInput"
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {/* Bubble animation when new message is being typed */}
                {newMessage ? (
                    <motion.div
                        className="ellipseContainer"
                        variants={bubbleVariants}
                        initial="initial"
                        animate="visible"
                        exit="initial"
                    >
                        <div className="loading">
                        </div>
                    </motion.div>
                ) : null}

                {/* Send button */}
                <motion.button
                    className="messageSendButton"
                    onClick={handleSend}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                >
                    <BsFillSendFill className="messageSendIcon" />
                </motion.button>
            </div>

            {/* Emoji picker */}
            {showEmojiPicker && (
                <div className="emojiPickerContainer">
                    <Picker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}
