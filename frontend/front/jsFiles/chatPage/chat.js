function chatAdd() {
    return `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <style>
    body {
        background-color: #15202b;
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
        margin: auto;
    }

    .person-selector-container {
        background-color: #15202b;
        padding: 1.5em;
        border-radius: 0.5em;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
    }

    .person-selector-container h2 {
        margin-bottom: 0.5em;
        color: #fff;
    }

    .person-selector {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1em;
        max-width: 40em;
    }

    .person-selector-button {
        width: 90%;
        background-color: #15202b;
        color: #fff;
        font-size: 1.1em;
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

    .chat-container {
        background: #15202b;
        font-family: 'Roboto', sans-serif;
        border-radius: 0.5em;
        padding: 0.5em 1.25em;
        margin: auto;
        max-width: 37.5em;
        height: 37.5em;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
        display: inline-block; /* Yan yana hizalamak için */
        vertical-align: top; /* Üst kenardan hizalamak için */
    }

    .chat-header, .person-selector-header {
        margin-bottom: 1em;
        color: #fff;
    }

    .chat-header h2 {
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
        background-color: #f5f5f5;
        color: #333;
        font-size: 1em;
        flex-grow: 1;
    }

    .send-button {
        background-color: #1c9bef;
        color: #fff;
        font-size: 1em;
        font-weight: bold;
    }

    .clear-chat-button {
        display: block;
        margin: 2.5em auto;
    }

    .additional-buttons{
        background-color: #15202b;
        padding: 1.5em;
        border-radius: 0.5em;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
        position: fixed;
        display: flex;
        left: 10px;
        bottom: 20px;
        flex-direction: column;
        gap: 10px;
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
    }

    .additional-buttons .button:hover {
        filter: brightness(0.9);
    }

    .additional-buttons .button i {
        margin-right: 10px;
    }

    .additional-buttons-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        font-family: 'Roboto', sans-serif; /* Yeni font belirleme */
        color: #fff;
    }

    .additional-buttons-header i {
        margin-right: 10px;
    }

    .chat-container {
        max-width: 90%; /* Ekran genişliğinin yüzde 90'u */
    }

    .person-selector-container {
        background-color: #15202b;
        padding: 2em;
        border-radius: 0.5em;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
    }

    .block-button {
        background-color: #e74c3c;
        transition: background-color 0.3s ease; /* Geçiş efekti */
    }

    .block-button:hover {
        background-color: #c0392b;
    }

    .message-button, .invite-button, .add-friend-button {
        background-color: greenyellow;
        transition: background-color 0.3s ease; /* Geçiş efekti */
    }

    .message-button:hover, .invite-button:hover, .add-friend-button:hover {
        background-color: limegreen;
    }


    @media screen and (max-width: 700px) {
        /* Sabit kalmamasını istiyorsan
            flex-direction: column; /* Dikey düzen
            align-items: center; /* Ortalama hizalama */
        .container {
            width: 700px;
            margin: auto;
        }
    }

    </style>

<body>

<div class="container">

    <div class="person-selector-container">
        <h2 class="person-selector-header"> Kullanıcılar </h2>
        <div class="person-selector">
            <button class="button person-selector person-selector-button active-person online" id="john-selector">
            <i class="fa-solid fa-user-group"></i> John <i class="fas fa-circle"></i> <!-- Online icon -->
            </button>
            <button class="button person-selector person-selector-button offline" id="jane-selector">
            <i class="fa-solid fa-user-group"></i> Jane <i class="fas fa-circle"></i> <!-- Offline icon -->
            </button>
        </div>
    </div>

    <div class="chat-container">
        <h2 class="chat-header">John chatting...</h2>

        <div class="chat-messages">
            <div class="message blue-bg">
                <div class="message-sender">John</div>
                <div class="message-text">Hey Jane, what's up?</div>
                <div class="message-timestamp">10:30 AM</div>
            </div>
            <div class="message gray-bg">
                <div class="message-sender">Jane</div>
                <div class="message-text">Not much, just living the dream. How about you?</div>
                <div class="message-timestamp">10:35 AM</div>
            </div>
        </div>

        <form class="chat-input-form">
            <input type="text" class="chat-input" required placeholder="Type here, John..." />
            <button type="submit" class="button send-button">Send</button>
        </form>
        <button class="button clear-chat-button">Clear Chat</button>
        <!-- Ayarlamalar Kısmı -->
        <div class="additional-buttons">
            <h2 class="additional-buttons-header"> Ayarlar <i class="fa-solid fa-gear"></i></h2>
            <button class="button invite-button"><i class="fas fa-gamepad"></i> Oyuna Davet Et</button>
            <button class="button message-button"><i class="fas fa-envelope"></i> Mesaj</button>
            <button class="button block-button"><i class="fas fa-times"></i> Engelle</button>
            <button class="button add-friend-button"><i class="fas fa-user-plus"></i> Arkadaş Ekle</button>
        </div>
    </div>
</div>

<script src="app.js"></script>
</body>
`;
}
