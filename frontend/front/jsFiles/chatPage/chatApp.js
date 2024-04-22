

// function sendMessage(receiver, message) {
//     const data = JSON.stringify({
//         receiver_username: receiver,
//         message: message
//     });

//     if (websocket && websocket.readyState === WebSocket.OPEN) {
//         websocket.send(data);
//     } else {
//         console.error('WebSocket is not open.');
//     }
// }

// Mesaj gönderme örneği (konsoldan `sendMessage('kullanıcı_adı', 'Merhaba!')` şeklinde çağırılabilir)
// sendMessage('otheruser', 'Hello there!');

// WebSocket bağlantısını kapamak için `closeWebSocket()` fonksiyonu kullanılabilir.
let socket;

function con()
{
    const roomSlug = sessionStorage.getItem("securitykey");
    socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomSlug}/`);
    socket.addEventListener('open', function (event) {
        console.log('Connected to server');
    });

    socket.addEventListener('close', function (event) {
        console.log('Connection closed');
    });

    socket.addEventListener('error', function (error) {
        console.error('WebSocket error:', error);
    });

     // Web soket üzerinden mesaj alındığında
     socket.addEventListener('message', function (event) {
        console.log('JS | Received message from server:', event.data);
        const messageData = JSON.parse(event.data);
        console.log(messageData);
        messageData.innerHTML += createChatMessageElementReceiver(messageData);
        document.getElementById('chat-text').value='';
        messageData.scrollTop = messageData.scrollHeight;
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

//farklı websocketlere istek atıyor onu düzeltmek gerekiyor.!!
function createChatMessageElementReceiver(message) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const myUsername = sessionStorage.getItem('username');

    return `
    <div class="message gray-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${sessionStorage.getItem('username')}</div>
        <div class="message-text">${message.message}</div>
        <div class="message-timestamp" style="text-align: right;">${hours}:${minutes}</div>
    </div>
    `;
}

function createChatMessageElement(message) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const myUsername = sessionStorage.getItem('username');
    // const name = sessionStorage.getItem('name');
    // let backgroundColor;

    // if (myUsername === name)
    //     backgroundColor = 'blue-bg';
    // else
    //     backgroundColor = 'gray-bg';
    return `
    <div class="message blue-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${sessionStorage.getItem('username')}</div>
        <div class="message-text">${message.message}</div>
        <div class="message-timestamp" style="text-align: right;">${hours}:${minutes}</div>
    </div>
    `;
}

function sendMessage()
{
    const message_text = document.getElementById("chat-text").value;
    const receiver = 'y'; //burayı güncelle hedefe göre
    if(!message_text)
        return;
    
    const messageData = {
        receiver_username: receiver,
        message: message_text,
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
    } else {
        console.error('WebSocket is not open.');
    }

    const chatMessages = document.getElementById('chat');
    chatMessages.innerHTML += createChatMessageElement(messageData);
    document.getElementById("chat-text").value='';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
