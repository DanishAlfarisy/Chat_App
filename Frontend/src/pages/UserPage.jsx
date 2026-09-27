import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getUsers } from '../services/api';
import UserList from '../components/UserList';

function UserPage() {
    const [searchParams] = useSearchParams();
    const currentUserId = Number(searchParams.get('user'));

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSelectedUser = (user) => {
        navigate(`/chat/${user.id}?user=${currentUserId}`);
    };

    return (
        <main className="people-page">
            <div className="people-shell">

                <header className="people-top">
                    <div>
                        <span className="page-index">01 / PEOPLE</span>
                        <h1>Who do you want<br />to talk to?</h1>
                    </div>

                    <div className="identity">
                        <span>YOU</span>
                        <strong>#{currentUserId}</strong>
                    </div>
                </header>

                <UserList
                    users={users}
                    currentUserId={currentUserId}
                    onSelectUser={handleSelectedUser}
                />

            </div>
        </main>
    );
}

export default UserPage;