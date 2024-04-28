function chooseGame() {
    return `
    <div id="game-container">
        <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3 data-translate="ponggame">🏓 Pong Game 🏓</h3>
                <a href ="#aimode" class="choose-game-button" data-translate="aimode">ai</a>
                <a href ="#tournament" class="choose-game-button" data-translate="tournamentt" >tournament</a>
                <a href ="#onevsone" class="choose-game-button">özel oyun</a>
            </form>
        </div>
    </div>

        <style>
            #game-container {
                background-image: url('../img/retro-arcade.jpeg');
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
                font-size: 17px;
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

function checkGameTheme() {
    if(window.location.hash == "#aimode" || window.location.hash == "#onevsone" )
    {if(gameTheme === 0) {
       window.setTimeout(checkGameTheme, 1000); /* this checks the flag every 1000 milliseconds*/
    } 
    else {
        console.log("gameTheme= "+gameTheme);
        if(window.location.hash == "#aimode")
            startgame();
        else
            startgameone();
    }}
    return;
}

function setGameTheme(value){
    var audio = document.getElementById("clMusic");
    console.log("setGameTheme value is: "+value);

    switch (value) {
        case 1:
            gameBGImagePath="../img/game_background/b1.jpg";
            gameBGColor='#ffffff';
            audio.pause();
            gameTheme=1;
            break;
        case 2:
            imagePaths = [
                "../img/game_background/elon-musk.jpeg",
                "../img/game_background/elon-musk.jpeg",
                "../img/game_background/elon-musk.jpeg",
                "../img/game_background/elon-musk.jpeg"
            ];
            randomIndex = Math.floor(Math.random() * imagePaths.length);
            gameBGImagePath = imagePaths[randomIndex];
            gameBGColor='#ffc001';
            audio.pause();
            gameTheme=2;
            break;
        case 3:
            gameBGImagePath="../img/game_background/c1.jpg";
            gameBGColor='#6594C0';
            audio.play();
            gameTheme=3;
            break;
        case 4:
            imagePaths = [
                "../img/game_background/f1.jpeg",
                "../img/game_background/f2.jpeg",
                "../img/game_background/f3.jpeg",
                "../img/game_background/f4.jpeg"
            ];
            randomIndex = Math.floor(Math.random() * imagePaths.length);
            gameBGImagePath = imagePaths[randomIndex];
            gameBGColor='#7cbd8f';
            audio.pause();
            gameTheme=4;
            break;
        case 5:
            imagePaths = [
                "../img/game_background/m1.jpeg",
                "../img/game_background/m2.jpeg",
                "../img/game_background/m3.jpeg",
                "../img/game_background/m4.jpeg"
            ];
            randomIndex = Math.floor(Math.random() * imagePaths.length);
            gameBGImagePath = imagePaths[randomIndex];
            gameBGColor='#b8b7c5';
            audio.pause();
            gameTheme=5;
        default:
            break;
    }
    console.log("setGameTheme image path: "+gameBGImagePath);
    console.log("setGameTheme bg color: "+gameBGColor);
}

// Oyun Fonksiyonu
function gameAdd() {
    checkGameTheme();
    return `
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap">
    <style>

    body {
        background-color: #15202b;
        height: 100vh;
        margin: 0;
        overflow-x: hidden;
    }

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
        /* display: grid; */
        background-color: #000;
        /* border: 2px solid greenyellow; */
        border-radius: 10px;
        width: 100%;
        height: 100%;
        /* box-shadow: 0 0 1.25em 0.5em greenyellow; */
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
        /* font-family: 'Poppins', sans-serif; */
        /* font-family: 'Courier New', Courier, monospace; */
        font-family: 'Press Start 2P', cursive;
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

    #ChooseTheme {
        position: absolute;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        font-weight: bold;
        top: 40%;
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

    .btn-group{
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
    }

</style>
</head>
<audio id="clMusic" src="../sounds/UEFA Champions League Anthem (Full Version).m4a"></audio>
<div id="canvas-container">
    <canvas id="canvas"></canvas>
    <div class="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
        <button type="button" class="btn btn-outline-light" onclick="setGameTheme(1)">Classic Pong</button>
        <button type="button" class="btn btn-outline-warning" onclick="setGameTheme(2)">Doge Coin</button>
        <button type="button" class="btn btn-outline-info" onclick="setGameTheme(3)">Champions League</button>
        <button type="button" class="btn btn-outline-success" onclick="setGameTheme(4)">Fangorn Forest</button>
        <button type="button" class="btn btn-outline-secondary" onclick="setGameTheme(5)">Milky Way</button>
    </div>
    <div id="scoreboard">
        <h1 id="player1Score">0</h1>
        <h1 id="player2Score">0</h1>
    </div>
    <h2 id ="WelcomeText" data-translate="welcomepong">Welcome to the Pong Game</h2>
    <h2 id ="ChooseTheme" data-translate="choosetheme">Choose a theme below!</h2>
</div>

    `;
}
