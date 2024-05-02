function loading() {
    return `
			<style>
				.background {
					background-color: black;
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

			<div class="background">
			<img src="../img/other_backgrounds/loading-page1.gif">
			</div>
		`;
}
