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
    showNavbarStates();

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
            case 'quickMatch':
                content = gameAdd();
                showHeader();
                break;
            case 'specialMatch':
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
        //Sayfa içeriği değiştikten sonra navbar gösterme
        showNavbarStates();
        //Async function()
    }
    else
        window.location.hash = 'login';
}

// function showBackgroundColor() {
//     document.body.style.background = "black";
//     document.body.style.backgroundImage = "none";
// }

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
