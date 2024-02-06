function loginAdd() {
    return `
        <style>
            body {
                font-family: 'Arial', sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background-color: #f8f9fa;
            }

            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
                margin: 0 auto; /* Sayfayı tam ortala */
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            label {
                font-weight: bold;
                font-size: 14px;
                color: #555;
            }

            input {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
            }

            button {
                background-color: #007bff;
                color: #fff;
                padding: 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #0056b3;
            }
        </style>

        <div class="container">
            <form id="loginForm">
                <h2>Login</h2>
                <label for="username">Username</label>
                <input type="text" id="username" required>
                <label for="password">Password</label>
                <input type="password" id="password" required>
                <button type="button" onclick="login()">Login</button>
            </form>
        </div>

        <script>
            function login() {
                var username = document.getElementById("username").value;
                var password = document.getElementById("password").value;

                console.log("Login:", username, password);
            }
        </script>
    `;
}
