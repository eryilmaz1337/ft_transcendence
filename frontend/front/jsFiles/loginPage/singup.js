function isValidEmail(email) {
  // E-posta adresi formatını kontrol etmek için bir düzenli ifade
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
  return emailRegex.test(email);
}

function signupjson()
{
  if(!document.getElementById('username').value || !document.getElementById('name').value
    || !document.getElementById('surname').value)
    return;
  var data = {
    jsonusername: document.getElementById('username').value,
    jsonname: document.getElementById('name').value,
    jsonsurname: document.getElementById('surname').value,
    jsonemail: document.getElementById('email').value,
    jsonpassword: document.getElementById('password').value
  }
  if(!isValidEmail(data.jsonemail)){
    alert("email formatı yanlış!");
    return;
  }
  console.log(data);
  fetch("http://localhost:8000/api/account/singup/", {
    method: 'POST', // İstek metodu
    headers: {
      'Content-Type': 'application/json', // İçerik tipini belirtme
    },
    body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
  })
  .then(response => {
    if (!response.ok) {
      signupError = document.getElementById('signupError');
      signupError.style.visibility = 'visible';
      throw new Error('Network response was not ok');
    }
    return response.json();
}) // JSON olarak dönen yanıtı parse etme
  .then(data => {
    console.log('Başarıyla gönderildi:', data);
    window.location.hash = "login";
  })
  .catch((error) => {
    console.error('Hata:', error);
  });
}


function singup()
{
    return `
    <title>Register - Transcendence Project</title>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #111;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #000;
        background-size: cover;
      }
      .form-wrapper {
        background-color: #111;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 1.25em 0.5em greenyellow;
      }
      h3 {
        text-align: center;
        margin-bottom: 20px;
      }
      form {
        display: flex;
        flex-direction: column;
      }
      input {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #333;
        background-color: #222;
        color: #fff;
      }
      button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #0f0;
        color: #000;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s, background-color 0.2s;
      }
      button:hover {
        background-color: #0c0;
        transform: scale(1.1);
      }

      .back-button {
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

      .signupError{
        text-align: center;
        visibility: hidden;
        font-weight: bold;
        margin-bottom: 10px;
        color: #f00;
      }

    </style>

    <body>
      <div class="form-wrapper">
        <button class="back-button" onclick="location.href='#login'" data-translate="back">Back to Login</button>
        <h3 data-translate="registertoproject">Register to Transcendence Project</h3>
          <form id="registerForm" method="post" >
            <input type="text" id="username" placeholder="Username" requidred>
            <input type="text" id="name" placeholder="Name" requidred>
            <input type="text" id="surname" placeholder="Surname" requidred>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <div class="signupError" id="signupError" data-translate="signupError"></div>
            <button type="button" onclick="signupjson()" data-translate="registerbuton">Sign Up</button>
          </form>
      </div>
  </body>
    `;
}

