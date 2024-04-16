//const socket = new WebSocket('ws://localhost:8000');


const roomSlug = 'bkozluca'; // Örneğin bir sohbet odası

const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomSlug}/`);


socket.addEventListener('open', function (event) {
    console.log('Connected to server');
});

socket.addEventListener('close', function (event) {
    console.log('Connection closed');
});

// Web soket üzerinden mesaj alındığında
socket.addEventListener('message', function (event) {
    console.log('JS | Received message from server:', event.data);
});

function userchanges(name)
{
    const chatInput = document.getElementById('chat-text');
    const chatHeader = document.getElementById('chat-header');
    chatHeader.innerText = `${name}`;
    chatInput.placeholder = `Type to ${name}...`;
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
    chatMessages.innerHTML += createChatMessageElement(message_text);
    document.getElementById("chat-text").value='';
	chatMessages.scrollTop = chatMessages.scrollHeight;

	// const messages = JSON.parse(localStorage.getItem('messages')) || [];
	// messages.push(messageData);
	// localStorage.setItem('messages', JSON.stringify(messages));
    // socket.send(messageData);
}

// window.onload = () => {
//     const messages = JSON.parse(localStorage.getItem('messages')) || [];
//     const chatMessages = document.querySelector('.chat-messages');
//     messages.forEach((message, index) => {
//         chatMessages.innerHTML += createChatMessageElement(message);
//         if (index === messages.length - 1) {
//             chatMessages.scrollTop = chatMessages.scrollHeight;
//         }
//     });
// };


//DENEME KONSOL ICIN


// function sendMessage(username, message) 
// {
//     if (socket.readyState === WebSocket.OPEN) {
//         const messageData = {username: username, message: message, room_name: roomSlug};
//         socket.send(JSON.stringify(messageData));
//     } else {
//         console.log('WebSocket connection is not open. Unable to send message.');
//     }
// }