let socket;
let receiver_username;
let showm;
var offlineUSerList = [];

function addfriends()
{
    if (is_flag == true)
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
}

function adddarklist()
{
    if (is_flag == true)
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

let is_flag = false;

function userchanges(name)
{
    if(name && name.trim().length != 0)
    {const chatInput = document.getElementById('chat-text');
    const chatHeader = document.getElementById('chat-header');
    const myUsername = sessionStorage.getItem('username');
    chatHeader.innerHTML = `${myUsername} is chatting with <a href="#publicProfile" onclick="rpublicProfile('${name}')">${name}</a>`;
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
    loadMessages(myUsername, name);
    }
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
    if ((is_flag == true))
    {
        const message_text = `<a href="#onevsone" return false;">SENİ OYUNA DAVET EDİYORUM</a>`;
        const myUsername = sessionStorage.getItem('username');
        const messageData = {
            sender: myUsername,
            receiver_username: receiver_username,
            message: message_text,
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
}


////////////////////////////////////////////

// function toggleTable() {
//     var table = document.getElementById("history-div");
//     table.classList.toggle("hidden");
// }

// Fonksiyon ile veri alımı
// function fetchData(url) {
//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         return Promise.resolve([]); // Hata durumunda boş liste dön yani data listesi boş dönüyor
//       });
//   }
  
//   // Verileri tablo olarak gösteren fonksiyon
//   function displayData(data) {
//     const container = document.querySelector('#history-div');
//     if (data.length == 0) {
//         const message = document.createElement('h1');
//         message.textContent = 'No match history found!';
//         container.appendChild(message);
//         return;
//     }
    
//     const header = document.createElement('h1');
//     header.textContent = 'Match History Table';
//     container.appendChild(header);
//     const table = document.createElement('table');
//     table.innerHTML = `
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Age</th>
//         </tr>
//       </thead>
//       <tbody id="table-body">
//         <!-- Data will be displayed here -->
//       </tbody>
//     `;
//     container.appendChild(table);
  
//     const tableBody = document.querySelector('#table-body');
//     data.forEach(item => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.id}</td>
//         <td>${item.name}</td>
//         <td>${item.age}</td>
//       `;
//       tableBody.appendChild(row);
//     });
//   }

function rpublicProfile(username) {
    var data = {
        jsonsecuritykey: sessionStorage.getItem("securitykey"),
        getusername: username 
    }
    console.log(username);
    fetch(`http://localhost:8000/api/account/getuser/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        sessionStorage.setItem('rusername', data.username);
        sessionStorage.setItem('rname', data.name);
        sessionStorage.setItem('rsurname', data.surname);
        sessionStorage.setItem('remail', data.email);
        sessionStorage.setItem('rprofile_image', data.profile_image);
        var usernameTextElements = document.querySelectorAll('.username_text');
            usernameTextElements.forEach(function(element) {
                element.textContent = data.username;
            });
            updateProfileImageOnPage(data.profile_image);

        // Profil bilgilerini güncelle
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        document.getElementById('first-name').value = data.name;
        document.getElementById('last-name').value = data.surname;

        // Profil fotoğrafını güncelle
        const profilePhoto = document.getElementById('profile-photo');
        profilePhoto.src = data.profile_image;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Hata durumunda uygun bir mesaj gösterebilirsiniz
    });
    
    return `
    <div class="wrapper">
    <div class="form-wrapper">
            <h3>Profile</h3>
                <div class="field-wrapper profile-photo-wrapper">
                    <img src="${sessionStorage.getItem('rprofile_image')}" id="profile-photo" class="profile-photo" alt="Profile Photo">
                </div>

                <div class="field-wrapper">
                <!-- Username -->
                    <label for="username" data-translate="profileusername">Username:</label>
                    <input type="text" id="username" name="username" value="${sessionStorage.getItem('rusername')}" readonly>
                <!-- Email -->
                    <label for="email"  data-translate="profileemail">Email:</label>
                    <input type="email" id="email" name="email" value="${sessionStorage.getItem('remail')}" readonly>
                </div>

                <div class="field-wrapper">
                <!-- First Name -->
                    <label for="first-name" data-translate="profilefirstname">First Name:</label>
                    <input type="text" id="first-name" name="first-name" value="${sessionStorage.getItem('rname')}" readonly>
                <!-- Last Name -->
                    <label for="last-name" data-translate="profilelastname">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" value="${sessionStorage.getItem('rsurname')}" readonly>
                </div>
                    <div class="form-wrapper">
                    <!-- Match History Symbol -->
                        <img src="../img/symbols/matchHistory.png" id="match_history" alt="Match History" class="match_history" onclick="toggleTable()">
                        <div class="game-explanation">
                            <label for="match_history_label">Match History</label>
                        </div>
                    </div>
                <div class="history-div" id="history-div">
                    <!-- Tablo veya mesaj burada görüntülenecek -->
                </div>
    </div>
</div>

<style>
    .wrapper {
        margin-top: 37px;
        position: absolute;
        top: 50%; /* Adjusted from 100px to cut from the top */
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50vw; /* Adjusted width to half of the screen */
        background: #000;
        box-shadow: 0 0 50px greenyellow;
        border-radius: 20px;
        padding: 20px; /* Adjusted padding */
        overflow-y: auto; /* Added overflow-y to enable vertical scrolling */
        max-height: calc(100% - 100px); /* Adjusted maximum height to prevent excessive stretching */
        display: flex; /* Added flex display to align items */
    }

    .form-wrapper {
        width: 100%;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        box-sizing: border-box;
        display: flex; /* Added flex display to align items */
        flex-direction: column; /* Change flex-direction to column */
        justify-content: center; /* Center vertically */
        align-items: center; /* Center horizontally */
    }

    h3 {
        font-size: 30px;
        margin-bottom: 10px;
        color: #fff;
        text-align: center;
        z-index: 1;
    }

    .field-wrapper {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .field-wrapper label {
        margin-right: 20px;
        margin-left: 20px;
        width: 150px;
        display: inline-block;
        color: #fff;
    }

    .game-explanation label {
        align-items: center;
        color: #fff;
    }

    .field-wrapper input[type="text"],
    .field-wrapper input[type="email"],
    .field-wrapper input[type="number"] {
        flex: 1;
        padding: 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        background-color: #404040;
        color: #f0f0f0;
        cursor: not-allowed;
        pointer-events: none;
        text-shadow: 0 0 5px #ff668c;
    }

    .field-wrapper input:hover{
        box-shadow: 0 0 10px #cc3300
    }

    .profile-photo {
        width: 150px;
        height: 150px;
        border-radius: 50%; /* Make the border radius 50% to create a circle */
    }

    .profile-photo:hover {
        box-shadow: 0 0 10px #5ff0d0
    }

    .match_history {
        width: 125px;
        height: 125px;
        border-radius: 10%;
        margin-bottom: 10px;
    }

    .match_history:hover {
        box-shadow: 0 0 5px #FFFA67
    }
    
    .field-wrapper.profile-photo-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .game-status-bottom-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .symbol-wrapper {
        position: relative;
        width: 125px;
        height: 125px;
        border-radius: 50%; /* Make the border radius 50% to create a circle */
        margin-bottom: 10px;
    }

    .symbol-wrapper:hover {
        box-shadow: 0 0 10px purple
    }
    
    .symbol-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .number {
        position: absolute;
        bottom: 20px;
        right: 20px;
        transform: translate(50%, 50%);
        color: white;
        font-size: 48px;
        text-shadow: 0 0 5px purple, 0 0 10px purple, 0 0 15px purple, 0 0 20px purple, 0 0 25px purple, 0 0 30px purple, 0 0 35px purple;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .table th, .table td {
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
    }
    
    .table th {
        background-color: #f2f2f2;
    }
    
    /* Satır arka plan rengi değişimi */
    .table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    /* Resim stil */
    .match_history {
        cursor: pointer;
    }

    .history-div {
        margin-top:20px;
    }

    /* Histry div gizleme */
    .hidden {
        display: none;
    }

</style>
    `;
}