
var searchlanguages = localStorage.getItem('selectedLanguage');
        if(!searchlanguages)
        localStorage.setItem('selectedLanguage', 'tr');


document.addEventListener('DOMContentLoaded', function () {

    const page = window.location.hash.substring(1);
    if (window.location.search.includes('code='))
    {
        // Yetkilendirme kodunu URL'den çıkar
        const accessToken = new URLSearchParams(window.location.search).get('code');
        const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
        window.history.replaceState(null, null, cleanUrl);
        // `accessToken` değişkenini kullanarak sunucu tarafında erişim token'ı almak için bir istek yapın
        accountsave(accessToken);
        loginSuccess();
    }
    else
    {
        changePage(page || 'login'); // Eğer hash yoksa login sayfasına yönlendir
    }
});

// const PhotoPath = sessionStorage.getItem('profile_image');
// const username = sessionStorage.getItem('username');
// const name = sessionStorage.getItem('name');
// const surname = sessionStorage.getItem('surname');
// const email = sessionStorage.getItem('email');

gameTheme=0;
gameBGImagePath="";
gameBGColor='';
chatProfileUsername="";

// Sayfa değiştikçe URL hash'ini güncelle
window.addEventListener('hashchange', function () {
    const page = window.location.hash.substring(1);
    if(page=="loading")
    {
        isgetdata = false;
    }
    changePage(page);
});

// function checklogin() devam edilcek yarın
// {
//     const myUsername = sessionStorage.getItem('username');
//     const messageData = {
//         sender: myUsername,
//         receiver_username: receiver_username,
//         message: message_text,
//         timestamp: new Date().toISOString(),
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(JSON.stringify(messageData));
//     } else {
//         console.error('WebSocket is not open.');
//     }

// }

function changePage(page) {
    let content = '';
    //önceki içerik temizlenir
    document.getElementById('content').innerHTML = '';
    showHeader();
    showNavbarStates();

    if (true)
    {
        updateProfilePictureStyle();
        switch (page) 
        {
            case 'login':
                removeHeader();
                content = loginAdd();
                break;
            case 'game':
                content = chooseGame();
                break;
            case 'onevsone':
                content = gameAdd();
                break;
            case 'tournament':
                content = tournamentPage(); 
                break;
            case 'tournamentmatches':
                content = gameAdd();
                break;
            case 'aimode':
                content = gameAdd();
                break;
            case 'chat':
                content = chatAdd();
                break;
            case 'publicProfile':
                content = publicProfile();
                break;
            case 'chatProfile':
                content = chatProfile(chatProfileUsername);
                break;
            case 'profileSettings':
                content = profileSettings();
                break;
            case 'signup':
                removeHeader();
                content = singup();
                break;
            case 'signin':
                removeHeader();
                content = singin();
                break;
            case 'loading':
                removeHeader();
                content = loading();
                setTimeout(function() {
                    if(isgetdata==false)
                        window.location.hash = "login";
                }, 5000);
                break;
            case 'confirm':
                break;
            default:
                removeHeader();
                content = ErrorAdd();
        }
        //Yeni içerik eklenir.
        document.getElementById('content').innerHTML = content;
        window.location.hash = page;

        var languages = localStorage.getItem('selectedLanguage');
        changeLanguage(languages);
        //Sayfa içeriği değiştikten sonra navbar gösterme
        showNavbarStates();
        //Async function()
    }
    else
    {
        window.location.hash = 'login';
        isgetdata = false;
    }
}

function updateProfilePictureStyle() {
    var profileImage = sessionStorage.getItem('profile_image');
    if (profileImage) {
        document.querySelector('.profile-picture').style.backgroundImage = 'url(' + profileImage + ')';
    }
}

function removeHeader() {
    const header = document.querySelector('nav');
    header.style.display = "none";
}

function showHeader() {
    const header = document.querySelector('nav');
    header.style.display = "flex";
}

function closeBurgerMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links li');

    nav.classList.remove('nav-active');
    burger.classList.remove('toggle');

    navLinks.forEach((link, index) => {
        link.style.animation = '';
    });
}

const profile_wrapper = document.getElementById('profile-wrapper');
const logout_wrapper = document.getElementById('logout-wrapper');

profile_wrapper.addEventListener('click', function() {
    // Hedef öğenin görünürlüğünü kontrol et
    if (logout_wrapper.style.visibility == 'hidden') {
        // Eğer hedef öğe gizli ise görünür yap
        logout_wrapper.style.visibility = 'visible';
    } else {
        // Eğer hedef öğe görünür ise gizli yap
        logout_wrapper.style.visibility = 'hidden';
    }
});
