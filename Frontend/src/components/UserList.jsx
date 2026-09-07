function UserList({ users, onSelectUser }) {
    return (
        <div className="user-list">
            <h3>Users</h3>

            {users.map(user => (
                <button
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                >
                    {user.name}
                </button>
            ))}
        </div>
    );
}

export default UserList;