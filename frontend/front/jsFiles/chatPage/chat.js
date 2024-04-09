function chatAdd() {
    return `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body {
            background-color: #15202b;
        }

        .button-style {
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
            color: white;
            font-size: 20px;
            align-items: center;
            border: 1px solid gray;
            padding: 10px;
            border-radius: 15px;
        }

        .chat-button {
            border: none;
            background: white;
            padding: 0.625em;
            border-radius: 0.5em;
            cursor: pointer;
        }

        .person-selector {
            display: flex;
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
            background-color: black;
            color: #fff;
            font-size: 1.1em;
        }

        .active-person {
            background-color: #15202b;
            box-shadow: 0 0 0.5em 0.1em #c3c3c333;
        }

        .chat-container {
            background: #00162c;
            font-family: 'Poppins', sans-serif;
            border-radius: 1em;
            padding: 0.5em 1.25em;
            box-shadow: 0 0 0.5em 0.1em #c3c3c333;
            margin-right: 15px;
            flex: 3;
            justify-content: center;
            align-items: center;
            margin-top: 37px;
            max-height: 80vh;
            overflow-y: auto;
            height: auto; /* Yüksekliği otomatik ayarla */
        }

        .chat-container::-webkit-scrollbar {
            display: none; /* Chrome ve Safari için */
        }

        .message {
            flex-grow: 1;
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
            background-color: #15202b;
        }

        .gray-bg {
            background-color: #000000;
        }

        .chat-input-form {
            position: sticky;
            bottom: 0;
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
            background-color: #adff2f;
            color: black;
            font-size: 1em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div style="display:flex; flex-direction: row; align-items: start;">
        <div class="person-selector">
            <div style="display:flex; flex-direction: row; align-items: center; justify-content: space-between;">
            <i class="fas fa-plus" title="Oyuna davet et" data-translate="invite" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
                    <span style="font-size: 12px; padding-left: 5px">Davet Et</span>
            </i>
            <i class="fas fa-comment-alt" title="Özel Mesaj Gönder" data-translate="message" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
                <span style="font-size: 12px; padding-left: 5px">Message</span>
            </i>
            <i class="fas fa-ban" title="Kullanıcı Banla" data-translate="block" style="cursor: pointer;  color: white; font-size: 20px; align-items: center; border: 1px solid gray; padding: 10px; border-radius: 15px" >
                <span style="font-size: 12px; padding-left: 5px">Engelle</span>
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
                <div id="chat" style="width: 100%; display: flex; flex-direction: column;">
                <!-- chat message -->
                </div>
                <div class="chat-input-form">
                    <input id=chat-text type="text" class="chat-input" required placeholder="Type here, John..."/>
                    <button type="submit" data-translate="send" class="chat-button send-button" onclick="sendMessage()">Send</button>
                </div>
        </div>
    </div>
`;
}
