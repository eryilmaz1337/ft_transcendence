function chooseCustomGame() {
    return `
    <div id="game-container">
        <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3 data-translate="ponggame">👾 Choose Custom Game 👾</h3>
                <a href ="#quickMatch" class="choose-game-button" id="quickMatchButton" data-translate="quickmatch">Mod1</a>
                <a href ="#specialMatch" class="choose-game-button" id="specialMatchButton" onclick="specialMatchClicked()" data-translate="specialmatch">Mod2</a>
            </form>
        </div>
    </div>

        <style>
            #game-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                font-family: 'Poppins', sans-serif;
                box-sizing: border-box;
            }

            .choose-game-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-top: 20px;
            }

            .choose-game-button {
                text-decoration: none;
                padding: 10px 20px;
                font-size: 18px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                background-color: greenyellow;
                color: #000;
                margin: 10px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }

            .choose-game-button:hover {
                background-color: #0cf;
            }

            .wrapper {
                position: relative;
                width: 490px;
                height: 300px;
                background: #000;
                box-shadow: 0 0 50px greenyellow;
                border-radius: 20px;
                padding: 40px;
                overflow: hidden;
            }

            .form-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }

            h3 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #fff;
                text-align: center;
            }

        </style>
    `;
}

function chooseGame() {
    return `
    <div id="game-container">
        <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3 data-translate="ponggame">🏓 Pong Game 🏓</h3>
                <a href ="#quickMatch" class="choose-game-button" id="quickMatchButton" data-translate="quickmatch">Quick Match</a>
                <a href ="#specialMatch" class="choose-game-button" id="specialMatchButton" onclick="specialMatchClicked()" data-translate="specialmatch">Special Match</a>
            </form>
        </div>
    </div>

        <style>
            #game-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                font-family: 'Poppins', sans-serif;
                box-sizing: border-box;
            }

            .choose-game-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-top: 20px;
            }

            .choose-game-button {
                text-decoration: none;
                padding: 10px 20px;
                font-size: 18px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                background-color: greenyellow;
                color: #000;
                margin: 10px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }

            .choose-game-button:hover {
                background-color: #0cf;
            }

            .wrapper {
                position: relative;
                width: 490px;
                height: 300px;
                background: #000;
                box-shadow: 0 0 50px greenyellow;
                border-radius: 20px;
                padding: 40px;
                overflow: hidden;
            }

            .form-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }

            h3 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #fff;
                text-align: center;
            }

        </style>
    `;
}

// Oyun Fonksiyonu
function gameAdd() {
    return `
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #canvas-container {
        position: relative;
        width: 90vw;
        height: 80vh;
        max-width: 900px;
        max-height: 600px;
        margin: 30px auto;
        /* box-shadow: 0 0 1.25em 0.5em greenyellow; */
    }

    canvas {
        display: block;
        background-image: url('../img/game_background/a1.jpeg');
        background-size: cover;
        background-color: #000;
        border: 2px solid greenyellow;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
    }

    #scoreboard {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        width: 80%;
        z-index: 1;
    }

    #player1Score, #player2Score {
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 44px;
    }

    #WelcomeText {
        position: absolute;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        font-weight: bold;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: fadeIn 1s ease forwards;
        z-index: 1;
        text-align: center;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @media screen and (max-width: 768px) {
        #scoreboard {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 480px) {
        #scoreboard {
            font-size: 16px;
        }
    }

</style>

<div id="canvas-container">
    <canvas id="canvas"></canvas>
    <div id="scoreboard">
        <h1 id="player1Score">0</h1>
        <h1 id="player2Score">0</h1>
    </div>
    <h2 id ="WelcomeText" data-translate="welcomepong">Welcome to the Pong Game</h2>
</div>

    `;
}
