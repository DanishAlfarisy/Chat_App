import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const params = new URLSearchParams(window.location.search);
    const userId = Number(params.get('user'));
    const receiverId = userId === 1 ? 2 : 1;
    const users = {
    1: 'Andi',
    2: 'Budi'
};
    const receiverName = users[receiverId];
    

    useEffect(() => {
        fetch(`http://localhost:3000/messages/${userId}/${receiverId}`)
            .then(response => response.json())
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const sendMessage = () => {
    if (newMessage.trim() === '') {
        return;
    }

    fetch(`http://localhost:3000/messages/${userId}/${receiverId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: newMessage
        })
    })
        .then(response => response.json())
        .then(() => {
            setNewMessage('');

            fetch(`http://localhost:3000/messages/${userId}/${receiverId}`)
                .then(response => response.json())
                .then(data => {
                    setMessages(data);
                });
        });
};

    return (
        <div className="chat-container">

            <div className="chat-header">
                <h2>Chat App</h2>
                <p>{receiverName}</p>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={
                            message.sender_id === userId
                                ? 'message sent'
                                : 'message received'
                        }
                    >
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Ketik pesan..."
                     value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    );
}

export default App;