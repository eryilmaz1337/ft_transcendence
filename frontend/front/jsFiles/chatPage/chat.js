function chatAdd() {
    return `
    <head>
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
            justify-content: center;
            gap: 1em;
            margin: 3em auto 1em;
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
            border-radius: 0.5em;
            padding: 0.5em 1.25em;
            margin: auto;
            max-width: 37.5em;
            height: 37.5em;
            box-shadow: 0 0 0.5em 0.1em #c3c3c333;
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
    <div class="person-selector">
        <button class="chat-button person-selector-button active-person" id="john-selector">John</button>
        <button class="chat-button person-selector-button" id="jane-selector">Jane</button>
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
            <input type="text" class="chat-input" required placeholder="Type here, John..."/>
            <button type="submit" class="chat-button send-button">Send</button>
        </form>
        <button class="chat-button clear-chat-button">Clear Chat</button>
    </div>

    <script src="chatApp.js"></script>
</body>

    `;
}
