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
    showBackgroundColor();

    if (isLoggedIn || page == 'login')
    {
        switch (page) {
            case 'login':
                removeHeader();
                content = loginAdd();
                break;
            case 'game':
                content = chooseGame();
                break;
            case 'specialMatch':
                content = gameAdd();
                showHeader();
                break;
            case 'chat':
                content = chatAdd();
                break;
            case 'profile':
                content = profileAdd();
                break;
            case 'confirm':
                break;
            default:
                content = ErrorAdd();
        }
        //Yeni içerik eklenir.
        document.getElementById('content').innerHTML = content;
        window.location.hash = page;
    }
    else
        window.location.hash = 'login';
}

// function setBackgroundLogin() {
//     document.body.style.backgroundImage = "url('img/42.png')";
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundRepeat = "no-repeat";
//     document.body.style.backgroundPosition = "center";
// }

function showBackgroundColor() {
    document.body.style.background = "black";
    document.body.style.backgroundImage = "none";
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
    const nav = document.querySelector('.nav-links-special');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links-special li');

    nav.classList.remove('custom-nav-active');
    burger.classList.remove('toggle');

    navLinks.forEach((link, index) => {
        link.style.animation = '';
    });
}
