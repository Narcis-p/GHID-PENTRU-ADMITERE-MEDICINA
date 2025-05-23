document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const username = document.getElementById("newUsername").value.trim();
          const email = document.getElementById("newEmail").value.trim();
          const password = document.getElementById("newPassword").value;
          const errorElement = document.getElementById("signupError");

          
          if (!username || !email || !password) {
              errorElement.textContent = "Toate câmpurile sunt obligatorii.";
              return;
          }

          if (password.length < 6) {
              errorElement.textContent = "Parola trebuie să aibă minim 6 caractere.";
              return;
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              errorElement.textContent = "Te rugăm să introduci o adresă de email validă.";
              return;
          }

          
          const userData = {
              username,
              email,
              password
          };

          localStorage.setItem("smartysUser", JSON.stringify(userData));
          localStorage.setItem("activeUser", username);
          sessionStorage.setItem("showConfetti", "true");
          
          
          window.location.href = "index.html";
      });
  }
});
