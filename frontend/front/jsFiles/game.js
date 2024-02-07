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
    }

    #WelcomeText {
        color: white;
        font-family: sans-serif;
        font-size: 2rem;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
    }

    #player1Score {
        left: 35%;
    }

    #player2Score {
        right: 35%;
    }
    </style>
    <canvas id="canvas"></canvas>
    <h1 id="player1Score">0</h1>
    <h1 id="player2Score">0</h1>
    <h2 id="WelcomeText">Welcome to the Pong Game</h2>
    `;
}