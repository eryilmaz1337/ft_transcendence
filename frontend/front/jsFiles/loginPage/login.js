let isLoggedIn = false;

function loginSuccess() {
    isLoggedIn = true;
    document.getElementById("toapi").classList.add("is-loading");

    if (isLoggedIn) {
        window.location.href = "#game";
    }
}

function signinFunction(){
    isLoggedIn = true;
    document.getElementById("singin").classList.add("is-loading");
    if (isLoggedIn)
        window.location.href = "#singin";
}

function signupFunction(){
    isLoggedIn = true;
    document.getElementById("singup").classList.add("is-loading");
    if (isLoggedIn)
        window.location.href = "#singup";
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
                        <button id="toapi" onclick="loginSuccess()">Sign in with 42 API</button>
                        <button id="singup" onclick="signupFunction()">Sign up</button>
                        <button id="singin" onclick="signinFunction()">Sign in</button>
                    </form>
                </div>
            </div>
        </body>
    `;
}
