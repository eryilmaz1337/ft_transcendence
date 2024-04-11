// chatApp.js

// WebSocket bağlantısını oluşturun


const roomSlug = 'bkozluca'; // Bu isim api'dan çekilecek.


const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomSlug}/`);

socket.addEventListener('open', function (event) {
	console.log('Connected to server');
});

socket.addEventListener('close', function (event) {
	console.log('Connection closed');
});

socket.addEventListener('message', function (event) {
	console.log('Received message from server:', event.data);
});

const chatMessages = document.querySelector('.chat-messages');
//let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Web soket üzerinden mesaj alındığında
socket.addEventListener('message', function (event) {
    console.log('Serverdan alınan mesaj:', event.data);
    // Mesajı işlemek için uygun işlevi çağırın
    //handleReceivedMessage(JSON.parse(event.data));
});

// Alınan mesajı işleyen işlev
// function handleReceivedMessage(message) {
//     // Mesajı depolayın
//     messages.push(message);
//     // Mesajı DOM'a ekleyin
//     chatMessages.innerHTML += createChatMessageElement(message);
//     // Eklenen mesajı kaydettikten sonra, sayfanın en altına kaydırın
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

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

function sendMessage() 
{
	message_text = document.getElementById("chat-text").value;
	console.log(message_text);
	if(!message_text)
		return;
	const username = 'bkozluca';  // Bu değeri dinamik bir şekilde elde etmeniz gerekebilir
	const roomName = username;

	const messageData = {
		message: message_text,
		username: username,  // Kullanıcı adını da mesajla birlikte gönder
		room_name: roomName,
	};

	const chatMessages = document.getElementById('chat');

	chatMessages.innerHTML += createChatMessageElement(messageData.message, messageData.username);
	document.getElementById("chat-text").value='';
	socket.send(JSON.stringify(messageData));
}

//KONSOL DENEME

function sendMessage(mesaj) 
{

	const messageData = {
		message: mesaj,
		username: 'bkozluca',  // Kullanıcı adını da mesajla birlikte gönder
		room_name: 'bkozluca',
	};
	console.log(messageData);
	socket.send(JSON.stringify(messageData));
}


// Mesaj gönderme işlevini güncelleyin
// function sendMessage(e) {
//     e.preventDefault();

//     const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
//     const message = {
//         sender: messageSender,
//         text: chatInput.value,
//         timestamp,
//     };

//     /* Save message to local storage */
//     messages.push(message);
//     localStorage.setItem('messages', JSON.stringify(messages));

//     /* Send message via WebSocket */
//     socket.send(JSON.stringify(message));

//     /* Add message to DOM */
//     chatMessages.innerHTML += createChatMessageElement(message);

//     /* Clear input field */
//     chatInputForm.reset();

//     /* Scroll to bottom of chat messages */
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// // Mesaj gönderme işlevini formun submit olayına bağlayın
// chatInputForm.addEventListener('submit', sendMessage);

// // Clear chat butonunun tıklama olayına bağlayın
// clearChatBtn.addEventListener('click', () => {
//     // Local storage'ı temizle
//     localStorage.clear();
//     // Chat mesajlarını temizle
//     chatMessages.innerHTML = '';
// });

// Örnek bir mesaj oluşturmak için işlevi güncelleyin

