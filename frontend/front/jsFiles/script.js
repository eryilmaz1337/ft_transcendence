document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde hash'i kontrol et ve sayfayı değiştir
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        // Başlangıçta anasayfa yüklenmesini istedim
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
            break;
        case 'login':
            content = loginAdd();
            break;
        case 'game':
            content = gameAdd();
            setGameBackground();
            break;
        case 'profile':
            content = profileAdd();
            setProfileBackground();
            break;
        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;

    window.location.hash = page;
}

function resetBackground() {
    document.body.style.backgroundImage = "url('img/comodore64.jpeg')";
    document.body.style.backgroundColor = "transparent";
}

function setGameBackground() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "red";
}

function setProfileBackground() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "green";
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
