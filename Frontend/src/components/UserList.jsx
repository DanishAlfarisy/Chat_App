function UserList({ users, currentUserId, onSelectUser }) {
    const otherUsers = users.filter(
        user => user.id !== currentUserId
    );

    return (
        <section className="people-list">

            <div className="list-meta">
                <span>{otherUsers.length} PEOPLE</span>
                <span>SELECT TO CHAT</span>
            </div>

            {otherUsers.map((user, index) => (
                <button
                    key={user.id}
                    className="person"
                    onClick={() => onSelectUser(user)}
                >
                    <span className="person-number">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="person-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </span>

                    <span className="person-name">
                        {user.name}
                    </span>

                    <span className="person-id">
                        ID {user.id}
                    </span>

                    <span className="person-arrow">↗</span>
                </button>
            ))}

            {otherUsers.length === 0 && (
                <div className="empty-people">
                    No other users available.
                </div>
            )}

        </section>
    );
}

export default UserList;