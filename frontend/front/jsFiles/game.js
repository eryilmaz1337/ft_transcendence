function chooseGame() {
    return `
    <style>
        .choose-game-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .choose-game-button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #28a745;
            color: white;
            margin: 10px;
            font-weight: bold;
            transition: transform 0.2s ease-in-out;
        }

        .choose-game-button:hover {
            transform: scale(1.1);
        }
    </style>

    <div class="choose-game-container">
        <button class="choose-game-button" id="quickMatchButton">Hızlı Maç Ara</button>
        <button class="choose-game-button" id="specialMatchButton">Özel Maç</button>
    </div>
    `;
}


function gameAdd() {
    return `
    <style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        background-size: cover;
        background-repeat: no-repeat;
        overflow: hidden;
    }

    h1 {
        color: white;
        font-family: sans-serif;
        font-size: 4rem;
        position: absolute;
        top: 100px;
        transform: translateY(-50%);
    }

    #WelcomeText {
        color: greenyellow;
        font-family: "Arial Black", Gadget, sans-serif;
        font-size: 2.5rem;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: fadeIn 1s ease forwards;
    }

    #player1Score {
        left: 35%;
    }

    #player2Score {
        right: 35%;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
    }
    </style>

    <button id="quickMatchButton" onclick="startQuickMatch()">Hızlı Maç Ara</button>
    <button id="specialMatchButton" onclick="startSpecialMatch()">Özel Maç</button>
    <canvas id="canvas"></canvas>
    <h1 id="player1Score">0</h1>
    <h1 id="player2Score">0</h1>
    <h2 id="WelcomeText">Welcome to the Pong Game</h2>
    <script>
        function startQuickMatch() {
            if (!${gameStarted}) {
                ${gameStarted} = true;
                setTimeout(function() {
                    // Hızlı maç için gerekli işlemler
                    // Oyunu başlat
                    startgame();
                }, 2000); // 2 saniye bekle
            }
        }

        function startSpecialMatch() {
            if (!${gameStarted}) {
                ${gameStarted} = true;
                var opponentName = prompt("Arkadaşının ismini girin:");
                if (opponentName !== null && opponentName !== '') {
                    // Özel maç için gerekli işlemler
                    // Arkadaşın ismini gönder
                    // Bekleme ekranını göster
                }
            }
        }
    </script>
    `;
}
