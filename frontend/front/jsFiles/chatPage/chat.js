function chatAdd() {
    // Sayfa içeriği tamamen yüklendiğinde çalışacak fonksiyon
    document.addEventListener('DOMContentLoaded', function() {
        // Kullanıcıları başlangıçta yükleyen fonksiyonu çağır
        initializeUsers();
    });

    // Kullanıcıları başlangıçta yükleyen fonksiyon
    function initializeUsers() {
        // Online ve offline kullanıcıları ayırmak için gerekli div'leri seç
        var onlineContainer = document.querySelector('.online-users');
        var offlineContainer = document.querySelector('.offline-users');

        // Dropdown elementlerini seç
        var dropdowns = document.querySelectorAll('.dropdown');

        // Dropdown menüsüne tıklandığında kullanıcıları ekle
        dropdowns.forEach(function(dropdown) {
            dropdown.addEventListener('click', function() {
                // Dropdown menüsünü genişlet
                this.nextElementSibling.classList.toggle('show');
            });
        });

        // Dropdown menüsünden dışarı tıklanınca menüyü kapat
        window.addEventListener('click', function(event) {
            dropdowns.forEach(function(dropdown) {
                if (!dropdown.contains(event.target)) {
                    dropdown.nextElementSibling.classList.remove('show');
                }
            });
        });

        // Dropdown seçeneklerine tıklanınca kullanıcıları ekle
        dropdowns.forEach(function(dropdown) {
            var options = dropdown.options;

            options.forEach(function(option) {
                option.addEventListener('click', function() {
                    var selectedUser = this.value;
                    var isUserOnline = isOnline(selectedUser);

                    if (isUserOnline) {
                        onlineContainer.appendChild(createUserElement(selectedUser));
                    } else {
                        offlineContainer.appendChild(createUserElement(selectedUser));
                    }
                });
            });
        });
    }

    // Kullanıcıların listelendiği div elementi oluşturan yardımcı fonksiyon
    function createUserElement(username) {
        var div = document.createElement('div');
        div.textContent = username;
        return div;
    }

    // Kullanıcının çevrimiçi olup olmadığını kontrol eden bir işlev
    function isOnline(username) {
        // Burada kullanıcının çevrimiçi olup olmadığını kontrol etmek için uygun bir mekanizma kullanabilirsiniz
        // Örneğin, bir kullanıcı listesi veya çevrimiçi durumu takip eden bir veritabanı
        // Bu örnekte, herkesin çevrimiçi olduğunu varsayıyoruz
        return true;
    }

// Blurlama için kodlar eğer arkadaş ekle butonuna basılırsa 2 saniye blur eklendi.
document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.classList.contains('invite-button')) {
        addBlurEffect();
    }
});

function addBlurEffect() {
    document.body.style.filter = "blur(5px)";

    setTimeout(function() {
        removeBlurEffect();
    }, 2000);
}

function removeBlurEffect() {
    document.body.style.filter = "none";
}

return `
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

<style>

body {
    background-image: linear-gradient(
      23deg,
      hsl(49deg 100% 69%) 0%,
      hsl(16deg 80% 61%) 2%,
      hsl(330deg 81% 34%) 12%,
      hsl(259deg 100% 15%) 50%,
      hsl(212deg 100% 25%) 88%,
      hsl(197deg 100% 30%) 98%,
      hsl(183deg 79% 36%) 100%
    );
    height: 100vh;
  }

.button {
    border: none;
    padding: 0.625em;
    border-radius: 0.5em;
    cursor: pointer;
}

.button:hover {
    filter: brightness(0.9);
    transform: scale(1.2);
}

.button:active{
    transform: translateY(2px);
}

.container {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: flex-start;
    font-family: 'Roboto', sans-serif;
    border-radius: 0.5em;
    margin: auto 0;
    left: 10px;
    //box-shadow: 0 0 1.25em 0.5em white;
}

.person-selector-container {
    margin-top: 30px;
    padding: 0.5em;
    border-radius: 1.5em;
    box-shadow: 0 0 1.25em 0.5em greenyellow;
}

.person-selector-container h3 {
    margin-bottom: 0.5em;
    color: #fff;
}

.person-selector {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1em;
    max-width: 15em;
}

.person-selector-button {
    width: 70%;
    color: #fff;
    font-size: 1em;
}

.person-selector-button.offline{
    color: red;
}

.person-selector-button.online{
    color: #5cb85c;
}

.active-person {
    box-shadow: 0 0 0.5em 0.1em #c3c3c333;
}

.person-selector-container .dropdown {
    width: 80%;
    color: #fff;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 0.3em;
    background-color: #15202b;
    border: none;
    cursor: pointer;
}

.person-selector-container .dropdown:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
}

.person-selector-container .dropdown:active {
    transform: translateY(1px);
}

.chat-container {
    margin-top: 30px;
    font-family: 'Roboto', sans-serif;
    border-radius: 0.5em;
    padding: 0.5em 1.25em;
    max-width: 37.5em;
    height: 37.5em;
    box-shadow: 0 0 1.25em 0.5em greenyellow;
    display: inline-block; /* Yan yana hizalamak için */
    vertical-align: top; /* Üst kenardan hizalamak için */
}

.chat-profile-picture {
    width: 40px;
    height: 40px;
    background-image: url("${sessionStorage.getItem('profile_image')}");
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid greenyellow;
    z-index: 2;
}

.chat-header, .person-selector-header {
    margin: auto 0;
    color: #fff;
}

.chat-header h3 {
    font-size: 1.25em;
    font-weight: bold;
}

.chat-messages {
    height: 23em;
    overflow-y: scroll;
}

.chat-messages::-webkit-scrollbar {
    display: none;
}

.message {
    padding: 0.625em;
    border-radius: 1em;
    margin-bottom: 0.625em;
    display: flex;
    flex-direction: column;
    color: #fff;
}

.message-sender {
    font-weight: bold;
    margin-bottom: 0.32em;
}

.message-text {
    font-size:  1em;
    margin-bottom: 0.32em;
    word-wrap: break-word;
}

.message-timestamp {
    font-size: 0.75em;
    text-align: right;
}

.blue-bg {
    background-color: #1c9bef;
}

.gray-bg {
    background-color: #3d5365;
}

.chat-input-form {
    display: flex;
    align-items: center;
    margin-top: 2em;
    gap: 0.625em;
}

.chat-input {
    padding: 0.625em;
    border: none;
    border-radius: 0.5em;
    color: #333;
    font-size: 1em;
    flex-grow: 1;
}

.send-button {
    background-color: #1c9bef;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.send-button:hover {
    background-color: #0f5b78;
    transform: scale(1.2);
}

.clear-message-button {
    background-color: red;
    color: #fff;
    border: none;
    border-radius: 0.5em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.625em;
    transition: transform 0.3s ease;
}

.clear-message-button:hover {
    background-color: #c0392b; /* Kırmızının koyu tonu */
    transform: scale(1.2);
}

.additional-buttons{
    padding: 1.5em;
    border-radius: 1.5em;
    left : 10px;
    bottom: 20px;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 0 1.25em 0.5em greenyellow;
    position: fixed;
    display: flex;
    font-family: 'Roboto', sans-serif;
}

.additional-buttons .button {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #15202b; /* Buton rengi */
    color: #fff; /* Buton yazı rengi */
    padding: 0.625em;
    border-radius: 0.5em;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.additional-buttons .button:hover {
    filter: brightness(0.9);
    transform: scale(1.2);
}

.additional-buttons .button i {
    margin-right: 10px;
}

.additional-buttons-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #fff;
}

.additional-buttons-header i {
    margin-right: 10px;
}

.friend-selector-container {
    margin-top: 30px;
    padding: 0.5em;
    border-radius: 1.5em;
    box-shadow: 0 0 1.25em 0.5em greenyellow;
}

.friend-selector-container h3 {
    margin-bottom: 0.5em;
    color: #fff;
}

.friend-selector {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1em;
    max-width: 15em;
}

.friend-selector-button {
    width: 70%;
    color: #fff;
    font-size: 1em;
}

.friend-selector-button.offline{
    color: red;
}

.friend-selector-button.online{
    color: #5cb85c;
}

.active-person {
    box-shadow: 0 0 0.5em 0.1em #c3c3c333;
}

.friend-selector-container .dropdown {
    width: 80%;
    color: #fff;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 0.3em;
    background-color: #15202b;
    border: none;
    cursor: pointer;
}

.friend-selector-container .dropdown:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
}

.friend-selector-container .dropdown:active {
    transform: translateY(1px);
}

.chat-container {
    max-width: 90%; /* Ekran genişliğinin yüzde 90'u */
}

.block-button {
    background-color: #e74c3c;
    transition: transform 0.3s ease;
}

.block-button:hover {
    background-color: #c0392b;
    transform: scale(1.2);
}

.message-button, .invite-button, .add-friend-button {
    background-color: greenyellow;
    transition: transform 0.3s ease;
}

.message-button:hover, .invite-button:hover, .add-friend-button:hover {
    background-color: limegreen;
    transform: scale(1.2);
}

@media screen and (max-width: 700px) {
    flex-direction: column; /* Dikey düzen
    align-items: center; /* Ortalama hizalama */
    .container {
        width: 700px;
        margin: auto;
    }
}

.chat-header-horizontal-container {
    display: flex; /* Yatay sıralamayı sağlar */
    margin-top: 10px;
    align-items: center;
}

.offline-users{
    box-shadow: 0 0 10px red
}

.blur{
    filter: blur(5px);
    pointer-events: none;
}

.online {
    color: green;
}

.offline {
    color: red;
}

.myfriends {
    color: orange;
}

</style>

</head>
<div class="container">

    <div class="person-selector-container">
        <h3 class="online-users"> Online Users <i class="fa-solid fa-user-group online"></i>
        <select class="dropdown" onchange="userchanges(this.value)">
            <option value="John">John</option>
            <option value="Jane">Jane</option>
            <option value="User1">User1</option>
            <option value="User2">User2</option>
            <option value="User3">User3</option>
        </select>
        </h3>
        <h3 class="offline-users"> Offline Users <i class="fa-solid fa-user-group offline"></i>
        <select class="dropdown" onchange="userchanges(this.value)">
            <option value="John">John</option>
            <option value="Jane">Jane</option>
            <option value="User1">User1</option>
            <option value="User2">User2</option>
            <option value="User3">User3</option>
        </select>
        </h3>
    </div>

    <div class="friend-selector-container">
        <h3 class="friend-selector-header"> Friends <i class="fa-solid fa-user-group myfriends"></i>
            <select class="dropdown" onchange="userchanges(this.value)">
                <option value="Yasin">Yasin</option>
                <option value="Erdem">Erdem</option>
                <option value="Onur">Onur</option>
                <option value="Musa">Musa</option>
                <option value="Burak">Burak</option>
            </select>
        </h3>
    </div>

    <div class="chat-container">
        <div class="chat-header-horizontal-container">
            <div class="chat-profile-picture" id="chachat-textt-profile-picture"></div>
            <h3 id="chat-header" class="chat-header" ><i class="fa-brands fa-rocketchat"></i></h3>
        </div>
        <div id="chat" class="chat-messages"></div>
        <form class="chat-input-form">
            <input id="chat-text" type="text" class="chat-input" required placeholder="Type here..." />
            <button type="submit" class="button send-button" onclick="sendMessage()">Send</button>
            <button type="button" class="clear-message-button" onclick="clearmessage()">Clear Chat <i class="fa-solid fa-comment-slash"></i></button>
        </form>

        <!-- Settings Kısmı -->
        <div class="additional-buttons">
            <h3 class="additional-buttons-header"> Settings <i class="fa-solid fa-gear"></i></h3>
            <button class="button invite-button"><i class="fas fa-gamepad"></i> Oyuna Davet Et</button>
            <button class="button block-button"><i class="fas fa-times"></i> Engelle</button>
            <button class="button add-friend-button"><i class="fas fa-user-plus"></i> Arkadaş Ekle</button>
        </div>
    </div>
</div>
</head>

`;
}
