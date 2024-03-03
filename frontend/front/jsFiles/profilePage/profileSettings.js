
function profileSettings() {
    return `
    <div class="wrapper">
        <div class="form-wrapper">
            <form onsubmit="return false;">
                <h3>Account Settings</h3>
                <!-- Profile Photo -->
                <div class="input-wrapper">
                    <label for="profile-photo">Profile Photo:</label>
                    <input type="file" id="profile-photo" class="account-settings-fileinput">
                </div>
                <!-- Username -->
                <div class="input-wrapper">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" value="sensoyyasin">
                </div>
                <!-- Email -->
                <div class="input-wrapper">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="example@example.com">
                </div>
                <!-- Nickname -->
                <div class="input-wrapper">
                    <label for="nickname">Nickname:</label>
                    <input type="text" id="nickname" name="nickname" value="Sensoy">
                </div>
                <!-- First Name -->
                <div class="input-wrapper">
                    <label for="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first-name" value="Yasin">
                </div>
                <!-- Last Name -->
                <div class="input-wrapper">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" value="Şensoy">
                </div>
                <!-- Buttons -->
                <button type="button" class="btn btn-primary button_profile" onclick="saveProfile()">Save</button>
                <button type="button" class="btn btn-primary button_profile" >Cancel</button>
            </form>
        </div>
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
        .input-wrapper input[type="email"],
        .input-wrapper input[type="number"],
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
