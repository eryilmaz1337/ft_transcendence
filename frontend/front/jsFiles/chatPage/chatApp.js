const johnSelectorBtn = document.querySelector('#john-selector');
const janeSelectorBtn = document.querySelector('#jane-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || []

function createChatMessageElement(message)
{
	return `
	<div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
		<div class="message-sender">${message.sender}</div>
		<div class="message-text">${message.text}</div>
		<div class="message-timestamp">${message.timestamp}</div>
	</div>
	`;
}


// function sendMessage() 
// {
// 	const messageData = {
// 		message: document.getElementById("chat-text").value,	
// 	}
// 	chatMessages.innerHTML += createChatMessageElement(messageData.message)
// 	window.onload = () => {
// 		messages.forEach((message) => {
// 			chatMessages.innerHTML += createChatMessageElement(message);
// 		})
// 	}
// 	document.getElementById("chat-text").value='';
// 	// socket.send(messageData);
	
// }


const socket = new WebSocket('ws://localhost:8000/ws/chat/');

socket.onopen = function(event) {
    console.log('WebSocket bağlantısı başarıyla kuruldu.');
    
    // Sunucuya mesaj gönder
    socket.send(JSON.stringify({"message": "Merhaba sunucu!", "username": "ben"}));
};

socket.addEventListener('open', function (event) {
	console.log('Connected to server');
});

socket.addEventListener('close', function (event) {
	console.log('Connection closed');
});

// Web soket üzerinden mesaj alındığında
socket.onmessage = function(event) {
    console.log('Received message from server:', event.data);
};

function sendMessageToServer(message) {
    // Örnek olarak, message adında bir değişken ile iletilmek istenen mesajı alıyoruz
    // Eğer socket nesnesi mevcut değilse veya sunucu bağlantısı kurulmamışsa burada bir hata yönetimi eklemek önemlidir.
    
    // Örneğin:
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("Socket connection is not open.");
        return;
    }
	console.log("message");
    // Mesajı sunucuya gönderiyoruz
    socket.send(message);
}

function sendMessage() 
{
	const messageData = {
		message: document.getElementById("chat-text").value,	
	}
	document.getElementById("chat-text").value='';
	sendMessageToServer(JSON.stringify(messageData));
}
  
  // Örnek kullanım
//   sendMessage("Merhaba, bu bir test mesajıdır.", "kullanici_adi", "chat_1")