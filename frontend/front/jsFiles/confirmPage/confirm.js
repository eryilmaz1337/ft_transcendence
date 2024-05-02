function myConfirm() {
	var checkbox = document.getElementById('confirm-checkbox');
	checkbox.checked = true;
	window.location.hash = 'confirm';
	setTimeout(function() {
		window.location.hash = 'profile';
	}, 2000);
}
