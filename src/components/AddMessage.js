import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import '../App.css';
import { BsFillSendFill } from 'react-icons/bs';
import { CiMicrophoneOn } from 'react-icons/ci';
import { BsEmojiSmile } from 'react-icons/bs';
const MessagesCollection = collection(getFirestore(), 'messages');

export default function AddMessage() {
    const [newMessage, setNewMessage] = useState('');

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await addDoc(MessagesCollection, {
                text: newMessage,
                timestamp: Date.now(),
            });

            setNewMessage('');
        }
    };

    return (
        <div className='addBoxRow'>
            <div className='addBox'>
                <button className="messageInputButton" >
                    <BsEmojiSmile className="messageInputIcon" />
                </button>
                <input
                    className='addInput'
                    type='text'
                    placeholder='Type a message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="messageInputButton" >
                    <CiMicrophoneOn className="messageInputIcon" />
                </button>
                <button className="messageInputButton" >
                    <BsFillSendFill className="messageInputIcon" />
                </button>
            </div>
        </div>

    );
}
