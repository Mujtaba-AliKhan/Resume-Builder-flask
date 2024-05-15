function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var eyeIcon = document.getElementById("eyeIcon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      fetch("/loginConfirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message !== "Login successful!") {
            alert(data.message);
          } else {
            window.location.href = "/homepage";
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });
});
