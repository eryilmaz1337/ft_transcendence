function showNavbarStates() {
  var profilePicture = document.getElementById("profile-picture");
  var logoutWrapper = document.getElementById("logout-wrapper");
  var logoutButton = document.getElementById("logout-btn");

  // Profil resmine tıklandığında çıkış yap butonunu göster veya gizle
  profilePicture.addEventListener("click", function() {
      if (logoutWrapper.style.display === "block") {
          logoutWrapper.style.display = "none";
      } else {
          logoutWrapper.style.display = "block";
      }
  });

  logoutButton.addEventListener("click", function() {
      window.location.hash = 'login';
  });
}
