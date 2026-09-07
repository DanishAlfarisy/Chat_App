import { useState } from 'react';

function ChatInput({ onSend }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.trim() === '') {
            return;
        }

        onSend(message);

        setMessage('');
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ketik pesan..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit">
                Send
            </button>
        </form>
    );
}

export default ChatInput;