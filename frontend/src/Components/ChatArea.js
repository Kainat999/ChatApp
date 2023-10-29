import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import withAuthentication from './utils/withAuthentication';


export default function ChatArea({ selectedUserId }) {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if(!selectedUserId) return;
    
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${selectedUserId}/?token=${token}`);
        
        ws.onopen = () => {
            console.log('Connected to the WebSocket');
        };

        ws.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages(prev => [...prev, messageData]);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [selectedUserId]); 

    return (
        <div className='chat-area'>
            <div className='chat-header'>
                {selectedUserId ? `Conversation with user ID: ${selectedUserId}` : "Select a user to start a conversation."}
            </div>
            <div className='messages'>
                {messages.map((message, index) => (
                    <Message 
                        key={index} 
                        text={message.text} 
                        sent={message.sent}
                    />
                ))}
            </div>
            <MessageInput socket={socket} />
        </div>
    )
}


// export default withAuthentication(ChatArea)