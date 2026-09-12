const API_URL = 'http://localhost:3000';

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error('Gagal mengambil users');
    }

    return response.json();
}

export async function getMessages(senderId, receiverId) {
    const response = await fetch(
        `${API_URL}/messages/${senderId}/${receiverId}`
    );

    if (!response.ok) {
        throw new Error('Gagal mengambil messages');
    }

    return response.json();
}

export async function sendMessage(senderId, receiverId, message) {
    const response = await fetch(
        `${API_URL}/messages/${senderId}/${receiverId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message
            })
        }
    );

    // Untuk debugging
    console.log('POST status:', response.status);

    const data = await response.json();

    if (!response.ok) {
        console.error('POST error:', data);

        throw new Error('Gagal mengirim message');
    }

    return data;
}