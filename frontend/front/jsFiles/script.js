let key = false;
var searchlanguages = localStorage.getItem('selectedLanguage');
        if(!searchlanguages)
        localStorage.setItem('selectedLanguage', 'tr');

window.addEventListener('beforeunload', function(event) {
    // Bağlantıyı kapat
    socket.close();
});
        
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
        window.location.hash = "#loading"
    }
    else
    {
        var usernameTextElements = document.querySelectorAll('.username_text');
                    usernameTextElements.forEach(function(element) {
                        element.textContent = sessionStorage.getItem("username");
                    });
        window.location.hash = "#login";
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
    changePage(page);
});

function getStart() {
    fetch(serverIP + '/api/account/get-client-id/')
    .then(response => response.json())
    .then(data => {
        client = data.client_id;
        // Server tarafından dönen client_id'yi kullanın
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function changePage(page) {
    log = sessionStorage.getItem("login");
    let content = '';
    //önceki içerik temizlenir
    document.getElementById('content').innerHTML = '';
    showHeader();
    // showNavbarStates();

    if (log!="false" && log)
    {
        updateProfilePictureStyle();
        switch (page)
        {
            case 'game':
                content = chooseGame();
                break;
            case 'onevsone':
                content = gameAdd();
                break;
            case 'onevsonesetup':
                content = onevsonesetup();
                break;
            case 'aimode':
                content = gameAdd();
                break;
            case 'tournament':
                content = tournamentPage();
                break;
            case 'tournamentmatches':
                content = gameAdd();
                break;
            case 'tournament1':
                content = gameAddwinnerContinue();
                break;
            case 'tournament2':
                content = gameAdd();
                break;
            case 'winnerpage':
                content = gameAddwinner();
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
                content = ErrorAdd();
        }
        //Yeni içerik eklenir.
        document.getElementById('content').innerHTML = content;
        window.location.hash = page;

        var languages = localStorage.getItem('selectedLanguage');
        changeLanguage(languages);
        //Sayfa içeriği değiştikten sonra navbar gösterme
        // showNavbarStates();
        //Async function()
    }
    else
    {
        switch (page)
        {
            case 'login':
                removeHeader();
                getStart();
                content = loginAdd();
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
            default:
                removeHeader();
                key = true;
                content = loginAdd();
        }

        //Yeni içerik eklenir.
        document.getElementById('content').innerHTML = content;
        if(key == false)
            window.location.hash = page;
        else
        {
            window.location.hash = "login"
            key = false;
        }

        var languages = localStorage.getItem('selectedLanguage');
        changeLanguage(languages);
        //Sayfa içeriği değiştikten sonra navbar gösterme
        // showNavbarStates();
        //Async function()
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
