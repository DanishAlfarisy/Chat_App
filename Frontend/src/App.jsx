import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/messages/1/2')
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

    fetch('http://localhost:3000/messages/1/2', {
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

            fetch('http://localhost:3000/messages/1/2')
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
                <p>Daffa</p>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={
                            message.sender_id === 1
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