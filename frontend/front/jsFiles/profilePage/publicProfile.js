function toggleTable() {
    var table = document.getElementById("history-div");
    table.classList.toggle("hidden");
}

function addToTable(data) 
{
     // JSON'dan gelen veriyi al
     var historyData = data.history_users;

     // Tablo elementini seç
     var table = document.getElementById("table");
 
     // Tabloyu temizle (mevcut veriyi kaldır)
     table.innerHTML = "";
 
     // Her bir kullanıcı verisi için tabloya satır ekleyin
     historyData.forEach(function(user)
     {
         var row = table.insertRow();
         var cell1 = row.insertCell();
         cell1.textContent = user.username;
         var cell2 = row.insertCell();
         cell2.textContent = user.receiver_username;
         var cell3 = row.insertCell();
         cell3.textContent = user.score1;
         var cell4 = row.insertCell();
         cell4.textContent = user.score2;
         var cell5 = row.insertCell();
         cell5.textContent = user.date;
     });
     // Kolon isimlerini ekleyelim
        var header = table.createTHead();
        var headerRow = header.insertRow(0);

        var cell1 = headerRow.insertCell(0);
        cell1.textContent = "Username";
        cell1.style.whiteSpace = "nowrap"
        cell1.style.color = "greenyellow";
        cell1.className = "username-cell";

        var cell2 = headerRow.insertCell(1);
        cell2.textContent = "Enemy";
        cell2.style.whiteSpace = "nowrap";
        cell2.style.color = "red";
        cell2.className = "enemy-cell";

        var cell3 = headerRow.insertCell(2);
        cell3.textContent = "Username Score";
        cell3.style.whiteSpace = "nowrap";
        cell3.style.color = "white";
        cell3.className = "username-score-cell";

        var cell4 = headerRow.insertCell(3);
        cell4.textContent = "Enemy Score";
        cell4.style.whiteSpace = "nowrap";
        cell4.style.color = "white";
        cell4.className = "enemy-score-cell";

        var cell5 = headerRow.insertCell(4);
        cell5.textContent = "Date";
        cell5.style.whiteSpace = "nowrap";
        cell5.style.color = "green";
        cell5.className = "date-cell";
}

function dataget()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem("securitykey"),
        username: sessionStorage.getItem("username")
    }

    fetch("http://localhost:8000/api/account/gethistory/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data) 
        {
            addToTable(data);
        } 
        else 
        {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}   

function publicProfile() {
    dataget();
    return `
    <div class="wrapper">
    <div class="form-wrapper">
        <h3 data-translate="profile">Profile</h3>
                <div class="field-wrapper profile-photo-wrapper">
                    <img src="${sessionStorage.getItem('profile_image')}" id="profile-photo" class="profile-photo" alt="Profile Photo">
                </div>

                <div class="field-wrapper">
                <!-- Username -->
                    <label for="username" data-translate="profileusername">Username:</label>
                    <input type="text" id="username" name="username" value="${sessionStorage.getItem('username')}" readonly>
                <!-- Email -->
                    <label for="email"  data-translate="profileemail">Email:</label>
                    <input type="email" id="email" name="email" value="${sessionStorage.getItem('email')}" readonly>
                </div>

                <div class="field-wrapper">
                <!-- First Name -->
                    <label for="first-name" data-translate="profilefirstname">First Name:</label>
                    <input type="text" id="first-name" name="first-name" value="${sessionStorage.getItem('name')}" readonly>
                <!-- Last Name -->
                    <label for="last-name" data-translate="profilelastname">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" value="${sessionStorage.getItem('surname')}" readonly>
                </div>
                    <div class="form-wrapper">
                    <!-- Match History Symbol -->
                        <img src="../img/symbols/matchHistory.png" id="match_history" alt="Match History" class="match_history" onclick="toggleTable()">
                        <div class="game-explanation">
                            <label for="match_history_label" data-translate="matchHistory">Match History</label>
                        </div>
                    </div>
                <div class="history-div" id="history-div">
                    <table border="3" id="table">
                    </table>
                </div>
    </div>
</div>

<style>
    .wrapper {
        margin-top: 37px;
        position: absolute;
        top: 50%; /* Adjusted from 100px to cut from the top */
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50vw; /* Adjusted width to half of the screen */
        background: #000;
        box-shadow: 0 0 50px greenyellow;
        border-radius: 20px;
        padding: 20px; /* Adjusted padding */
        overflow-y: auto; /* Added overflow-y to enable vertical scrolling */
        max-height: calc(100% - 100px); /* Adjusted maximum height to prevent excessive stretching */
        display: flex; /* Added flex display to align items */
    }

    .form-wrapper {
        width: 100%;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        box-sizing: border-box;
        display: flex; /* Added flex display to align items */
        flex-direction: column; /* Change flex-direction to column */
        justify-content: center; /* Center vertically */
        align-items: center; /* Center horizontally */
    }

    h3 {
        font-size: 30px;
        margin-bottom: 10px;
        color: #fff;
        text-align: center;
        z-index: 1;
    }

    .field-wrapper {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        min-width: 300px; /* Input wrapper'ın minimum genişliğini belirleyin */
    }

    .field-wrapper label {
        margin-right: 20px;
        margin-left: 20px;
        width: 150px;
        min-width: 150px; /* Etiketlerin minimum genişliğini belirleyin */
        display: inline-block;
        color: #fff;
    }

    .game-explanation label {
        align-items: center;
        color: #fff;
    }

    .field-wrapper input[type="text"],
    .field-wrapper input[type="email"],
    .field-wrapper input[type="number"]
    .field-wrapper input[type="file"] {
        flex: 1;
        padding: 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        background-color: #404040;
        color: #f0f0f0;
        cursor: not-allowed;
        pointer-events: none;
        text-shadow: 0 0 5px greenyellow;
        min-width: 70px; /* Input alanlarının minimum genişliğini belirleyin */
    }

    .field-wrapper input:hover{
        box-shadow: 0 0 10px #cc3300
    }

    .profile-photo {
        width: 150px;
        height: 150px;
        border-radius: 50%; /* Make the border radius 50% to create a circle */
    }

    .profile-photo:hover {
        box-shadow: 0 0 10px #5ff0d0
    }

    .match_history {
        width: 125px;
        height: 125px;
        border-radius: 10%;
        margin-bottom: 10px;
    }

    .match_history:hover {
        box-shadow: 0 0 5px #FFFA67
    }

    .field-wrapper.profile-photo-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .game-status-bottom-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .symbol-wrapper {
        position: relative;
        width: 125px;
        height: 125px;
        border-radius: 50%; /* Make the border radius 50% to create a circle */
        margin-bottom: 10px;
    }

    .symbol-wrapper:hover {
        box-shadow: 0 0 10px purple
    }

    .symbol-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .number {
        position: absolute;
        bottom: 20px;
        right: 20px;
        transform: translate(50%, 50%);
        color: white;
        font-size: 48px;
        text-shadow: 0 0 5px purple, 0 0 10px purple, 0 0 15px purple, 0 0 20px purple, 0 0 25px purple, 0 0 30px purple, 0 0 35px purple;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
    }

    .table th, .table td {
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
    }

    /* Resim stil */
    .match_history {
        cursor: pointer;
    }

    .history-div {
        margin-top:20px;
    }

    /* Histry div gizleme */
    .hidden {
        display: none;
    }
    /* Tablo başlığı */
    #table thead {
        background-color: #333;
        color: white;
        font-weight: bold;
    }

    /* Tek tek hücreler */
    #table td {
        padding: 8px;
        border: 1px solid #ddd;
    }

    /* Zebra çizgileri */
    #table tr:nth-child(even) {
        background-color: green;
    }

    /* Username hücresi rengi */
    .username-cell {
        color: greenyellow;
    }

    /* Enemy hücresi rengi */
    .enemy-cell {
        color: red;
    }

    /* Username Score hücresi rengi */
    .username-score-cell {
        color: white;
    }

    /* Enemy Score hücresi rengi */
    .enemy-score-cell {
        color: white;
    }

    /* Date hücresi rengi */
    .date-cell {
        color: green;
    }

</style>


    @media screen and (max-width: 1230px) {
        .field-wrapper label {
            font-size: 14px; /* Etiket metin boyutunu küçült */
            width: auto; /* Etiketlerin genişliğini otomatik olarak ayarla */
            min-width: auto; /* Ekstra olarak etiketlerin minimum genişliğini de otomatik ayarlayın */
        }

        .field-wrapper input[type="text"],
        .field-wrapper input[type="email"],
        .field-wrapper input[type="number"],
        .field-wrapper input[type="file"] {
            width: calc(100% - 170px); /* Giriş kutularının genişliğini ayarla */
            min-width: auto; /* Ekstra olarak input alanlarının minimum genişliğini de otomatik ayarlayın */
        }
    }


</style>
    `;
}
