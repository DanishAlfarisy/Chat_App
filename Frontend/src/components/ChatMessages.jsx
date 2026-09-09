function ChatMessages({ messages, currentUserId }) {
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
        </div>
    );
}

export default ChatMessages;