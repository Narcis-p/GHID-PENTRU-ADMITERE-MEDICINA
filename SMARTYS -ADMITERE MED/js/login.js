document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const usernameOrEmail = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const errorElement = document.getElementById("errorMessage");

            errorElement.textContent = "";

            
            if (!usernameOrEmail || !password) {
                errorElement.textContent = "Toate câmpurile sunt obligatorii.";
                return;
            }

            
            const savedUserData = localStorage.getItem("smartysUser");
            if (!savedUserData) {
                errorElement.textContent = "Nu există niciun cont creat. Te rugăm să te înregistrezi.";
                return;
            }

            const savedUser = JSON.parse(savedUserData);

            
            const isUsernameMatch = usernameOrEmail.toLowerCase() === savedUser.username.toLowerCase();
            const isEmailMatch = usernameOrEmail.toLowerCase() === savedUser.email.toLowerCase();
            const isPasswordMatch = password === savedUser.password;

            if ((isUsernameMatch || isEmailMatch) && isPasswordMatch) {
                
                localStorage.setItem("activeUser", savedUser.username);
                sessionStorage.setItem("showConfetti", "true");
                
                
                const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "index.html";
                sessionStorage.removeItem("redirectAfterLogin");
                window.location.href = redirectUrl;
            } else {
                errorElement.textContent = "Nume utilizator/email sau parolă incorectă.";
            }
        });
    }

    
    if (sessionStorage.getItem("redirectToLogin")) {
        sessionStorage.removeItem("redirectToLogin");
        const errorElement = document.getElementById("errorMessage");
        if (errorElement) {
            errorElement.textContent = "Te rugăm să te autentifici pentru a accesa această pagină.";
        }
    }
});
