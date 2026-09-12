import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import UserPage from './pages/UserPage';
import ChatPage from './pages/ChatPage';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Terhubung ke Socket.IO:', socket.id);
        });

        
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/chat/:userId" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;