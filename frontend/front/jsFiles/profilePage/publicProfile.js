// function showNavbarStates() {
//     // var profilePicture = document.getElementById("profile-picture");
//     // var logoutWrapper = document.getElementById("logout-wrapper");
//     // var logoutButton = document.getElementById("logout-btn");
//     var matchHistory = document.getElementById("match_history");
//     var historyTable = document.getElementById("history-div");
  
//     // Profil resmine tıklandığında çıkış yap butonunu göster veya gizle
//   //   profilePicture.addEventListener("click", function() {
//   //       if (logoutWrapper.style.display === "block") {
//   //           logoutWrapper.style.display = "none";
//   //       } else {
//   //           logoutWrapper.style.display = "block";
//   //       }
//   //   });
//     matchHistory.addEventListener("click", function() {
//         if (historyTable.style.display === "block"){
//             historyTable.style.display = "flex";
//         } else {
//             historyTable.style.display = "block";
//         }
//     })
  
//     // logoutButton.addEventListener("click", function() {
//     //     window.location.hash = 'login';
//     // });
//   }

function toggleTable() {
    var table = document.getElementById("history-div");
    table.classList.toggle("hidden");
}

// Fonksiyon ile veri alımı
function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return Promise.resolve([]); // Hata durumunda boş liste dön yani data listesi boş dönüyor
      });
  }
  
  // Verileri tablo olarak gösteren fonksiyon
  function displayData(data) {
    const container = document.querySelector('#history-div');
    console.log(data.length);
    if (data.length == 0) {
        const message = document.createElement('h1');
        message.textContent = 'No match history found!';
        container.appendChild(message);
        return;
    }
    
    const header = document.createElement('h1');
    header.textContent = 'Match History Table';
    container.appendChild(header);
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody id="table-body">
        <!-- Data will be displayed here -->
      </tbody>
    `;
    container.appendChild(table);
  
    const tableBody = document.querySelector('#table-body');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
      `;
      tableBody.appendChild(row);
    });
  }

function publicProfile() {
    // Veriyi alma ve tablo olarak gösterme işlemlerini yürütme
    fetchData('your-backend-url/data')
    .then(data => {
      displayData(data);
    });
    return `
    <div class="wrapper">
    <div class="form-wrapper">
            <h3>Profile</h3>
                <div class="field-wrapper profile-photo-wrapper">
                    <img src="${sessionStorage.getItem('profile_image')}" id="profile-photo" class="profile-photo" alt="Profile Photo">
                </div>

                <div class="field-wrapper">
                <!-- Username -->
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" value="${sessionStorage.getItem('username')}" readonly>
                <!-- Email -->
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${sessionStorage.getItem('email')}" readonly>
                </div>

                <div class="field-wrapper">
                <!-- First Name -->
                    <label for="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first-name" value="${sessionStorage.getItem('name')}" readonly>
                <!-- Last Name -->
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" value="${sessionStorage.getItem('surname')}" readonly>
                </div>
                    <div class="form-wrapper">
                    <!-- Match History Symbol -->
                        <img src="../img/symbols/matchHistory.png" id="match_history" alt="Match History" class="match_history" onclick="toggleTable()">
                        <div class="game-explanation">
                            <label for="match_history_label">Match History</label>
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