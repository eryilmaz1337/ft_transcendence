var searchlanguages = localStorage.getItem('selectedLanguage');
        if(!searchlanguages)
        localStorage.setItem('selectedLanguage', 'tr');


document.addEventListener('DOMContentLoaded', function () {

    if (window.location.search.includes('code='))
    {
        // Yetkilendirme kodunu URL'den çıkar
        const accessToken = new URLSearchParams(window.location.search).get('code');
        const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
        window.history.replaceState(null, null, cleanUrl);
        // `accessToken` değişkenini kullanarak sunucu tarafında erişim token'ı almak için bir istek yapın
        accountsave(accessToken);
        loginSuccess();
        // loginSuccess();
    }
    else
    {
        const page = window.location.hash.substring(1);
        changePage(page || 'login'); // Eğer hash yoksa login sayfasına yönlendir
    }
});

// Sayfa değiştikçe URL hash'ini güncelle
window.addEventListener('hashchange', function () {
    const page = window.location.hash.substring(1);
    changePage(page);
});

function changePage(page) {
    let content = '';
    //önceki içerik temizlenir
    document.getElementById('content').innerHTML = '';
    showHeader();
    showNavbarStates();

    if (isLoggedIn || page == 'login')
    {
        updateProfilePictureStyle();
        //console.log("girilen sayfa= "+page);
        switch (page) {
            case 'login':
                removeHeader();
                content = loginAdd();
                break;
            case 'game':
                content = chooseGame();
                break;
            case 'quickMatch':
                content = gameAdd();
                startgame();
                showHeader();
                break;
            case 'specialMatch':
                content = chooseCustomGame();
                showHeader();
                break;
            case 'chat':
                content = chatAdd();
                break;
            case 'publicProfile':
                content = publicProfile();
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
        window.location.hash = 'login';
}

// document.addEventListener('DOMContentLoaded', function() {

// });

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
