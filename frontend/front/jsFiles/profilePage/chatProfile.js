function toggleTable() {
    var table = document.getElementById("history-div");
    table.classList.toggle("hidden");
}

function chatProfile(username) {
    var data = {
        jsonsecuritykey: sessionStorage.getItem("securitykey"),
        getusername: username
    }
    console.log(username);
    fetch(`http://localhost:8000/api/account/getuser/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        sessionStorage.setItem('rusername', data.username);
        sessionStorage.setItem('rname', data.name);
        sessionStorage.setItem('rsurname', data.surname);
        sessionStorage.setItem('remail', data.email);
        sessionStorage.setItem('rprofile_image', data.profile_image);
        var usernameTextElements = document.querySelectorAll('.username_text');
            usernameTextElements.forEach(function(element) {
                element.textContent = data.username;
            });
            updateProfileImageOnPage(data.profile_image);

        // Profil bilgilerini güncelle
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        document.getElementById('first-name').value = data.name;
        document.getElementById('last-name').value = data.surname;

        // Profil fotoğrafını güncelle
        const profilePhoto = document.getElementById('profile-photo');
        profilePhoto.src = data.profile_image;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Hata durumunda uygun bir mesaj gösterebilirsiniz
    });

    return `
    <div class="wrapper">
    <div class="form-wrapper">
            <h3>Profile</h3>
                <div class="field-wrapper profile-photo-wrapper">
                    <img src="${sessionStorage.getItem('rprofile_image')}" id="profile-photo" class="profile-photo" alt="Profile Photo">
                </div>

                <div class="field-wrapper">
                <!-- Username -->
                    <label for="username" data-translate="profileusername">Username:</label>
                    <input type="text" id="username" name="username" value="${sessionStorage.getItem('rusername')}" readonly>
                <!-- Email -->
                    <label for="email"  data-translate="profileemail">Email:</label>
                    <input type="email" id="email" name="email" value="${sessionStorage.getItem('remail')}" readonly>
                </div>

                <div class="field-wrapper">
                <!-- First Name -->
                    <label for="first-name" data-translate="profilefirstname">First Name:</label>
                    <input type="text" id="first-name" name="first-name" value="${sessionStorage.getItem('rname')}" readonly>
                <!-- Last Name -->
                    <label for="last-name" data-translate="profilelastname">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" value="${sessionStorage.getItem('rsurname')}" readonly>
                </div>
                    <div class="form-wrapper">
                    <!-- Match History Symbol -->
                        <img src="../img/symbols/matchHistory.png" id="match_history" alt="Match History" class="match_history" onclick="toggleTable()">
                        <div class="game-explanation">
                            <label for="match_history_label" data-translate="matchHistory">Match History</label>
                        </div>
                    </div>
                <div class="history-div" id="history-div">
                    <!-- Tablo veya mesaj burada görüntülenecek -->
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
    }

    .field-wrapper label {
        margin-right: 20px;
        margin-left: 20px;
        width: 150px;
        display: inline-block;
        color: #fff;
    }

    .game-explanation label {
        align-items: center;
        color: #fff;
    }

    .field-wrapper input[type="text"],
    .field-wrapper input[type="email"],
    .field-wrapper input[type="number"] {
        flex: 1;
        padding: 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        background-color: #404040;
        color: #f0f0f0;
        cursor: not-allowed;
        pointer-events: none;
        text-shadow: 0 0 5px #ff668c;
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

    .table th {
        background-color: #f2f2f2;
    }

    /* Satır arka plan rengi değişimi */
    .table tr:nth-child(even) {
        background-color: #f2f2f2;
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

</style>
    `;
}
