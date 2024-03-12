function chatAdd() {
    return `
    <head>

    <script>
    window.onload = () => {
        alert("asd")
    }
    </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
    
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


        .chat-button {
            border: none;
            background: white;
            padding: 0.625em;
            border-radius: 0.5em;
            cursor: pointer;
        }

        .button:hover {
            filter: brightness(0.9);
        }

        .button:active {
            transform: translateY(2px);
        }

        .person-selector {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            padding-right: 15px;
            padding-left: 15px;
            gap: 1em;
            margin-top: 37px;
            max-width: 40em;
        }

        .person-selector-button {
            width: 100%;
            
            background-color: #15202b;
            color: #fff;
            font-size: 1.1em;
        }

        .active-person {
            background-color: #08529d;
            box-shadow: 0 0 0.5em 0.1em #c3c3c333;
        }

        .chat-container {
            background: #15202b;
            font-family: 'Poppins', sans-serif;
            border-radius: 1em;
            padding: 0.5em 1.25em;
            box-shadow: 0 0 0.5em 0.1em #c3c3c333;
            margin-right: 15px;
            flex: 3;
            justify-content: center;
            align-items: center;
            margin-top: 37px;
        }

        .chat-header {
            margin-bottom: 1em;
            color: #fff;
        }

        .chat-header h2 {
            font-size: 1.25em;
            font-weight: bold;
        }

        .chat-messages {
            height: 35em;
            overflow-y: scroll;
            display: flex;
    
            
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
            font-size: 1em;
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
    </style>

</head>

    <body>
    <div  style="display:flex; flex-direction: row; align-items: start;">
    <div class="person-selector">
    
    <div style="display:flex; flex-direction: row; align-items: center; justify-content: space-between;">
    <i class="fas fa-plus" title="Oyuna davet et" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
    
        <span style="font-size: 12px; padding-left: 5px">
        Davet Et
        </span>
    </i>
    <i class="fas fa-comment-alt" title="Özel Mesaj Gönder" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
    
    <span style="font-size: 12px; padding-left: 5px">
    Message
    </span>
    </i>

    <i class="fas fa-ban" title="Kullanıcı Banla" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
    
        <span style="font-size: 12px; padding-left: 5px">
        Engelle
        </span>
    </i>

    <i class="fas fa-comments" title="Kanala Mesaj Gonder" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
    
        <span style="font-size: 12px; padding-left: 5px">
           Channel
        </span>
    </i>
    </div>

    <ul style="list-style-type: none; padding: 0;">
    <li style="margin-bottom: 10px;">
        <button class="chat-button person-selector-button active-person" id="john-selector">john</button>
    </li>
    <li style="margin-bottom: 10px;">
        <button class="chat-button person-selector-button" id="jane-selector">Jane</button>
    </li>
</ul>

    </div>
    <div class="chat-container">
        <h2 class="chat-header"></h2>
        
        <div class="chat-messages" style="width: 100%">
    <div style="width: 100%; display: flex; flex-direction: column;">
        <div class="message blue-bg" style="width: 50%; display: flex">
            <div class="message-sender">John</div>
            <div class="message-text">Hey Jane, what's up?</div>
            <div class="message-timestamp">10:30 AM</div>
        </div>
        <div class="message gray-bg" style="width: 50%; display: flex; align-self: flex-end">
            <div class="message-sender">Jane</div>
            <div class="message-text">selam living the dream. How about you?</div>
            <div class="message-timestamp">10:35 AM</div>
        </div>
        
    </div>
</div>

        <form class="chat-input-form">
            <input type="text" class="chat-input" required placeholder="Type here, John..."/>
            <button type="submit" class="chat-button send-button">Send</button>
        </form>
        <button class="chat-button clear-chat-button">Clear Chat</button>
    </div>

    <script src="jsFiles/chatPage/chatApp.js"></script>
    </div>
</body>

    `;
}
