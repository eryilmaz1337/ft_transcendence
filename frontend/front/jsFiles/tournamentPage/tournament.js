function addplayer()
{
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const player3 = document.getElementById("player3");
    const player4 = document.getElementById("player4");
    const text = document.getElementById("addtext").value;
    
    if(!text)
        return;

    if(player1.textContent === 'Player 1')
    {
        player1.textContent = text;
        document.getElementById("addtext").value = ''; 
    }
    else if(player2.textContent == "Player 2")
    {
        player2.textContent = text;
        document.getElementById("addtext").value = '';
    }
    else if(player3.textContent == "Player 3")
    {
        player3.textContent = text;
        document.getElementById("addtext").value = '';
    }
    else if(player4.textContent == "Player 4")
    {
        player4.textContent = text;
        document.getElementById("addtext").value = ''; 
    }
    else
    {
        alert("Tüm Slotlar Dolu");
        document.getElementById("addtext").value = '';
    }
    
}

function starttournament() {
    const player1 = document.getElementById("player1").textContent;
    const player2 = document.getElementById("player2").textContent;
    const player3 = document.getElementById('player3').textContent;
    const player4 = document.getElementById('player4').textContent;

    if (player1 === 'Player 1' || player2 === 'Player 2') {
        alert('You need at least 2 players to start the tournament.');
        return;
    }

    // Optionally, store the player names in session or local storage to use on the game page
    sessionStorage.setItem("player1", player1);
    sessionStorage.setItem("player2", player2);
    sessionStorage.setItem("player3", player3);
    sessionStorage.setItem("player4", player4);

    // Change the href to direct to the onevsone page with a hash
    
    var data = 
    {
        jsonplayer1: sessionStorage.getItem('player1'),
        jsonplayer2: sessionStorage.getItem('player2'),
        jsonplayer3: sessionStorage.getItem('player3'),
        jsonplayer4: sessionStorage.getItem('player4'),
        jsonsecuritykey: sessionStorage.getItem('securitykey'),
        jsonusername: sessionStorage.getItem('username'),
    }
    console.log(data);
    fetch("http://localhost:8000/api/account/tournament/", {
      method: 'POST', // İstek metodu
      headers: {
        'Content-Type': 'application/json', // İçerik tipini belirtme
      },
      body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
    })
    .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
    .then(data => {
            //console.log(data.message[0]);
            sessionStorage.setItem("round1_paddle1", data.message[0]);
            sessionStorage.setItem("round1_paddle2", data.message[1]);

            sessionStorage.setItem("round2_paddle1", data.message[0]);
            sessionStorage.setItem("round2_paddle2", data.message[1]);
            window.location.hash = "tournamentmatches"
    })
    .catch((error) => {
      console.error('Hata:', error);
    });
    // Optionally display the message on redirection or through another means
}


function tournamentPage() {
    return `
    <div id="game-container">
        <div class="wrapper">
            <div class="form-wrapper">
                <form onsubmit="return false;">
                    <h3 data-translate="turnuvaolustur">Turnuva Oluştur</h3>
                    <input type="text" id="addtext" placeholder="Oyuncu Adı"/>
                    <button class="choose-game-button2" data-translate="oyuncuekle" onclick="addplayer()">Start Tournament</button>
                    
                </form>
            </div>
        </div>

        <div class="wrapper">
            <div class="form-wrapper">
                <form onsubmit="return false;">
                    <h3 data-translate="turnuva">🏆 Turnuva 🏆</h3>
                    <ul>
                        <li id="player1">Player 1</li>
                        <li id="player2">Player 2</li>
                        <li id="player3">Player 3</li>
                        <li id="player4">Player 4</li>
                    </ul>
                </form>
            </div>
            
            <button onclick = "starttournament()" class="choose-game-button2" data-translate="TurnuvaStart">Start Tournament</button>

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
            flex-direction: column;
        }

        .wrapper {
            position: relative;
            width: 600px;
            background: #000;
            box-shadow: 0 0 50px greenyellow;
            border-radius: 20px;
            padding: 40px;
            overflow: hidden;
            margin: 20px 0;
            flex-direction: column;
        }

        .form-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          
        }
        .eklebutton {
            font-size: 16px;
            color: aquamarine;
            cursor: pointer;
            width: 100px; 
            display: block;
            margin: 0 auto; 
            text-align: center; 
        }
    
        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 5px;
        }

        .choose-game-button {
            text-decoration: none;
            display: block;
            width: 75%;
            padding: 10px 0;
            font-size: 16px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
           
            color: greenyellow;
            margin: 0 auto;
            font-weight: bold;
            transition: background-color 0.3s ease;
            text-align: center;
            justify-content: center;
            
        }

        .choose-game-button2 {
            text-decoration: none;
            display: block;
            width: fit-content;
            padding: 8px 12px;
            font-size: 17px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            background-color: greenyellow;
            color: #000;
            margin: 10px auto 0;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .choose-game-button:hover {
            background-color: #0cf;
        }

        h3 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #fff;
            text-align: center;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            text-align: center;
        }

        li {
            font-size: 16px;
            margin-bottom: 5px;
            color: #fff;
        }
    </style>
    `;
}