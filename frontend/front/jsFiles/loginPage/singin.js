function signinprocessing()
{
  isLoggedIn = true;
    if (isLoggedIn) {
        window.location.href = "#game";
    }
}


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
        signinprocessing();
        alert(`Giriş Başarılı`);
        if (data) {
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('surname', data.surname);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('securitykey', data.securitykey);
          sessionStorage.setItem('profile_image', data.profile_image);

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
        background: #121212;
        color: white;
      }
      
      .container {
        width: 300px;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #232323;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
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
      }      
    </style>
    <body>
    <div class="container">
    <h2 data-translate="giristrans">Sign In to Transcendence Project</h2>
    <form id="signInForm">
      <div class="input-group">
        <input type="text" id="username" required>
        <label for="username" data-translate="girisuser" >Username</label>
      </div>
      <div class="input-group">
        <input type="password" id="password" required>
        <label for="password" data-translate="girispass">Password</label>
      </div>
      <button type="submit" onclick="signinjson()" data-translate="girisbuttons">Sign In</button>
    </form>
    </div>
  </body>
    `;
}

