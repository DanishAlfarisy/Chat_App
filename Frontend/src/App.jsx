import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ChatPage from './pages/ChatPage';
import './App.css'; 

function App() {
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