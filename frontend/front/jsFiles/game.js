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
