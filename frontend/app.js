window.addEventListener('load', ()=>{
	const preload = document.querySelector('.preload');
	preload.classList.add('preload-finish');
});

const navSlide = ()=> {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click',()=>{
		nav.classList.toggle('nav-active');

	navLinks.forEach((link, index) => {
		if (link.style.animation)
			link.style.animation = '';
		else
			link.style.animation =  `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`;
		});

		burger.classList.toggle('toggle');
	});
}

const app = ()=>{
	navSlide();
}

app();
