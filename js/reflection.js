document.addEventListener("DOMContentLoaded", function () {
    // ---------------------
    // Loading Screen Functionality
    // ---------------------
    const loadingScreen = document.getElementById("loading-screen");
    // Select all sidebar links
    const navLinks = document.querySelectorAll(".sidebar a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Prevent default navigation
        e.preventDefault();
        // Show the loading screen
        if (loadingScreen) {
          loadingScreen.style.display = "flex";
        }
        // Delay navigation briefly to reveal the loading spinner
        setTimeout(() => {
          window.location.href = this.href;
        }, 500); // Adjust delay (milliseconds) as needed
      });
    });
  
    // ---------------------
    // Sidebar Hide on Scroll Animation
    // ---------------------
    let scrollTimeout;
    const sidebar = document.querySelector(".sidebar");
    window.addEventListener("scroll", function () {
      if (sidebar) {
        sidebar.classList.add("hide");
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (sidebar) {
          sidebar.classList.remove("hide");
        }
      }, 300);
    });
  
    // ---------------------
    // Intersection Observer for Animate-Scroll Elements
    // ---------------------
    const animateElements = document.querySelectorAll(".animate-scroll");
    // Create thresholds from 0 to 1 (in 0.1 increments)
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
    const observerOptions = { threshold: thresholds };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.style.opacity = entry.intersectionRatio;
        const translateY = 20 * (1 - entry.intersectionRatio);
        entry.target.style.transform = `translateY(${translateY}px)`;
      });
    }, observerOptions);
    animateElements.forEach((el) => observer.observe(el));
  });
  