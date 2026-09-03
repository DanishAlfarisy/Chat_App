import { useEffect, useState } from 'react';

function App() {
    const [messages, setMessages] = useState([]);

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

    return (
        <div>
            <h1>Simple Chat</h1>

            {messages.map(message => (
                <p key={message.id}>
                    {message.message}
                </p>
            ))}
        </div>
    );
}

export default App;