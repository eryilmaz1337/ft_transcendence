document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.hash.substring(1);
    changePage(page || 'login'); // Eğer hash yoksa login sayfasına yönlendir
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
    showBackgroundImage();

    if (isLoggedIn || page == 'login')
    {
        switch (page) {
            case 'login':
                setBackgroundLogin();
                removeHeader();
                content = loginAdd();
                break;
            case 'home':
                content = homeAdd();
                break;
            case 'game':
                setBackgroundGame();
                content = chooseGame();
                //content = gameAdd();
                break;
            case 'chat':
                content = chatAdd();
                break;
            case 'profile':
                content = profileAdd();
                break;
            default:
                removeBackground();
                content = ErrorAdd();
        }
        //Yeni içerik eklenir.
        document.getElementById('content').innerHTML = content;
        window.location.hash = page;
        //startgame();
    }
    else
        window.location.hash = 'login';
}

function removeBackground() {
    document.body.style.backgroundImage = "none";
}

function setBackgroundGame() {
    document.body.style.backgroundImage = "url('img/astroturf.jpeg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
}

function setBackgroundLogin() {
    document.body.style.backgroundImage = "url('img/42.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
}

function showBackgroundImage() {
    document.body.style.backgroundImage ="url('img/comodore64.jpeg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
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
