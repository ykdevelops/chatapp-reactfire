import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import '../App.css';
import { BsFillSendFill } from 'react-icons/bs';
import { CiMicrophoneOn } from 'react-icons/ci';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from 'emoji-picker-react';

const MessagesCollection = collection(getFirestore(), 'messages');

export default function AddMessage() {
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await addDoc(MessagesCollection, {
                text: newMessage,
                timestamp: Date.now(),
            });

            setNewMessage('');
        }
    };

    const handleEmojiClick = (emojiObject) => {
        const emoji = emojiObject.emoji;

        setNewMessage((prevMessage) => prevMessage + emoji);
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
                <button className="messageInputButton">
                    <CiMicrophoneOn className="messageInputIcon" />
                </button>
                <button className="messageSendButton">
                    <BsFillSendFill className="messageSendIcon" />
                </button>
            </div>
            {showEmojiPicker && (
                <div className="emojiPickerContainer">
                    <Picker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}
