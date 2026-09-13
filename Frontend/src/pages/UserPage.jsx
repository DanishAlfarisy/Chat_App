import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api';
import UserList from '../components/UserList';

function UserPage(){
    
    const currentUserId = 1;
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
        navigate(`/chat/${user.id}`);
    };

     return (
        <UserList
            users={users}
            currentUserId={currentUserId}
            onSelectUser={handleSelectedUser}
        />
    );
}
export default UserPage;