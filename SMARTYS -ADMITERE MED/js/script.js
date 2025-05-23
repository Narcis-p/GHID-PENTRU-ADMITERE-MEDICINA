const quotes = [
    "Educația este cea mai puternică armă pe care o putem folosi pentru a schimba lumea. - Nelson Mandela",
    "Învățarea nu se epuizează niciodată. - Leonardo da Vinci",
    "Succesul nu este cheia fericirii. Fericirea este cheia succesului. - Albert Schweitzer"
];

function typeEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}


function setupAccessRestrictions() {
    const activeUser = localStorage.getItem('activeUser');
    const lectiiLink = document.querySelector('a[href="#lectii"]');
    const grileLink = document.querySelector('a[href="#grile"]');
    
    if (!activeUser) {
        if (lectiiLink) {
            lectiiLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Pentru a accesa lecțiile, te rugăm să te autentifici sau să creezi un cont.');
                window.location.href = 'Smartys-login.html';
            });
            
            lectiiLink.style.opacity = '0.7';
            lectiiLink.style.cursor = 'not-allowed';
            lectiiLink.title = 'Autentifică-te pentru acces';
        }
        
        if (grileLink) {
            grileLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Accesul complet la grile necesită autentificare. Poți încerca 2 grile demo fără cont.');
                window.location.href = 'grile-demo.html';
            });
            
            grileLink.style.opacity = '0.7';
            grileLink.style.cursor = 'not-allowed';
            grileLink.title = 'Autentifică-te pentru acces complet';
        }
    } else {
        if (lectiiLink) {
            lectiiLink.onclick = null;
            lectiiLink.style.opacity = '1';
            lectiiLink.style.cursor = 'pointer';
            lectiiLink.title = '';
        }
        
        if (grileLink) {
            grileLink.onclick = null;
            grileLink.style.opacity = '1';
            grileLink.style.cursor = 'pointer';
            grileLink.title = '';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    if (quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        typeEffect(quoteElement, randomQuote, 50);
    }

    const cursor = document.getElementById("cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
        });
    }

    const welcomeUser = document.getElementById("welcomeUser");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const activeUser = localStorage.getItem("activeUser");
    if (activeUser && welcomeUser) {
        welcomeUser.textContent = `Bine ai venit, ${activeUser}!`;
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";
    } else {
        if (welcomeUser) welcomeUser.textContent = "";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (signupBtn) signupBtn.style.display = "inline-block";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("activeUser");
            window.location.href = "index.html";
        });
    }

    if (sessionStorage.getItem("showConfetti") === "true") {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        sessionStorage.removeItem("showConfetti");
    }

    
    setupAccessRestrictions();

    
    window.addEventListener('storage', function(e) {
        if (e.key === 'activeUser') {
            setupAccessRestrictions();
        }
    });
});    