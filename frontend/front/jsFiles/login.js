let isLoggedIn = false;

function loginSuccess() {
    isLoggedIn = true;
    document.getElementById("toapi").classList.add("is-loading");

    if (isLoggedIn) {
        window.location.href = "#home";
    }
}

function loginAdd() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Page</title>
            <style>
                body {
                    height: 100vh;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: sans-serif;
                    color: black;
                }

                .container {
                    background-color: rgba(255, 255, 255, 0.8); /* Saydam arka plan */
                    padding: 20px;
                    border-radius: 20px;
                    text-align: center;
                }

                .box {
                    margin-bottom: 20px; /* Kutu altında boşluk */
                }

                .button {
                    padding: 10px 20px;
                    font-size: 16px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    background-color: #28a745;
                    color: white;
                    font-weight: bold;
                    margin-top: 10px;
                    padding: 10px 20px;
                    transition: background-color 0.3s ease;
                }

                .button:hover {
                    background-color: #218838;
                }

            </style>
        </head>
        <body>
            <div class="container">
                <div class="box">
                    <h1 class="is-1 title is-spaced">Welcome to Transcendence</h1>
                    <a href="#home">
                        <!-- onclick event updated -->
                        <button id="toapi" onclick="loginSuccess()" class="button">Sign in with 42</button>
                    </a>
                </div>
            </div>

            <script>
                // JavaScript kodu burada
                function loginSuccess() {
                    // Burada kullanıcı başarılı bir şekilde giriş yaptığında bayrağı true yapacağız
                    isLoggedIn = true;
                    document.getElementById("toapi").classList.add("is-loading");

                    // Yönlendirme işlemi için
                    if (isLoggedIn) {
                        window.location.href = "#home";
                    }
                }

                window.history.replaceState({}, document.title, "/" + "");
            </script>
        </body>
        </html>
    `;
}
