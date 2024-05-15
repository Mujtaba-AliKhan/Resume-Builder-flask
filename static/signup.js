document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPassword").value;

      if (password != confirmPassword) {
        document.getElementById("passwordError").textContent =
          "* Passwords do not match";
        return;
      }

      fetch("/signupconfirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function (data) {
          alert(data.message);
          window.location.href = "/";
        })
        .catch(function (error) {
          alert("Email already exists. Please use a different email.");
          console.error("Error:", error);
        });
    });
});
