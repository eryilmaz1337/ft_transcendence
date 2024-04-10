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
                <h3 data-translate="profileheader">Profile</h3>
                    <div class="field-wrapper profile-photo-wrapper">
                        <img src="${sessionStorage.getItem('profile_image')}" id="profile-photo" class="profile-photo" alt="Profile Photo">
                    </div>
                    <div class="field-wrapper">
                    <!-- Username -->
                        <label for="username" data-translate="profileuser" >Username:</label>
                        <input type="text" id="username" name="username" value="${sessionStorage.getItem('username')}" readonly>
                    <!-- Email -->
                        <label for="email" data-translate="profileemail">Email:</label>
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
        </div>
    </div>

    <style>

    .wrapper {
        margin-top: 37px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%; /* Yeniden ayarlandı */
        max-width: 600px; /* Maksimum genişlik eklendi */
        background: #000;
        box-shadow: 0 0 50px greenyellow;
        border-radius: 20px;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column; /* Flex yönü değiştirildi */
    }

    .form-wrapper {
        width: 100%;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        margin-right: -50px;
        margin-left: 50px;
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
        height: 30px;
        font-size: 16px;
        padding-left: 8px;
        border-radius: 5px;
        width: 100%;
        background-color: #404040;
        color: #f0f0f0;
        cursor: not-allowed;
        pointer-events: none;
        text-shadow: 0 0 5px #ff668c;
    }

    .field-wrapper input:hover {
        box-shadow: 0 0 10px #cc3300;
    }

    .profile-photo {
        object-fit: cover;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .profile-photo:hover {
        box-shadow: 0 0 10px #5ff0d0;
    }

    .match_history {
        width: 125px;
        height: 125px;
        border-radius: 10%;
        margin-bottom: 10px;
    }

    .match_history:hover {
        box-shadow: 0 0 5px #FFFA67;
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
        border-radius: 50%;
        margin-bottom: 10px;
    }

    .symbol-wrapper:hover {
        box-shadow: 0 0 10px purple;
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

    .table th,
    .table td {
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
    }

    .table th {
        background-color: #f2f2f2;
    }

    .table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .match_history {
        cursor: pointer;
    }

    .history-div {
        margin-top: 20px;
    }

    .hidden {
        display: none;
    }

    /* Ekran boyutlarına göre tablo stilleri */
    @media screen and (max-width: 768px) {
        .table th,
        .table td {
            padding: 6px;
        }

        .number {
            font-size: 36px;
        }

        .table tr:nth-child(even) {
            background-color: transparent;
        }
    }

    @media screen and (max-width: 480px) {
        .table th,
        .table td {
            padding: 4px;
        }

        .number {
            font-size: 24px;
        }
    }

    </style>
    `;
}
