import { useState } from 'react';

function ChatInput({ onSend, onTyping }) {
    const [message, setMessage] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;

        setMessage(value);

        // User mulai / masih mengetik
        onTyping(true);

        // Hapus timer sebelumnya
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Jika 1 detik tidak mengetik lagi
        // berarti user berhenti mengetik
        const timeout = setTimeout(() => {
            onTyping(false);
        }, 5000);

        setTypingTimeout(timeout);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!message.trim()) {
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
                onChange={handleChange}
            />

            <button type="submit">
                Send
            </button>
        </form>
    );
}

export default ChatInput;