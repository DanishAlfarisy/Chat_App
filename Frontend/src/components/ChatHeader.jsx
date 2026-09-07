function ChatHeader({ user }) {
    return (
        <div className="chat-header">
            <h2>Chat App</h2>

            {user ? (
                <p>{user.name}</p>
            ) : (
                <p>Pilih user untuk chatting</p>
            )}
        </div>
    );
}

export default ChatHeader;