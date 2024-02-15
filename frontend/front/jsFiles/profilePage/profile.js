function profileAdd() {
    return `
    <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3>Account Settings</h3>
                <div class="input-wrapper">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="Yasin Şensoy">
                </div>
                <div class="input-wrapper">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" value="sensoyyasin">
                </div>
                <div class="input-wrapper">
                    <label for="confirm-checkbox">Two-Factor Authentication:</label>
                    <input type="checkbox" id="confirm-checkbox" name="confirm-checkbox">
                </div>
                <div class="input-wrapper" id="authentication-wrapper">
                    <a href="#confirm" id="auth-link" onclick="myConfirm()">Two-Factor Auth Etkinleştir</a>
                </div>
                <div class="input-wrapper">
                    <label for="upload-photo" class="btn btn-outline-primary">Upload new photo</label>
                    <input type="file" id="upload-photo" class="account-settings-fileinput">
                </div>
                <div class="input-wrapper language-wrapper">
                    <label for="language-select">Dil Seç:</label>
                    <select id="language-select">
                        <option value="english">English</option>
                        <option value="turkish">Türkçe</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary button_profile">Save changes</button>
                <button type="button" class="btn btn-default button_profile">Cancel</button>
            </form>
</div>

    <style>
        .wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 490px;
            background: #000;
            box-shadow: 0 0 50px greenyellow;
            border-radius: 20px;
            padding: 40px;
            overflow: hidden;
        }

        .form-wrapper {
            width: 100%;
            color: #fff;
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
        }

        h3 {
            font-size: 30px;
            margin-bottom: 20px;
            color: #fff;
            text-align: center;
        }

        .input-wrapper {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }

        .input-wrapper label {
            margin-right: 10px;
            width: 200px;
        }

        .input-wrapper input[type="text"],
        .input-wrapper input[type="file"] {
            flex: 1;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: calc(100% - 210px); /* Genişlik ayarlaması güncellendi */
        }

        .input-wrapper input[type="checkbox"] {
            margin-right: 10px;
            width: auto; /* Checkbox genişliği otomatik ayarlandı */
        }

        .account-settings-fileinput {
            display: none;
        }

        .btn-outline-primary {
            background: transparent;
            border: 1px solid greenyellow;
            color: greenyellow;
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn-outline-primary:hover {
            background: greenyellow;
            color: #000;
        }

        .button_profile {
			text-decoration: none;
            padding: 10px 20px;
            margin-top: 20px;
			font-size: 18px;
            border: none;
            border-radius: 15px;
            cursor: pointer;
        }

        .btn-primary {
            background-color: greenyellow;
            color: #000;
            transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #0cf;
        }

        .btn-default {
            background-color: #babbbc;
            color: #000;
            margin-left: 10px;
        }

		.language-wrapper {
			margin-top: 20px;
			text-align: center;
		}

		#language-select {
			padding: 5px;
			border-radius: 5px;
			cursor: pointer;
		}

    </style>
    `;
}
