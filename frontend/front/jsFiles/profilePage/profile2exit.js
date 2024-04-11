function showNavbarStates() {
  var logoutButton = document.getElementById("logout-btn");
  logoutButton.addEventListener("click", function() {
      sessionStorage.clear();
      window.location.hash = 'login';
  });
}
