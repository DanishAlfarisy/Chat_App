function ChatMessages({ messages, currentUserId, isTyping }) {
    return (
        <div className="chat-messages">
            {messages.map(message => (
                <div
                    key={message.id}
                    className={
                        message.sender_id === currentUserId
                            ? 'message sent'
                            : 'message received'
                    }
                >
                    <p>{message.message}</p>
                </div>
            ))}
            {isTyping && (
                <div className="message received typing">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            )}
        </div>
    );
}

export default ChatMessages;