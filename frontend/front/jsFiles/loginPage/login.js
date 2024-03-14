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
    console.log(accessToken);
    xhr.onreadystatechange = function () {
        const data = JSON.parse(xhr.responseText);
        if (data) 
        {
            localStorage.setItem('username', data.result.login);
            localStorage.setItem('profileImage', data.result.image.link);
            localStorage.setItem('name', data.result.first_name);
            localStorage.setItem('surname', data.result.last_name);
            localStorage.setItem('email', data.result.email);
        }
        else {
            alert('Error while processing the request.');
        }
    };

    // accessToken'i doğru şekilde kullan
    const requestBody = JSON.stringify({ code: accessToken });
    xhr.send(requestBody);
    loginSuccess();
    // isLoggedIn = true;
}

function loginSuccess() 
{
    // burdan veri tabanındaki çevrimiçi durumunu değiştiren kodu yaz

    window.location.hash = "#game"
    isLoggedIn = true;
}

function signinFunction(){
    isLoggedIn = true;
    document.getElementById("singin").classList.add("is-loading");
    if (isLoggedIn)
        window.location.hash = "#singin";
}

function signupFunction(){
    isLoggedIn = true;
    document.getElementById("singup").classList.add("is-loading");
    if (isLoggedIn)
        window.location.hash = "#singup";
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
                    box-shadow: 0 0 50px greenyellow;
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
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #0cf;
                }

            </style>
        </head>

        <body>
            <div class="wrapper">
                <div class="form-wrapper">
                    <form onsubmit="return false;">
                        <h3>Welcome to Transcendence Project</h3>
                        <button id="toapi" onclick="login42()">Sign in with 42 API</button>
                        <button id="singup" onclick="signupFunction()">Sign up</button>
                        <button id="singin" onclick="signinFunction()">Sign in</button>
                    </form>
                </div>
            </div>
        </body>
    `;
}
