let socket;
let receiver_username;
let showm;
var offlineUSerList = [];
function addfriends()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem('securitykey'),
        jsonusername: sessionStorage.getItem('username'),
        jsonfriend: receiver_username,
      }
      fetch("http://localhost:8000/api/account/friendsadd/", {
          method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
          if (data) {
            alert("add friends");
        }else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

function adddarklist()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem('securitykey'),
        jsonusername: sessionStorage.getItem('username'),
        jsondarkfriend: receiver_username,
      }
      fetch("http://localhost:8000/api/account/darklistadd/", {
          method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
          if (data) {
            alert("add darklist");
        }else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

function onlineuseradd(selectedValue)
{
    showm = false;
    var selectElement = document.getElementsByClassName("dropdown")[0];
    var option = document.createElement("option");
    option.text = selectedValue;
    option.value = selectedValue;
    selectElement.add(option);
}

function offlineuseradd(selectedValue)
{
    var selectElement = document.getElementsByClassName("dropdown")[1];
    var option = document.createElement("option");
    option.text = selectedValue;
    option.value = selectedValue;
    selectElement.add(option);
    offlineUSerList.push(selectedValue);
}

function frienduseradd(selectedValue)
{
    var selectElement = document.getElementsByClassName("dropdown")[2];
    var option = document.createElement("option");
    option.text = selectedValue;
    option.value = selectedValue;
    selectElement.add(option);
}

function  getfriends()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem('securitykey'),
        jsonusername: sessionStorage.getItem('username')
      }
      fetch("http://localhost:8000/api/account/getfriends/", {
          method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
          if (data) {
            const offlineUsers = data.friend_users;
            offlineUsers.forEach(user => {
                console.log(data);
                frienduseradd(user.username);
            });
        }else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

function getonlinestatususer()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem('securitykey')
      }
      fetch("http://localhost:8000/api/account/onlineusers/", {
          method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
          if (data) {
            const onlineUsers = data.online_users;
            onlineUsers.forEach(user => {
                if(user.username != sessionStorage.getItem("username"))
                {
                    onlineuseradd(user.username);
                }
            });
        }else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

function  getofflinestatususer()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem('securitykey')
      }
      fetch("http://localhost:8000/api/account/offlineusers/", {
          method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
          if (data) {
            const offlineUsers = data.offline_users;
            offlineUsers.forEach(user => {
                offlineuseradd(user.username);
            });
        }else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

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
        if(messageData.sender_username == receiver_username && showm == true)
        {
            const chatMessages = document.getElementById('chat');
            chatMessages.innerHTML += createChatMessageElementReceiver(messageData);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            const myUsername = messageData.sender_username;
            const messageDataadd =
            {
                sender: myUsername,
                receiver_username: sessionStorage.getItem('username'),
                message: messageData.message,
                timestamp: new Date().toISOString(),
            };
            let storedMessages = JSON.parse(sessionStorage.getItem('messages')) || {};
            let messageKey = `${myUsername}_${sessionStorage.getItem('username')}`;
            let messages = storedMessages[messageKey] || [];
            messages.push(messageDataadd);
            storedMessages[messageKey] = messages;
            sessionStorage.setItem('messages', JSON.stringify(storedMessages));
        }
        else
        {
            const myUsername = messageData.sender_username;
            const messageDataadd =
            {
                sender: myUsername,
                receiver_username: sessionStorage.getItem('username'),
                message: messageData.message,
                timestamp: new Date().toISOString(),
            };
            let storedMessages = JSON.parse(sessionStorage.getItem('messages')) || {};
            let messageKey = `${myUsername}_${sessionStorage.getItem('username')}`;
            let messages = storedMessages[messageKey] || [];
            messages.push(messageDataadd);
            storedMessages[messageKey] = messages;
            sessionStorage.setItem('messages', JSON.stringify(storedMessages));
        }
    });
}

function userchanges(name)
{
    if(name && name.trim().length != 0)
    {const chatInput = document.getElementById('chat-text');
    const chatHeader = document.getElementById('chat-header');
    const myUsername = sessionStorage.getItem('username');
    chatHeader.innerHTML = `${myUsername} is chatting with <a href="#" onclick="goToProfile('${name}')">${name}</a>`;
    chatHeader.style.color = 'greenyellow';
    chatInput.placeholder = `Type to ${name}...`;
    receiver_username = name;
    showm = true;

    if(offlineUSerList.includes(name)){
        chatInput.disabled = true;
        var sendButtons = document.getElementsByClassName("send-button");
        for (var j = 0; j < sendButtons.length; j++) {
            sendButtons[j].disabled = true;
          }
    } else {
        chatInput.disabled = false;
        var sendButtons = document.getElementsByClassName("send-button");
        for (var j = 0; j < sendButtons.length; j++) {
            sendButtons[j].disabled = false;
          }
    }

    loadMessages(myUsername, name);}
}

function goToProfile(username)
{
    window.location.href = `/publicProfile/${username}`;
}

function loadMessages(sender, receiver)
{
    clearmessage(); // Clear the chat window first
    let storedMessages = JSON.parse(sessionStorage.getItem('messages')) || {};
    let messageKey = `${sender}_${receiver}`;
    let reverseMessageKey = `${receiver}_${sender}`; // To load messages sent by the other user as well

    let messagesToShow = (storedMessages[messageKey] || []).concat(storedMessages[reverseMessageKey] || []);
    messagesToShow.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort messages by timestamp

    messagesToShow.forEach(message => {
        displayMessager(message,receiver_username);
    });
}


function clearmessage()
{
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
}

function createChatMessageElementReceiver(message) {
    return `
    <div class="message gray-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${message.sender_username}</div>
        <div class="message-text">${message.message}</div>
        </div>
        `;
        // <div class="message-timestamp" style="text-align: right;">${hours}:${minutes}</div>
}

function createChatMessageElementReceiverr(message,rusername) {
    return `
    <div class="message gray-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${rusername}</div>
        <div class="message-text">${message.message}</div>
        </div>
        `;
        // <div class="message-timestamp" style="text-align: right;">${hours}:${minutes}</div>
}

function createChatMessageElement(message) 
{
    return `
    <div class="message blue-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${sessionStorage.getItem('username')}</div>
        <div class="message-text">${message.message}</div>
        </div>
        `;
}

function sendMessage()
{
    const message_text = document.getElementById("chat-text").value;
    if(!receiver_username){
        alert("Seçili kullanıcı yok");
        return;
    }
    if(!message_text)
        return;

    const myUsername = sessionStorage.getItem('username');
    const messageData = {
        sender: myUsername,
        receiver_username: receiver_username,
        message: message_text,
        timestamp: new Date().toISOString(),
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
    } else {
        console.error('WebSocket is not open.');
    }

    // Session Storage'a kaydetme
    let storedMessages = JSON.parse(sessionStorage.getItem('messages')) || {};
    let messageKey = `${myUsername}_${receiver_username}`;
    let messages = storedMessages[messageKey] || [];
    messages.push(messageData);
    storedMessages[messageKey] = messages;
    sessionStorage.setItem('messages', JSON.stringify(storedMessages));

    displayMessage(messageData);
}

function displayMessage(message)
{
    const chatMessages = document.getElementById('chat');
    if (message.sender === sessionStorage.getItem('username')) {
        // Aktif kullanıcı tarafından gönderilmiş mesaj
        chatMessages.innerHTML += createChatMessageElement(message);
    } else {
        // Başka bir kullanıcı tarafından gönderilmiş mesaj
        chatMessages.innerHTML += createChatMessageElementReceiver(message);
    }
    document.getElementById("chat-text").value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayMessager(message,rusername)
{
    const chatMessages = document.getElementById('chat');
    if (message.sender === sessionStorage.getItem('username')) {
        // Aktif kullanıcı tarafından gönderilmiş mesaj
        chatMessages.innerHTML += createChatMessageElement(message);
    } else {
        // Başka bir kullanıcı tarafından gönderilmiş mesaj
        chatMessages.innerHTML += createChatMessageElementReceiverr(message,rusername);
    }
    document.getElementById("chat-text").value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//Oyuna Davet Kısmı
function oyunadavet() {
    const message_text = `<a href="#onevsone" return false;">SENİ OYUNA DAVET EDİYORUM</a>`;
    const myUsername = sessionStorage.getItem('username');
    const messageData = {
        sender: myUsername,
        receiver_username: receiver_username,
        message: message_text,
        timestamp: new Date().toISOString(),
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
    } else {
        console.error('WebSocket is not open.');
    }
    // Session Storage'a kaydetme
    let storedMessages = JSON.parse(sessionStorage.getItem('messages')) || {};
    let messageKey = `${myUsername}_${receiver_username}`;
    let messages = storedMessages[messageKey] || [];
    messages.push(messageData);
    storedMessages[messageKey] = messages;
    sessionStorage.setItem('messages', JSON.stringify(storedMessages));

    displayMessage(messageData);
}
