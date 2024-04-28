function addPlayer() {
    var listeItems = document.querySelectorAll(".liste li");
    listeItems.forEach(item => {
        console.log(item.textContent);
    });

    var liste = document.querySelector(".liste"); // Liste elementini seç
    var verim = document.querySelector("#veri"); // Oyuncu adı inputunu seç
    var ekle = document.querySelector("#ekle"); // "Listeye Oyuncu Ekle"

    // var oyuncuAdi = verim.value;
    // if (!oyuncuAdi) {
    //     console.log("Oyuncu adı boş olamaz.")
    //     return;
    // }

    // var online = isPlayerOnline(oyuncuAdi);

    // var li = document.createElement("li"); // Yeni li öğesi oluştur
    // li.textContent = verim.value;

    // if (online) {
    //     li.classList.add("online");
    // } else {
    //     li.classList.add("offline");
    // }

    // liste.appendChild(li);

    if (liste) {
        var li = document.createElement("li"); // Yeni li öğesi oluştur
        li.textContent = verim.value;
        li.style.color = "white";
        liste.appendChild(li); // Yeni oyuncuyu listeye ekle
    } else {
        console.error("Liste elementi bulunamadı.");
    }
}

function tournamentPage() {

    return `

    <div id="game-container">

    <div class="wrapper">
        <div class="form-wrapper">
            <form>
                <h3 data-translate="turnuvaolustur">Turnuva Oluştur</h3>
                <input type="text" id="veri" placeholder="Oyuncu Adı"/>
                <button type="button" class="choose-game-button2" data-translate="oyuncuekle" onclick="addPlayer()">Listeye Oyuncu Ekle</button>
            </form>
        </div>
    </div>

    <div class="wrapper">
        <div class="form-wrapper">
            <form>
                <h3 data-translate="turnuva">🏆 Turnuva 🏆</h3>
                <ul class="liste">
                    <li> Walter White </li>
                    <li> Jesse Pinkman </li>
                    <li> Skyler White </li>
                    <li> Hank Schrader </li>
                    <li> Gustavo Fring </li>
                </ul>
            </form>
        </div>
        <button type="button" class="choose-game-button2" id="quickMatchButton" onclick="startTournament()" data-translate="TurnuvaStart">Start Tournament</button>
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
