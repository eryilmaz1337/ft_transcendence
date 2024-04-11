// chatApp.js

// WebSocket bağlantısını oluşturun
const socket = new WebSocket('ws://localhost:8000/ws/chat/');
const chatMessages = document.querySelector('.chat-messages');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Web soket üzerinden mesaj alındığında
socket.addEventListener('message', function (event) {
    console.log('Serverdan alınan mesaj:', event.data);
    // Mesajı işlemek için uygun işlevi çağırın
    handleReceivedMessage(JSON.parse(event.data));
});

// Alınan mesajı işleyen işlev
function handleReceivedMessage(message) {
    // Mesajı depolayın
    messages.push(message);
    // Mesajı DOM'a ekleyin
    chatMessages.innerHTML += createChatMessageElement(message);
    // Eklenen mesajı kaydettikten sonra, sayfanın en altına kaydırın
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mesaj gönderme işlevini güncelleyin
function sendMessage(e) {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    /* Save message to local storage */
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    /* Send message via WebSocket */
    socket.send(JSON.stringify(message));

    /* Add message to DOM */
    chatMessages.innerHTML += createChatMessageElement(message);

    /* Clear input field */
    chatInputForm.reset();

    /* Scroll to bottom of chat messages */
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mesaj gönderme işlevini formun submit olayına bağlayın
chatInputForm.addEventListener('submit', sendMessage);

// Clear chat butonunun tıklama olayına bağlayın
clearChatBtn.addEventListener('click', () => {
    // Local storage'ı temizle
    localStorage.clear();
    // Chat mesajlarını temizle
    chatMessages.innerHTML = '';
});

// Örnek bir mesaj oluşturmak için işlevi güncelleyin
function createChatMessageElement(message) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `
    <div class="message gray-bg" style="width: 50%; display: flex; align-self: flex-end">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${hours}:${minutes}</div>
    </div>
    `;
}
