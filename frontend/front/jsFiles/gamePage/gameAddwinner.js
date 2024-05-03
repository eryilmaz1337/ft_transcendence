function gameAddwinner()
{
    const winnerColor = 'greenyellow';
    return `
    <body>
        <div id="winner-page">
            <h1 data-translate="congrats">Congratulations!</h1>
            <h2>Winner is: <span style="color: ${winnerColor};">${winnerUser}</span></h2>
            <div id="confetti"></div>
        </div>
    </body>

    <head>
        <style>

        #winner-page {
            position: relative;
            text-align: center;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url('../img/other_backgrounds/confeti.gif');
            background-size: cover;
        }

        h1 {
            font-family: 'Arial', sans-serif;
            color: white;
            font-size: 36px;
            margin-bottom: 20px;
        }

        h2 {
            font-family: 'Arial', sans-serif;
            color: white;
            font-size: 24px;
            margin-bottom: 20px;
        }

        #confetti {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }

        </style>
    </head>


    `;
}
