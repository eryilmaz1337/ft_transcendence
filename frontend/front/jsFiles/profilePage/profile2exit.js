function showNavbarStates() {
  var profilePicture = document.getElementById("profile-picture");
  var logoutWrapper = document.getElementById("logout-wrapper");
  var logoutButton = document.getElementById("logout-btn");
  var usernameButton = document.getElementById("username-btn");

  logoutButton.addEventListener("click", function() {
      window.location.hash = 'login';
  });
}
