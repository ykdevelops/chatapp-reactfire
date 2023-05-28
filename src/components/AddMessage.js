import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BsEmojiSmile } from 'react-icons/bs';
import { BsFillSendFill } from 'react-icons/bs';
import '../App.css';
import Picker from 'emoji-picker-react';
const MessagesCollection = collection(getFirestore(), 'messages');


const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
};

const bubbleVariants = {
    initial: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
};


export default function AddMessage() {
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSend = async () => {
        if (newMessage.trim() !== '') {
            await addDoc(MessagesCollection, {
                text: newMessage,
                timestamp: Date.now(),
            });

            setNewMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };
    const handleEmojiClick = (emojiObject) => {
        const emoji = emojiObject.emoji;
        const modifiedEmoji = emoji;

        setNewMessage((prevMessage) => prevMessage + modifiedEmoji);
        setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
    };


    return (
        <div className="addBoxRow">
            <div className="addBox">
                <button className="messageInputButton" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <BsEmojiSmile className="messageInputIcon" />
                </button>
                <input
                    className="addInput"
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

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
            {showEmojiPicker && (
                <div className="emojiPickerContainer">
                    <Picker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}
