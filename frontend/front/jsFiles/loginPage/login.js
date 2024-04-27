let isLoggedIn = false;

function login42()
{
    const client_id = 'u-s4t2ud-1c2cdbd5f93bbb10f5c88928250742cd0f34b7404d28cf9db6ce0a7ec31ae127'; // Ecole 42 uygulamanızın istemci kimliği
    const redirect_uri = 'http://localhost:423'; // Ecole 42 tarafından yetkilendirme sonrası yönlendirileceğiniz URI
    const scopes = 'public'; // İzin istediğiniz kapsamlar
    const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
}

function accountsave(accessToken)
{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/account/42-api/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) 
            {
                const data = JSON.parse(xhr.responseText);
                if (data)
                {
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('name', data.name);
                    sessionStorage.setItem('surname', data.surname);
                    sessionStorage.setItem('email', data.email);
                    sessionStorage.setItem('securitykey', data.securitykey);
                    sessionStorage.setItem('profile_image', data.profile_image);
                    var usernameTextElements = document.querySelectorAll('.username_text');
                    usernameTextElements.forEach(function(element) {
                        element.textContent = data.username;
                    });
                    con();
                    window.location.hash = "#game";

                } else {
                    alert('Error while processing the request.');
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };

    // accessToken'i doğru şekilde kullan
    const requestBody = JSON.stringify({ code: accessToken });
    xhr.send(requestBody);
    isLoggedIn = true;
}

function loginSuccess()
{
    // burdan veri tabanındaki çevrimiçi durumunu değiştiren kodu yaz

    window.location.hash = "#loading"
    isLoggedIn = true;
}

function signinFunction(){
    isLoggedIn = true;
    document.getElementById("signin").classList.add("is-loading");
    if (isLoggedIn)
        window.location.hash = "#signin";
}

function signupFunction(){
    isLoggedIn = true;
    document.getElementById("signup").classList.add("is-loading");
    if (isLoggedIn)
        window.location.hash = "#signup";
}

function loginAdd() {
    return `
        <head>
            <style>

                .form-wrapper button {
                    margin: 5px; /* Butonlar arasında boşluk bırak */
                    padding: 10px 20px; /* Buton içi boşluk */
                    font-size: 16px; /* Yazı boyutu */
                    border: none; /* Kenarlık kaldır */
                    border-radius: 5px; /* Kenarları yuvarlak yap */
                    cursor: pointer; /* İmleç buton üzerine geldiğinde değişsin */
                 }
               * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #000;
                }

                .wrapper {
                    position: relative;
                    width: 490px;
                    height: 300px;
                    background: #000;
                    box-shadow: 0 0 1.25em 0.5em greenyellow;
                    border-radius: 20px;
                    padding: 40px;
                    overflow: hidden;
                }

                .form-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                h3 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #fff;
                    text-align: center;
                }

                button {
                    width: 100%;
                    height: 40px;
                    background: greenyellow;
                    box-shadow: 0 0 10px greenyellow;
                    position: relative;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    border-radius: 20px;
                    border: none;
                    outline: none;
                    transition: background-color 1s ease;
                }

                button:hover {
                    background-color: #0cf;
                    transform: scale(1.1);
                }

            </style>
        </head>

        <body>
            <div style="display: flex; justify-content: space-between; width: 100%; padding: 25px">
                <button onclick="language('tr')" style="background : lightblue; ">Turkish</button>
                <button onclick="language('en')" style="margin-left: 10px; margin-right: 10px; background: lightblue;">English</button>
                <button onclick="language('ru')" style="background : lightblue; " >Russian </button>
            </div>
            <div class="wrapper">
                <div class="form-wrapper">
                    <form onsubmit="return false;">
                        <h3 data-translate="welcome"> Welcome to Transcendence Project</h3>
                        <button id="toapi" onclick="login42()" data-translate="intra" >Sign in with 42 API</button>
                        <button id="signup" onclick="signupFunction()" data-translate="register" >Sign up</button>
                        <button id="signin" onclick="signinFunction()" data-translate="login" >Sign in</button>
                    </form>
                </div>
            </div>
        </body>
    `;
}
