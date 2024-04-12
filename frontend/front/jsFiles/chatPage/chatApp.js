const socket = new WebSocket('ws://localhost:8000');

socket.addEventListener('open', function (event) {
    console.log('Connected to server');
});

socket.addEventListener('close', function (event) {
    console.log('Connection closed');
});

// Web soket üzerinden mesaj alındığında
socket.addEventListener('message', function (event) {
    console.log('Received message from server:', event.data);
});

function userchanges(name)
{
    const chatInput = document.getElementById('chat-text');
    const chatHeader = document.getElementById('chat-header');
    chatHeader.innerText = `${name} chatting...`;
    chatInput.placeholder = `Type here, ${name}...`;
    //clearmessage();
}

function clearmessage()
{
	const chat = document.getElementById('chat');
	chat.innerHTML = '';
}


function createChatMessageElement(message)
{
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `
    <div class="message gray-bg" style="width: 50%; display: flex; align-self: flex-end">
        <div class="message-sender">${sessionStorage.getItem('username')}</div>
        <div class="message-text">${message}</div>
        <div class="message-timestamp">${hours}:${minutes}</div>
    </div>
    `;
}

function sendMessage()
{
    const message_text = document.getElementById("chat-text").value;
    if(!message_text)
        return;
    const chatMessages = document.getElementById('chat');
    const messageData = {
        message: message_text,
    };
    chatMessages.innerHTML += createChatMessageElement(messageData.message);
    document.getElementById("chat-text").value='';
	chatMessages.scrollTop = chatMessages.scrollHeight;

	const messages = JSON.parse(localStorage.getItem('messages')) || [];
	messages.push(messageData);
	localStorage.setItem('messages', JSON.stringify(messages));
    // socket.send(messageData);
}

window.onload = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatMessages = document.querySelector('.chat-messages');
    messages.forEach((message, index) => {
        chatMessages.innerHTML += createChatMessageElement(message);
        if (index === messages.length - 1) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
};
