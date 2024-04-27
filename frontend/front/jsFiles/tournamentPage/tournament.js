function tournamentPage() {
    return `
    <div id="game-container">
        <div class="wrapper">
            <div class="form-wrapper">
                <form onsubmit="return false;">
                    <h3 data-translate="turnuvaolustur">Turnuva Oluştur</h3>
                   
                
                    <input type="text" placeholder="Oyuncu Adı"/>
                  
                    <a href ="#quickMatch" class="choose-game-button2" id="quickMatchButton" data-translate="oyuncuekle">Start Tournament</a>
                    
                </form>
            </div>
        </div>

        <div class="wrapper">
            <div class="form-wrapper">
                <form onsubmit="return false;">
                    <h3 data-translate="turnuva">🏆 Turnuva 🏆</h3>
                    <ul>
                        <li>Player 1</li>
                        <li>Player 2</li>
                        <li>Player 3</li>
                        <li>Player 4</li>
                    </ul>
                </form>
            </div>
            
            <a href ="#quickMatch" class="choose-game-button2" id="quickMatchButton" data-translate="TurnuvaStart">Start Tournament</a>

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