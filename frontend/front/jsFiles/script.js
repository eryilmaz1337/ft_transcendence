document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        changePage('login');
    }
});

// Sayfa değiştikçe URL hash'ini güncelle
window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});

function changePage(page) {
    let content = '';

    resetBackground();

    switch (page) {
        case 'home':
            showHeader();
            break;
        case 'login':
            content = loginAdd();
            removeHeader();
            break;
        case 'game':
            content = gameAdd();
            setGameBackground();
            showHeader();
            break;
        case 'profile':
            content = profileAdd();
            setProfileBackground();
            showHeader();
            break;
        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
            showHeader();
    }
    document.getElementById('content').innerHTML = content;
    window.location.hash = page;
    startgame();
}

function resetBackground() {
    document.body.style.backgroundImage = "url('img/comodore64.jpeg')";
    document.body.style.backgroundColor = "transparent";
}

function setGameBackground() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "grey";
}

function setProfileBackground() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "green";
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