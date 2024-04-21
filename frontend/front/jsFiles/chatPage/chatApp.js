//const socket = new WebSocket('ws://localhost:8000');

const socketUrl = 'ws://localhost:8000/ws/chat/ROOM_SLUG/'; // WebSocket endpoint URL'niz, ROOM_SLUG alanını uygun değer ile değiştirin
let websocket = null;

function openWebSocket() {
    websocket = new WebSocket(socketUrl);

    websocket.onopen = function(event) {
        console.log('Connection opened!');
    };

    websocket.onerror = function(event) {
        console.error('WebSocket error:', event);
    };

    websocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'chat.message') {
            console.log(`Message from ${data.sender_username}: ${data.message}`);
        }
    };

    websocket.onclose = function(event) {
        console.log('WebSocket closed:', event);
    };
}

function sendMessage(receiver, message) {
    const data = JSON.stringify({
        receiver_username: receiver,
        message: message
    });

    if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(data);
    } else {
        console.error('WebSocket is not open.');
    }
}

function closeWebSocket() {
    if (websocket) {
        websocket.close();
    }
}

// WebSocket bağlantısını aç
openWebSocket();

// Mesaj gönderme örneği (konsoldan `sendMessage('kullanıcı_adı', 'Merhaba!')` şeklinde çağırılabilir)
// sendMessage('otheruser', 'Hello there!');

// WebSocket bağlantısını kapamak için `closeWebSocket()` fonksiyonu kullanılabilir.


 // Örneğin bir sohbet odası

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