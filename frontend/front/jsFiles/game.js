function chooseGame() {
    return `
    <div id="game-container">
        <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3>Pong Game</h3>
                <button class="choose-game-button" id="quickMatchButton">Quick Match</button>
                <a href="#specialMatch" class="choose-game-button">Special Match</a>
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
    <canvas id="canvas"></canvas>
    <h1 id="player1Score">0</h1>
    <h1 id="player2Score">0</h1>
    <h2 id="WelcomeText">Welcome to the Pong Game</h2>
    `;
}
