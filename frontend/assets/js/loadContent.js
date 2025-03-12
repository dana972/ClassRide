document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(url, containerId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(containerId).innerHTML = data;

                // Force reapply styles after content is loaded
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "assets/css/style.css"; // Adjust path if needed
                document.head.appendChild(link);
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    loadComponent("navbar.html", "navbar-container");
    loadComponent("home.html", "home-container");
});
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }
});
