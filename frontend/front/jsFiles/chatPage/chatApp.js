//const socket = new WebSocket('ws://localhost:8000');


 // Örneğin bir sohbet odası
 document.addEventListener('DOMContentLoaded', function() {
    var wsStart = 'ws://';
    if (window.location.protocol === 'https:') {
        wsStart = 'wss://';
    }
    var endpoint = wsStart + window.location.host + '/ws/chat/YOUR_ROOM_SLUG_HERE/';
    var socket = new WebSocket(endpoint);

    socket.onopen = function(e) {
        console.log('Chat socket opened', e);
    };

    socket.onerror = function(e) {
        console.log('Chat socket encountered error: ', e.message, 'Closing socket');
        socket.close();
    };

    socket.onmessage = function(e) {
        console.log('Message:', e.data);
        var messageData = JSON.parse(e.data);
        var chatLog = document.getElementById('chat-log');
        chatLog.innerHTML += '<div><strong>' + messageData.sender_username + ':</strong> ' + messageData.message + '</div>';
    };

    socket.onclose = function(e) {
        console.log('Chat socket closed unexpectedly');
    };

    document.getElementById('send-button').onclick = function(e) {
        var messageInput = document.getElementById('message-input');
        var receiverInput = document.getElementById('receiver-input');
        var message = messageInput.value.trim();
        var receiver = receiverInput.value.trim();

        if (message && receiver) {
            socket.send(JSON.stringify({
                'message': message,
                'receiver_username': receiver
            }));
            messageInput.value = '';
        }
    };
});



 function con()
 {
     const roomSlug = sessionStorage.getItem("securitykey");
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
 }


 function userchanges(name)
 {
     const chatInput = document.getElementById('chat-text');
     const chatHeader = document.getElementById('chat-header');
     const myUsername = sessionStorage.getItem('username');
     chatHeader.innerText = `${myUsername}'s chatting...`;
     chatHeader.style.color = 'greenyellow';
     chatInput.placeholder = `Type to ${name}...`;
     //clearmessage();
 }

 function clearmessage()
 {
     const chat = document.getElementById('chat');
     chat.innerHTML = '';
 }


 function createChatMessageElement(message) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    // const myUsername = sessionStorage.getItem('username');
    // const name = sessionStorage.getItem('name');
    // let backgroundColor;

    // if (myUsername === name)
    //     backgroundColor = 'blue-bg';
    // else
    //     backgroundColor = 'gray-bg';
    return `
    <div class="message blue-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${sessionStorage.getItem('username')}</div>
        <div class="message-text">${message}</div>
        <div class="message-timestamp" style="text-align: right;">${hours}:${minutes}</div>
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
 }

