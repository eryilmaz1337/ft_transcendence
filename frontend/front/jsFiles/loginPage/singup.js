function signupjson()
{
  if(!document.getElementById('username').value)
    return;
  if(!document.getElementById('name').value)
    return;
  if(!document.getElementById('surname').value)
    return;
  var data = {
    jsonusername: document.getElementById('username').value,
    jsonname: document.getElementById('name').value,
    jsonsurname: document.getElementById('surname').value,
    jsonemail: document.getElementById('email').value,
    jsonpassword: document.getElementById('password').value  
  }
  console.log(data);
  fetch("http://localhost:8000/api/account/singup/", {
    method: 'POST', // İstek metodu
    headers: {
      'Content-Type': 'application/json', // İçerik tipini belirtme
    },
    body: JSON.stringify(data), // JavaScript objesini JSON string'ine dönüştürme
  })
  .then(response => response.json()) // JSON olarak dönen yanıtı parse etme
  .then(data => {
    alert(`Kayıt Başarılı`);
    console.log('Başarıyla gönderildi:', data);
  })
  .catch((error) => {
    alert(`Hata!!!!!!!`);
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
        background-color: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
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
      }
      button:hover {
        background-color: #0c0;
      }
    </style>
    <body>
    <div class="form-wrapper">
      <h3>Register to Transcendence Project</h3>
      <form id="registerForm" method="get" >
        <input type="text" id="username" placeholder="Username" requidred>
        <input type="text" id="name" placeholder="Name" requidred>
        <input type="text" id="surname" placeholder="Surname" requidred>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" onclick="signupjson()">Sign Up</button>
      </form>
    </div>
  </body>
    `;
}

