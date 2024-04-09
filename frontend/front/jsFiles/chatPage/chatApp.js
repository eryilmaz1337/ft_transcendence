
const socket = new WebSocket('ws://localhost:8000/ws/chat/');

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
	message_text = document.getElementById("chat-text").value;
	if(!message_text)
		return;
	const chatMessages = document.getElementById('chat');
	const messageData = {
		message: message_text,	
	}
	chatMessages.innerHTML += createChatMessageElement(messageData.message)
	document.getElementById("chat-text").value='';
	// socket.send(messageData);
}


// function sendMessage() 
// {
// 	const messageData = {
// 		message: document.getElementById("chat-text").value,	
// 	}
// 	document.getElementById("chat-text").value='';
// 	socket.send(messageData);
// }
  
  // Örnek kullanım
//   sendMessage("Merhaba, bu bir test mesajıdır.", "kullanici_adi", "chat_1")