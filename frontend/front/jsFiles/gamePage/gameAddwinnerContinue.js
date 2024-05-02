function redirectToTournament()
{
	window.location.hash = "tournament2";
	starttournament();
}

function gameAddwinnerContinue()
{
    const winnerColor = 'greenyellow';
    return `
    <body>
        <div id="winner-page">
            <h1>Congratulations!</h1>
            <h2>Winner is: <span style="color: ${winnerColor};">${winnerUser}</span></h2>
            <div id="confetti"></div>
			<button class="btn-winner" onclick="redirectToTournament()">Next Match</button>
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
            background-image: url('../img/confeti.gif');
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

		.btn-winner {
            margin-top: 20px;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 17px;
            border: none;
            border-radius: 20px;
            font-family: 'Arial', sans-serif;
            background-color: greenyellow;
            color: #000;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-winner:hover {
            background-color: #0cf;
        }

        </style>
    </head>


    `;
}
