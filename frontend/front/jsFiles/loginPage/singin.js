function signinjson()
{
    var data = {
        jsonusername: document.getElementById('username').value,
        jsonpassword: document.getElementById('password').value,
      }
      console.log(data);
      fetch("http://localhost:8000/api/account/singin/", {
        method: 'POST', // İstek metodu
        headers: {
          'Content-Type': 'application/json', // İçerik tipini belirtme
        },
        body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
      })
      .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
      .then(data => {
        alert(`Giriş Başarılı`);
        if (data) {
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('surname', data.surname);
          sessionStorage.setItem('securitykey', data.securitykey);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('profile_image', data.profile_image);
          var usernameTextElements = document.querySelectorAll('.username_text');
          usernameTextElements.forEach(function(element) {
              element.textContent = data.username;
          });
          con()
          window.location.href = "#game";
        }else {
          alert('Error while processing the request.');
        }
      })
      .catch((error) => {
        alert(`Kullanıcı adı veya şifre hatalı`);
        console.error('Hata:', error);
      });
}

function singin()
{
    return `

    <style>
    body, html {
        height: 100%;
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #111;
        color: white;
      }

      .container {
        width: 300px;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #111;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
      }

      h2 {
        margin-bottom: 20px;
        color: #ffffff;
      }

      .input-group {
        margin-bottom: 20px;
      }

      .input-group input {
        width: 100%;
        padding: 10px;
        background: #333;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 5px;
      }

      .input-group label {
        display: block;
        text-align: left;
        margin: 5px;
        color: #999;
      }

      button {
        width: 100%;
        padding: 10px;
        border: none;
        background: #0f0;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s ease;
      }

      button:hover {
        background: #0c0;
        transform: scale(1.3);
      }

      .back-button {
        width: 30%;
        float: left;
        margin-bottom: 10px;
        border: none;
        background-color: #f00;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
      }

      .back-button:hover {
        background-color: #c00;
        transform: scale(1.3);
      }

    </style>

    <body>
    <div class="container">
    <div class="button-wrapper"><button class="back-button" onclick="location.href='#login'" data-translate="back">Back to Login</button></div>
      <h2 data-translate="giristrans">Sign In to Transcendence Project</h2>
        <div class="input-group">
          <input type="text" id="username" required>
          <label for="username" data-translate="girisuser">Username</label>
        </div>
        <div class="input-group">
          <input type="password" id="password" required>
          <label for="password" data-translate="girispass">Password</label>
        </div>
        <button type=""button onclick="signinjson()" data-translate="girisbuttons">Sign In</button>
    </div>
  </body>

    `;
}