import { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

import {
    getUsers,
    getMessages,
    sendMessage
} from '../services/api';

function ChatPage() {
    const currentUserId = 1;

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (!selectedUser) {
            return;
        }

        getMessages(currentUserId, selectedUser.id)
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [selectedUser]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSendMessage = async (message) => {
        if (!selectedUser) {
            return;
        }

        try {
            await sendMessage(
                currentUserId,
                selectedUser.id,
                message
            );

            const updatedMessages = await getMessages(
                currentUserId,
                selectedUser.id
            );

            setMessages(updatedMessages);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="chat-layout">

            <UserList
                users={users}
                onSelectUser={handleSelectUser}
            />

            <div className="chat-container">

                <ChatHeader user={selectedUser} />

                <ChatMessages
                    messages={messages}
                    currentUserId={currentUserId}
                />

                <ChatInput
                    onSend={handleSendMessage}
                />

            </div>

        </div>
    );
}

export default ChatPage;