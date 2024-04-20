function loading() {
    return `
			<style>
				.background {
					background-image: url('img/loading-page1.gif');
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
