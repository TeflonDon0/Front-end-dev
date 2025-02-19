document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scroll
    const links = document.querySelectorAll(".navbar a");

    for (const link of links) {
        link.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error(`Target not found for link: ${this.getAttribute("href")}`);
            }
        });
    }

    // Simple animations on scroll
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            } else {
                entry.target.classList.remove("animated");
            }
        });
    });

    elements.forEach((el) => {
        observer.observe(el);
    });
});
