import { useEffect, useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { getUsers } from '../services/api';
import UserList from '../components/UserList';

function UserPage(){
    
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
        <UserList
            users={users}
            currentUserId={currentUserId}
            onSelectUser={handleSelectedUser}
        />
    );
}
export default UserPage;