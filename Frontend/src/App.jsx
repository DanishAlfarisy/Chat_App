import { useEffect } from 'react';
import { io } from 'socket.io-client';

import ChatPage from './pages/ChatPage';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Terhubung ke Socket.IO:', socket.id);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return <ChatPage />;
}

export default App;