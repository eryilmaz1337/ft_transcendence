let socket;
let receiver_username;

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
        const chatMessages = document.getElementById('chat');
        chatMessages.innerHTML += createChatMessageElementReceiver(messageData);
        chatMessages.scrollTop = chatMessages.scrollHeight;
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
    receiver_username = name;
}

function clearmessage()
{
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
}

function createChatMessageElementReceiver(message) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `
    <div class="message gray-bg" style="width: 100%; display: flex; justify-content: flex-end;">
        <div class = "message-sender">${receiver_username}</div>
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
    if(!message_text)
        return;
    
    const messageData = {
        receiver_username: receiver_username,
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
