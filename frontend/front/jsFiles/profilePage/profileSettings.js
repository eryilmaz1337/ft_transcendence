let flag = false;
function del()
{
    var data = {
        jsonsecuritykey: sessionStorage.getItem("securitykey")
    }

    fetch(serverIP + "/api/account/deluser/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("✓️");
            exit();
        } else {
            alert('Error while processing the request.');
        }
    })
    .catch((error) => {
        console.error('Hata:', error);
    });
}

function saveProfile() {
    var data;
    if (flag == true)
    {
        data = {
            jsonsecuritykey: sessionStorage.getItem("securitykey"),
            jsonoldusername: sessionStorage.getItem("username"),
            jsonusername: document.getElementById('username').value,
            jsonname: document.getElementById('first-name').value,
            jsonsurname: document.getElementById('last-name').value,
            jsonemail: document.getElementById('email').value,
            jsonprofileimage: serverIP + "/api/account/media/uploads/profile_image.jpg" // Profil resmi yolu
        }
    }
    else
    {
        if(sessionStorage.getItem("profile_image") == serverIP + "/img/profile_photos/pp08.jpeg")
        {
            data = {
                jsonsecuritykey: sessionStorage.getItem("securitykey"),
                jsonoldusername: sessionStorage.getItem("username"),
                jsonusername: document.getElementById('username').value,
                jsonname: document.getElementById('first-name').value,
                jsonsurname: document.getElementById('last-name').value,
                jsonemail: document.getElementById('email').value,
                jsonprofileimage: serverIP + "/img/profile_photos/pp08.jpeg" // Profil resmi yolu
            }
        }
        else
        {
            if(flag == '42')
            {
                data = 
                {
                    jsonsecuritykey: sessionStorage.getItem("securitykey"),
                    jsonoldusername: sessionStorage.getItem("username"),
                    jsonusername: document.getElementById('username').value,
                    jsonname: document.getElementById('first-name').value,
                    jsonsurname: document.getElementById('last-name').value,
                    jsonemail: document.getElementById('email').value,
                    jsonprofileimage: sessionStorage.getItem("profile_image")
                }
            }
            else
            {
                data = {
                    jsonsecuritykey: sessionStorage.getItem("securitykey"),
                    jsonoldusername: sessionStorage.getItem("username"),
                    jsonusername: document.getElementById('username').value,
                    jsonname: document.getElementById('first-name').value,
                    jsonsurname: document.getElementById('last-name').value,
                    jsonemail: document.getElementById('email').value,
                    jsonprofileimage: serverIP + "/api/account/media/uploads/profile_image.jpg" // Profil resmi yolu
                }
            }
        }
    }
        fetch(serverIP + "/api/account/account-edit/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert("✓️");
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('surname', data.surname);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('profile_image', data.profile_image);
                var usernameTextElements = document.querySelectorAll('.username_text');
                usernameTextElements.forEach(function(element) {
                    element.textContent = data.username;
                });
                updateProfileImageOnPage(data.profile_image);
            } else {
                alert('Error while processing the request.');
            }
        })
        .catch((error) => {
            console.error('Hata:', error);
        });
}

function uploadFile() {
    flag = true;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('❌');
        return;
    }

    // Dosya uzantısını kontrol et
    const fileName = file.name;
    const extension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (extension !== 'jpg')
    {
        flag = false;
        alert('❌');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Burada 'new_name' değerini dosya adı olarak ayarlıyorsunuz, belki sonuna uzantıyı eklemek istersiniz
    formData.append('new_name', 'profile_image');

    fetch(serverIP + '/api/account/upload/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("✓️");
        } else {
            alert('❌');
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('❌');
    });
}


function updateProfileImageOnPage(filepath) {
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.src = filepath; // Resmin yeni kaynağını ayarla.
    }
}

function profileSettings() {
    return `
    <div class="wrapper">
        <div class="form-wrapper">
        <form onsubmit="return false;">
        <h3 data-translate="kullaniciayarlari">Account Settings</h3>
        <!-- Profile Photo -->
        <div class="input-wrapper">
            <label for="profile-photo" data-translate="profilephoto">Profile Photo:</label>
            <input type="file" id="fileInput" class="account-settings-fileinput" onchange="uploadFile()">
        </div>
        <div class="input-wrapper">
            <label for="username" data-translate="accountusername">Username:</label>
            <input type="text" id="username" name="username" value="${sessionStorage.getItem('username')}">
        </div>
        <div class="input-wrapper">
            <label for="email" data-translate="accountmail">Email:</label>
            <input type="email" id="email" name="email" value="${sessionStorage.getItem('email')}">
        </div>
        <div class="input-wrapper">
            <label for="first-name" data-translate="accountfirstname">First Name:</label>
            <input type="text" id="first-name" name="first-name" value="${sessionStorage.getItem('name')}">
        </div>
        <div class="input-wrapper">
            <label for="last-name" data-translate="accountlastname">Last Name:</label>
            <input type="text" id="last-name" name="last-name" value="${sessionStorage.getItem('surname')}">
        </div>
        <div>
            
        </div>
        <!-- Buttons -->
        <div class="input-wrapper button_wrapper">
            <button type="button" data-translate="save"class="btn btn-primary button_profile" onclick="saveProfile()">Save</button>
            <button type="button" data-translate="delete" class="btn btn-primary button_profile" onclick="del()">Delete</button>
        </div>
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
            min-width: 300px; /* .input-wrapper'ın minimum genişliğini ayarlayın */
        }

        .input-wrapper label {
            margin-right: 10px;
            width: 120px; /* Etiketlerin sabit bir genişliği olsun */
        }

        .input-wrapper input[type="text"],
        .input-wrapper input[type="email"],
        .input-wrapper input[type="number"],
        .input-wrapper input[type="file"] {
            flex: 2 0 auto; /* Giriş kutuları daha geniş olacak, esneklik ekleyerek içerik boyutuna göre ayarlanmasını sağlayın */
        }

        .input-wrapper input[type="checkbox"] {
            margin-right: 10px;
            width: auto; /* Checkbox genişliği otomatik ayarlandı */
        }

        .account-settings-fileinput {
            display: inline-block;
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

        .button_wrapper {
            margin-top: 20px;
            display: flex;
            justify-content: center;
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

        @media screen and (max-width: 768px) {
            .input-wrapper label {
                font-size: 14px; /* Etiket metin boyutunu küçült */
                width: auto; /* Etiketlerin genişliğini otomatik olarak ayarla */
            }

            .input-wrapper input[type="text"],
            .input-wrapper input[type="email"],
            .input-wrapper input[type="number"],
            .input-wrapper input[type="file"] {
                width: calc(100% - 130px); /* Giriş kutularının genişliğini ayarla */
            }
        }

    </style>
    `;
  }
