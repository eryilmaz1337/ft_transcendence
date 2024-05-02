function ErrorAdd() {
    return `
			<style>
				.background {
					background-image: url('img/other_backgrounds/404.jpeg');
					background-size: cover; /* contain */
					background-position: center;
					background-repeat: no-repeat;
					height: 100vh; /* Header'ın yüksekliğini düşürür */
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column; /* İçerikleri dikey olarak hizalar */
				}
			</style>

			<div class="background"></div>
		`;
}
